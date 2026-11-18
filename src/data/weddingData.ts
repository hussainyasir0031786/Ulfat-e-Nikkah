export interface WeddingConfig {
  brandName: string;
  brandUrdu: string;
  bismillahArabic: string;
  bismillahTranslation: string;
  introText: string;
  title: string;
  subtitle: string;
  brideName: string;
  brideRole: string;
  groomName: string;
  groomRole: string;
  invitationMessage: string;
  date: string;
  formattedDate: string;
  day: string;
  dateOrdinal: string;
  nikkahTime: string;
  dinnerTime: string;
  venue: string;
  addressLines: string[];
  address: string;
  rsvpLabel: string;
  rsvpName: string;
  phone: string;
  whatsappNumber: string;
  whatsappPrefillText: string;
  mapQuery: string;
  closingProse: string;
  closingWish: string;
  closingSignature: string;
  finaleHeading: string;
  ogTitle: string;
  ogDescription: string;
  musicPath: string;
  calendarStartIso: string;
  calendarEndIso: string;
}

const VENUE_NAME = 'LALA ZAAR MARRIAGE LAWN';
const ADDRESS_LINES = ['Near Al-syad center', 'Quaid-Abad'];
const FULL_ADDRESS = ADDRESS_LINES.join(', ');

/**
 * Centralized Wedding Configuration
 * Edit values here to customize the entire Nikkah invitation.
 */
export const weddingData: WeddingConfig = {
  brandName: 'ULFAT-E-NIKAH',
  brandUrdu: 'اُلفتِ نکاح',
  bismillahArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  bismillahTranslation: 'In the Name of Allah, the Most Gracious, the Most Merciful',
  introText: 'With the blessings of Allah,\nwe cordially invite you to the',
  title: 'NIKKAH CEREMONY',
  subtitle: 'Together in faith, love and the journey of a lifetime',
  brideName: 'Eman Babar',
  brideRole: 'Bride',
  groomName: 'Sheikh Saud Saeed',
  groomRole: 'Groom',
  invitationMessage:
    'We would be honored by your presence\nas we begin our new chapter with the blessings\nof Nikkah.',
  date: '23 December 2026',
  formattedDate: '2026-12-23',
  day: 'WEDNESDAY',
  dateOrdinal: '23rd December 2026',
  nikkahTime: '8:00 PM',
  dinnerTime: '9:00 PM',
  venue: VENUE_NAME,
  addressLines: ADDRESS_LINES,
  address: FULL_ADDRESS,
  rsvpLabel: 'R.V.S.P.',
  rsvpName: 'Mr. & Mrs. Babar Aziz',
  phone: '0313-2042174',
  // Pakistan country code (+92) without the leading zero
  whatsappNumber: '923132042174',
  whatsappPrefillText:
    'Assalam-o-Alaikum, we are honored to confirm our RSVP for the Nikkah Ceremony of Eman Babar & Sheikh Saud Saeed on 23 December 2026.',
  mapQuery: `${VENUE_NAME}, ${FULL_ADDRESS}`,
  closingProse:
    'With grateful hearts and the blessings of Allah,\nwe look forward to sharing this beautiful beginning with you.',
  closingWish: 'Your presence will make our Nikkah even more meaningful.',
  closingSignature: 'Eman & Sheikh Saud',
  finaleHeading: 'With Love & Blessings',
  ogTitle: 'Ulfat-e-Nikah | Eman Babar & Sheikh Saud Saeed',
  ogDescription:
    'An elegant digital Nikkah invitation for Eman Babar & Sheikh Saud Saeed — 23 December 2026.',
  musicPath: 'audio/wedding-music.mp3',
  calendarStartIso: '20261223T200000',
  calendarEndIso: '20261223T230000',
};
