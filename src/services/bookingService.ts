import { studioConfig } from '../config/studioConfig';
import type { BookingFormData } from '../types/portfolio';

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  tattooStyle?: string;
  preferredDate?: string;
  placement?: string;
  approximateSize?: string;
  estimatedBudget?: string;
  description?: string;
  attachments?: string;
}

export type BookingSubmissionOutcome =
  | {
      status: 'sent';
      message: string;
    }
  | {
      status: 'handoff_required';
      message: string;
      summaryText: string;
      whatsappUrl: string;
      mailtoUrl: string;
    }
  | {
      status: 'error';
      message: string;
      whatsappUrl: string;
      mailtoUrl: string;
    };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_DIGITS_MIN = 7;

export const MAX_ATTACHMENT_COUNT = 3;
export const MAX_ATTACHMENT_SIZE_MB = 5;
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export function validateBookingForm(data: BookingFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  const digitsOnly = data.phone.replace(/\D/g, '');
  if (!data.phone.trim()) {
    errors.phone = 'Please enter a phone or WhatsApp number.';
  } else if (digitsOnly.length < PHONE_DIGITS_MIN) {
    errors.phone = 'Please enter a valid phone number (at least 7 digits).';
  }

  if (!data.tattooStyle.trim()) {
    errors.tattooStyle = 'Please select a tattoo style.';
  }

  if (!data.preferredDate.trim()) {
    errors.preferredDate = 'Please choose a preferred date or timeframe.';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(`${data.preferredDate}T00:00:00`);
    if (!Number.isNaN(chosen.getTime()) && chosen < today) {
      errors.preferredDate = 'Preferred date cannot be in the past.';
    }
  }

  if (!data.placement.trim()) {
    errors.placement =
      'Please specify where on the body you would like the tattoo placed.';
  }

  if (!data.approximateSize.trim()) {
    errors.approximateSize = 'Please select an approximate tattoo size.';
  }

  if (!data.estimatedBudget.trim()) {
    errors.estimatedBudget = 'Please select your estimated budget range.';
  }

  if (!data.description.trim() || data.description.trim().length < 15) {
    errors.description =
      'Please share at least a brief description of your tattoo idea (15+ characters).';
  }

  if (data.attachments.length > MAX_ATTACHMENT_COUNT) {
    errors.attachments = `You can attach up to ${MAX_ATTACHMENT_COUNT} reference images.`;
  } else {
    const invalidFile = data.attachments.find(
      (file) =>
        !ALLOWED_IMAGE_TYPES.includes(file.type) ||
        file.size > MAX_ATTACHMENT_SIZE_MB * 1024 * 1024
    );
    if (invalidFile) {
      errors.attachments = `Each file must be a JPG, PNG, WEBP, or GIF under ${MAX_ATTACHMENT_SIZE_MB} MB.`;
    }
  }

  return errors;
}

export function formatBookingSummary(data: BookingFormData): string {
  const attachmentNames =
    data.attachments.length > 0
      ? data.attachments.map((f) => f.name).join(', ')
      : 'None attached';

  return [
    `NEW TATTOO BOOKING ENQUIRY — ${studioConfig.brand.studioName}`,
    `----------------------------------------`,
    `Full Name: ${data.fullName.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone / WhatsApp: ${data.phone.trim()}`,
    `Tattoo Style: ${data.tattooStyle}`,
    `Preferred Date: ${data.preferredDate}`,
    `Placement: ${data.placement.trim()}`,
    `Approximate Size: ${data.approximateSize}`,
    `Estimated Budget: ${data.estimatedBudget}`,
    `Reference Images Selected: ${attachmentNames}`,
    ``,
    `Tattoo Concept & Notes:`,
    data.description.trim(),
  ].join('\n');
}

export function buildWhatsAppEnquiryUrl(summaryText: string): string {
  const number = studioConfig.contact.whatsappNumberRaw.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(summaryText)}`;
}

export function buildMailtoEnquiryUrl(data: BookingFormData, summaryText: string): string {
  const subject = `Tattoo Booking Enquiry — ${data.fullName.trim()} (${data.tattooStyle})`;
  return `mailto:${studioConfig.contact.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summaryText)}`;
}

/**
 * Generates a lightweight submission fingerprint to guard against accidental
 * duplicate consecutive submissions of identical enquiry data.
 */
export function getSubmissionSignature(data: BookingFormData): string {
  const attachmentKey = data.attachments
    .map((file) => `${file.name}:${file.size}`)
    .join(',');

  return [
    data.fullName.trim().toLowerCase(),
    data.email.trim().toLowerCase(),
    data.phone.trim(),
    data.tattooStyle,
    data.preferredDate,
    data.placement.trim().toLowerCase(),
    data.approximateSize,
    data.estimatedBudget,
    data.description.trim().toLowerCase(),
    attachmentKey,
  ].join('|');
}

/**
 * Dispatches the booking enquiry to the configured backend endpoint when
 * `studioConfig.booking.endpointUrl` is set. When no endpoint URL is configured
 * yet, honestly reports `handoff_required` with pre-populated WhatsApp, Email,
 * and Copy options instead of fabricating a fake confirmation.
 */
export async function submitBookingEnquiry(
  data: BookingFormData
): Promise<BookingSubmissionOutcome> {
  const summaryText = formatBookingSummary(data);
  const whatsappUrl = buildWhatsAppEnquiryUrl(summaryText);
  const mailtoUrl = buildMailtoEnquiryUrl(data, summaryText);
  const endpointUrl = studioConfig.booking.endpointUrl.trim();

  if (!endpointUrl) {
    return {
      status: 'handoff_required',
      message:
        'Direct automated form delivery is not yet connected to a studio server. To ensure your enquiry reaches us, please send your validated details below via WhatsApp or Email.',
      summaryText,
      whatsappUrl,
      mailtoUrl,
    };
  }

  try {
    const payload = new FormData();
    payload.append('fullName', data.fullName.trim());
    payload.append('email', data.email.trim());
    payload.append('phone', data.phone.trim());
    payload.append('tattooStyle', data.tattooStyle);
    payload.append('preferredDate', data.preferredDate);
    payload.append('placement', data.placement.trim());
    payload.append('approximateSize', data.approximateSize);
    payload.append('estimatedBudget', data.estimatedBudget);
    payload.append('description', data.description.trim());

    data.attachments.forEach((file, index) => {
      payload.append(`referenceImage_${index + 1}`, file, file.name);
    });

    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`Endpoint responded with status ${response.status}`);
    }

    return {
      status: 'sent',
      message:
        'Your booking enquiry has been transmitted to the studio. We will review your concept and respond via email or WhatsApp.',
    };
  } catch {
    return {
      status: 'error',
      message:
        'Unable to reach the booking server right now. Nothing was lost—please send your enquiry directly via WhatsApp or Email below.',
      whatsappUrl,
      mailtoUrl,
    };
  }
}
