import { weddingData } from '../data/weddingData';

/**
 * Graceful Audio Manager
 * - Attempts to play `public/audio/wedding-music.mp3` when user interacts.
 * - Never autoplays before user gesture.
 * - Never crashes if `wedding-music.mp3` is absent; smoothly falls back to a
 *   quiet, contemplative Web Audio API soft-chime ambient progression if unmuted.
 */
class InvitationAudioManager {
  private audio: HTMLAudioElement | null = null;
  private audioAvailable: boolean | null = null;
  private audioContext: AudioContext | null = null;
  private chimeIntervalId: number | null = null;
  private isPlaying = false;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private notify(): void {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public subscribe(cb: (playing: boolean) => void): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private getMusicUrl(): string {
    const base = import.meta.env.BASE_URL || '/';
    const normalizedBase = base.endsWith('/') ? base : `${base}/`;
    return `${normalizedBase}${weddingData.musicPath.replace(/^\//, '')}`;
  }

  private async checkAudioFile(): Promise<boolean> {
    if (this.audioAvailable !== null) {
      return this.audioAvailable;
    }

    try {
      const response = await fetch(this.getMusicUrl(), { method: 'HEAD' });
      const contentType = response.headers.get('content-type') || '';
      const isValidAudio =
        response.ok &&
        (contentType.includes('audio') ||
          contentType.includes('octet-stream') ||
          contentType === '');
      this.audioAvailable = isValidAudio;
    } catch {
      this.audioAvailable = false;
    }

    return this.audioAvailable;
  }

  private startAmbientChimeFallback(): void {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        void this.audioContext.resume();
      }

      // Soft contemplative pentatonic notes (D4, F#4, A4, B4, D5)
      const notes = [293.66, 369.99, 440.0, 493.88, 587.33];
      let step = 0;

      const playGentleNote = () => {
        if (!this.audioContext || !this.isPlaying) return;
        const ctx = this.audioContext;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[step % notes.length], now);
        step += 1;

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.025, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.5);
      };

      playGentleNote();
      if (this.chimeIntervalId !== null) {
        window.clearInterval(this.chimeIntervalId);
      }
      this.chimeIntervalId = window.setInterval(playGentleNote, 3600);
    } catch {
      // Fail silently on restricted devices
    }
  }

  private stopAmbientChimeFallback(): void {
    if (this.chimeIntervalId !== null) {
      window.clearInterval(this.chimeIntervalId);
      this.chimeIntervalId = null;
    }
    if (this.audioContext && this.audioContext.state === 'running') {
      void this.audioContext.suspend().catch(() => undefined);
    }
  }

  public async play(): Promise<boolean> {
    if (this.isPlaying) return true;

    const hasFile = await this.checkAudioFile();

    if (hasFile) {
      try {
        if (!this.audio) {
          this.audio = new Audio(this.getMusicUrl());
          this.audio.loop = true;
          this.audio.volume = 0.45;
          this.audio.addEventListener('error', () => {
            this.audioAvailable = false;
            this.isPlaying = false;
            this.notify();
          });
        }
        await this.audio.play();
        this.isPlaying = true;
        this.notify();
        return true;
      } catch {
        // Browser blocked or unsupported format; do not crash
        this.isPlaying = false;
        this.notify();
        return false;
      }
    } else {
      this.isPlaying = true;
      this.startAmbientChimeFallback();
      this.notify();
      return true;
    }
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.pause();
    }
    this.stopAmbientChimeFallback();
    this.notify();
  }

  public async toggle(): Promise<void> {
    if (this.isPlaying) {
      this.pause();
    } else {
      await this.play();
    }
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const audioManager = new InvitationAudioManager();
