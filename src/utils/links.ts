import { weddingData } from '../data/weddingData';

/**
 * Generates a universal Google Maps search URL from the centralized venue & address.
 * Opens native Google Maps app on Android/iOS when installed, or browser fallback.
 */
export function buildGoogleMapsUrl(query: string = weddingData.mapQuery): string {
  const cleanQuery = query.trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cleanQuery)}`;
}

/**
 * Normalizes a local Pakistani mobile number (e.g. "0313-2042174") into
 * clean international digits without "+" or leading local "0" (e.g. "923132042174").
 */
export function formatInternationalWhatsAppDigits(
  phoneOrInternational: string,
  countryCode = '92'
): string {
  const digitsOnly = phoneOrInternational.replace(/\D/g, '');
  if (!digitsOnly) return '';
  if (digitsOnly.startsWith(countryCode)) {
    return digitsOnly;
  }
  const withoutLeadingZero = digitsOnly.replace(/^0+/, '');
  return `${countryCode}${withoutLeadingZero}`;
}

/**
 * Builds a valid WhatsApp click-to-chat URL with prefilled message.
 */
export function buildWhatsAppRsvpUrl(
  whatsappNumber: string = weddingData.whatsappNumber,
  message: string = weddingData.whatsappPrefillText
): string {
  const intlDigits = formatInternationalWhatsAppDigits(whatsappNumber);
  return `https://wa.me/${intlDigits}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a tel: link using international +92 formatting for consistent mobile dialing.
 */
export function buildTelHref(phone: string = weddingData.phone): string {
  const intlDigits = formatInternationalWhatsAppDigits(phone);
  return `tel:+${intlDigits}`;
}

/**
 * Generates and downloads a standard .ics calendar event file for the Nikkah.
 */
export function downloadNikkahCalendarEvent(): void {
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ulfat-e-Nikah//Nikkah Invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:nikkah-eman-saud-${weddingData.formattedDate}@ulfat-e-nikah`,
    `DTSTART:${weddingData.calendarStartIso}`,
    `DTEND:${weddingData.calendarEndIso}`,
    `SUMMARY:${weddingData.title} — ${weddingData.brideName} & ${weddingData.groomName}`,
    `LOCATION:${weddingData.venue}, ${weddingData.address}`,
    `DESCRIPTION:${weddingData.introText.replace(/\n/g, ' ')} ${weddingData.title}. Nikkah: ${weddingData.nikkahTime}, Dinner: ${weddingData.dinnerTime}. RSVP: ${weddingData.rsvpName} (${weddingData.phone})`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([icsLines.join('\r\n')], {
    type: 'text/calendar;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `nikkah-${weddingData.formattedDate}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
