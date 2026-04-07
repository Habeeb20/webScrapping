import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const normalizePhone = (phone, defaultCountry = 'CM') => {  // CM = Cameroon
  try {
    const parsed = parsePhoneNumberFromString(phone, defaultCountry);
    if (parsed && parsed.isValid()) {
      return {
        international: parsed.formatInternational(),
        e164: parsed.format('E.164'),
        national: parsed.formatNational(),
        isValid: true
      };
    }
  } catch (e) {}
  return { international: phone, e164: null, national: phone, isValid: false };
};

export const isLikelyWhatsApp = (phone) => {
  const normalized = normalizePhone(phone);
  return normalized.isValid && normalized.e164?.startsWith('+237'); // Cameroon example
};

export const generateWhatsAppLink = (number) => {
  const clean = number.replace(/\D/g, '');
  return `https://wa.me/${clean}`;
};