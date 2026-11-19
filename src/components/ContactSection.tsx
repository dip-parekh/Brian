import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  Clock,
  Copy,
  ImagePlus,
  Mail,
  MapPin,
  Phone,
  Send,
  Trash2,
} from 'lucide-react';
import { studioConfig } from '../config/studioConfig';
import { useReveal } from '../hooks/useReveal';
import {
  ALLOWED_IMAGE_TYPES,
  type BookingSubmissionOutcome,
  getSubmissionSignature,
  MAX_ATTACHMENT_COUNT,
  MAX_ATTACHMENT_SIZE_MB,
  submitBookingEnquiry,
  validateBookingForm,
  type ValidationErrors,
} from '../services/bookingService';
import type { BookingFormData } from '../types/portfolio';
import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from './SocialIcons';

interface ContactSectionProps {
  styleSelection: { style: string; nonce: number } | null;
}

const INITIAL_FORM_STATE: BookingFormData = {
  fullName: '',
  email: '',
  phone: '',
  tattooStyle: '',
  preferredDate: '',
  placement: '',
  approximateSize: '',
  estimatedBudget: '',
  description: '',
  attachments: [],
};

export function ContactSection({ styleSelection }: ContactSectionProps) {
  const { contact, booking } = studioConfig;
  const { ref, isVisible } = useReveal<HTMLElement>();
  const formId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<BookingFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSignature, setLastSignature] = useState<string>('');
  const [duplicateNotice, setDuplicateNotice] = useState<string>('');
  const [outcome, setOutcome] = useState<BookingSubmissionOutcome | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const todayIso = useMemo(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60_000);
    return local.toISOString().split('T')[0];
  }, []);

  const previewUrls = useMemo(
    () =>
      formData.attachments.map((file) => ({
        name: file.name,
        sizeKb: Math.max(1, Math.round(file.size / 1024)),
        url: URL.createObjectURL(file),
      })),
    [formData.attachments]
  );

  useEffect(() => {
    return () => {
      previewUrls.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [previewUrls]);

  useEffect(() => {
    if (!styleSelection?.style) return;
    setFormData((prev) => ({
      ...prev,
      tattooStyle: styleSelection.style,
    }));
    setErrors((prev) => ({ ...prev, tattooStyle: undefined }));
    setDuplicateNotice('');
  }, [styleSelection]);

  const directWhatsAppHref = useMemo(() => {
    const number = contact.whatsappNumberRaw.replace(/\D/g, '');
    const presetMessage = `Hello ${contact.studioName}, I would like to enquire about booking a tattoo consultation.`;
    return `https://wa.me/${number}?text=${encodeURIComponent(presetMessage)}`;
  }, [contact.studioName, contact.whatsappNumberRaw]);

  const updateField = <K extends keyof BookingFormData>(
    key: K,
    value: BookingFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setDuplicateNotice('');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    if (selected.length === 0) return;

    const combined = [...formData.attachments, ...selected];
    if (combined.length > MAX_ATTACHMENT_COUNT) {
      setErrors((prev) => ({
        ...prev,
        attachments: `Maximum ${MAX_ATTACHMENT_COUNT} reference images allowed.`,
      }));
      event.target.value = '';
      return;
    }

    const invalid = selected.find(
      (file) =>
        !ALLOWED_IMAGE_TYPES.includes(file.type) ||
        file.size > MAX_ATTACHMENT_SIZE_MB * 1024 * 1024
    );
    if (invalid) {
      setErrors((prev) => ({
        ...prev,
        attachments: `Only JPG, PNG, WEBP, or GIF files under ${MAX_ATTACHMENT_SIZE_MB} MB are accepted.`,
      }));
      event.target.value = '';
      return;
    }

    updateField('attachments', combined);
    event.target.value = '';
  };

  const handleRemoveAttachment = (indexToRemove: number) => {
    updateField(
      'attachments',
      formData.attachments.filter((_, idx) => idx !== indexToRemove)
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setDuplicateNotice('');
    const validationErrors = validateBookingForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setOutcome(null);
      return;
    }

    const signature = getSubmissionSignature(formData);
    if (lastSignature && signature === lastSignature) {
      setDuplicateNotice(
        'This identical enquiry was just prepared/submitted. Edit any detail above if you wish to submit a new request.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitBookingEnquiry(formData);
      setOutcome(result);
      setLastSignature(signature);
      if (result.status === 'sent') {
        setFormData(INITIAL_FORM_STATE);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async (summaryText: string) => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2600);
    } catch {
      setCopiedSummary(false);
    }
  };

  const inputBaseClass =
    'w-full border bg-[#080808] px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#A0A0A0]/60 transition-colors focus:border-[#C49A6C] focus:outline-none';

  return (
    <section
      id="contact"
      ref={ref}
      aria-labelledby="contact-heading"
      className="border-t border-[#303030]/70 bg-[#080808] py-24 lg:py-32"
    >
      <div
        className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 ${
          isVisible ? 'reveal-visible' : 'reveal-hidden'
        }`}
      >
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C49A6C]" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-[0.26em] text-[#C49A6C]">
              Consultations &amp; Bookings
            </span>
          </div>
          <h2
            id="contact-heading"
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#F5F5F5] sm:text-4xl lg:text-5xl"
          >
            {contact.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#A0A0A0] sm:text-lg">
            {contact.supportingText}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Studio Info & Direct Links */}
          <div className="flex flex-col justify-between gap-10 lg:col-span-5">
            <div className="space-y-8 border border-[#303030] bg-[#141414] p-6 sm:p-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C49A6C]">
                  Studio Information
                </p>
                <h3 className="mt-2 font-display text-2xl text-[#F5F5F5]">
                  {contact.studioName}
                </h3>
              </div>

              <dl className="space-y-6 text-sm">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#C49A6C]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-[#A0A0A0]">
                      Phone
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={contact.phoneHref}
                        className="text-[#F5F5F5] transition-colors hover:text-[#C49A6C]"
                      >
                        {contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#C49A6C]" />
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-[#A0A0A0]">
                      WhatsApp
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={directWhatsAppHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F5F5F5] transition-colors hover:text-[#C49A6C]"
                      >
                        {contact.whatsappDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#C49A6C]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-[#A0A0A0]">
                      Email
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${contact.emailAddress}`}
                        className="break-all text-[#F5F5F5] transition-colors hover:text-[#C49A6C]"
                      >
                        {contact.emailDisplay}
                      </a>
                    </dd>
                  </div>
                </div>

                {/* Studio Address */}
                <div className="flex items-start gap-4">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#C49A6C]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-[#A0A0A0]">
                      Studio Location
                    </dt>
                    <dd className="mt-1 leading-relaxed text-[#F5F5F5]">
                      {contact.addressDisplay}
                    </dd>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-4">
                  <Clock
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#C49A6C]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-[#A0A0A0]">
                      Opening Hours
                    </dt>
                    <dd className="mt-1 space-y-1 text-[#F5F5F5]">
                      {contact.openingHours.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </dd>
                  </div>
                </div>
              </dl>

              {/* Prominent WhatsApp Button */}
              <div className="border-t border-[#303030] pt-6">
                <a
                  href={directWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 border border-[#C49A6C] bg-[#C49A6C]/10 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C49A6C] transition-all duration-300 hover:bg-[#C49A6C] hover:text-[#080808] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="border-t border-[#303030] pt-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#A0A0A0]">
                  Follow the Studio
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  <a
                    href={contact.socials.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 border border-[#303030] bg-[#1C1C1C] px-3.5 py-2.5 text-xs text-[#F5F5F5] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C]"
                  >
                    <InstagramIcon className="h-4 w-4 shrink-0 text-[#C49A6C]" />
                    <span className="truncate">Instagram</span>
                  </a>
                  <a
                    href={contact.socials.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 border border-[#303030] bg-[#1C1C1C] px-3.5 py-2.5 text-xs text-[#F5F5F5] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C]"
                  >
                    <FacebookIcon className="h-4 w-4 shrink-0 text-[#C49A6C]" />
                    <span className="truncate">Facebook</span>
                  </a>
                  <a
                    href={contact.socials.tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 border border-[#303030] bg-[#1C1C1C] px-3.5 py-2.5 text-xs text-[#F5F5F5] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C]"
                  >
                    <TikTokIcon className="h-4 w-4 shrink-0 text-[#C49A6C]" />
                    <span className="truncate">TikTok</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Enquiry Form */}
          <div className="lg:col-span-7">
            <form
              id="booking-form"
              noValidate
              onSubmit={handleSubmit}
              aria-label="Tattoo booking enquiry form"
              className="scroll-mt-24 border border-[#303030] bg-[#141414] p-6 sm:p-8 lg:p-10"
            >
              <div className="mb-8 flex flex-wrap items-center justify-between gap-2 border-b border-[#303030] pb-5">
                <h3 className="font-display text-2xl text-[#F5F5F5]">
                  Booking Enquiry
                </h3>
                <span className="text-xs text-[#A0A0A0]">
                  <span className="text-[#C49A6C]">*</span> Required fields
                </span>
              </div>

              {/* Validation Error Banner */}
              {Object.keys(errors).length > 0 && (
                <div
                  role="alert"
                  className="mb-7 flex items-start gap-3 border border-red-500/40 bg-red-950/30 p-4 text-sm text-red-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <span>
                    Please review and complete the highlighted fields below before
                    submitting your enquiry.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* 1. Full Name */}
                <div>
                  <label
                    htmlFor={`${formId}-fullName`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#F5F5F5]"
                  >
                    Full Name <span className="text-[#C49A6C]">*</span>
                  </label>
                  <input
                    id={`${formId}-fullName`}
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName ? `${formId}-fullName-err` : undefined
                    }
                    className={`${inputBaseClass} ${
                      errors.fullName ? 'border-red-500' : 'border-[#303030]'
                    }`}
                  />
                  {errors.fullName && (
                    <p
                      id={`${formId}-fullName-err`}
                      className="mt-1.5 text-xs text-red-400"
                    >
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* 2. Email Address */}
                <div>
                  <label
                    htmlFor={`${formId}-email`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#F5F5F5]"
                  >
                    Email Address <span className="text-[#C49A6C]">*</span>
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? `${formId}-email-err` : undefined
                    }
                    className={`${inputBaseClass} ${
                      errors.email ? 'border-red-500' : 'border-[#303030]'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id={`${formId}-email-err`}
                      className="mt-1.5 text-xs text-red-400"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 3. Phone / WhatsApp Number */}
                <div>
                  <label
                    htmlFor={`${formId}-phone`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#F5F5F5]"
                  >
                    Phone / WhatsApp Number{' '}
                    <span className="text-[#C49A6C]">*</span>
                  </label>
                  <input
                    id={`${formId}-phone`}
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+00 000 000 000"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? `${formId}-phone-err` : undefined
                    }
                    className={`${inputBaseClass} ${
                      errors.phone ? 'border-red-500' : 'border-[#303030]'
                    }`}
                  />
                  {errors.phone && (
                    <p
                      id={`${formId}-phone-err`}
                      className="mt-1.5 text-xs text-red-400"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* 4. Tattoo Style */}
                <div>
                  <label
                    htmlFor={`${formId}-style`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#F5F5F5]"
                  >
                    Tattoo Style <span className="text-[#C49A6C]">*</span>
                  </label>
                  <select
                    id={`${formId}-style`}
                    name="tattooStyle"
                    required
                    value={formData.tattooStyle}
                    onChange={(e) => updateField('tattooStyle', e.target.value)}
                    aria-invalid={Boolean(errors.tattooStyle)}
                    aria-describedby={
                      errors.tattooStyle ? `${formId}-style-err` : undefined
                    }
                    className={`${inputBaseClass} ${
                      errors.tattooStyle ? 'border-red-500' : 'border-[#303030]'
                    }`}
                  >
                    <option value="">Select a tattoo style</option>
                    {booking.styles.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                  {errors.tattooStyle && (
                    <p
                      id={`${formId}-style-err`}
                      className="mt-1.5 text-xs text-red-400"
                    >
                      {errors.tattooStyle}
                    </p>
                  )}
                </div>

                {/* 5. Preferred Appointment Date */}
                <div>
                  <label
                    htmlFor={`${formId}-date`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#F5F5F5]"
                  >
                    Preferred Appointment Date{' '}
                    <span className="text-[#C49A6C]">*</span>
                  </label>
                  <input
                    id={`${formId}-date`}
                    name="preferredDate"
                    type="date"
                    required
                    min={todayIso}
                    value={formData.preferredDate}
                    onChange={(e) => updateField('preferredDate', e.target.value)}
                    aria-invalid={Boolean(errors.preferredDate)}
                    aria-describedby={
                      errors.preferredDate ? `${formId}-date-err` : undefined
                    }
                    className={`${inputBaseClass} ${
                      errors.preferredDate
                        ? 'border-red-500'
                        : 'border-[#303030]'
                    }`}
                  />
                  {errors.preferredDate && (
                    <p
                      id={`${formId}-date-err`}
                      className="mt-1.5 text-xs text-red-400"
                    >
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                {/* 6. Tattoo Placement */}
                <div>
                  <label
                    htmlFor={`${formId}-placement`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#F5F5F5]"
                  >
                    Tattoo Placement <span className="text-[#C49A6C]">*</span>
                  </label>
                  <input
                    id={`${formId}-placement`}
                    name="placement"
                    type="text"
                    required
                    placeholder="e.g. Forearm, Upper Back, Chest, Thigh"
                    value={formData.placement}
                    onChange={(e) => updateField('placement', e.target.value)}
                    aria-invalid={Boolean(errors.placement)}
                    aria-describedby={
                      errors.placement ? `${formId}-placement-err` : undefined
                    }
                    className={`${inputBaseClass} ${
                      errors.placement ? 'border-red-500' : 'border-[#303030]'
                    }`}
                  />
                  {errors.placement && (
                    <p
                      id={`${formId}-placement-err`}
                      className="mt-1.5 text-xs text-red-400"
                    >
                      {errors.placement}
                    </p>
                  )}
                </div>

                {/* 7. Approximate Tattoo Size */}
                <div>
                  <label
                    htmlFor={`${formId}-size`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#F5F5F5]"
                  >
                    Approximate Tattoo Size{' '}
                    <span className="text-[#C49A6C]">*</span>
                  </label>
                  <select
                    id={`${formId}-size`}
                    name="approximateSize"
                    required
                    value={formData.approximateSize}
                    onChange={(e) =>
                      updateField('approximateSize', e.target.value)
                    }
                    aria-invalid={Boolean(errors.approximateSize)}
                    aria-describedby={
                      errors.approximateSize ? `${formId}-size-err` : undefined
                    }
                    className={`${inputBaseClass} ${
                      errors.approximateSize
                        ? 'border-red-500'
                        : 'border-[#303030]'
                    }`}
                  >
                    <option value="">Select approximate size</option>
                    {booking.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  {errors.approximateSize && (
                    <p
                      id={`${formId}-size-err`}
                      className="mt-1.5 text-xs text-red-400"
                    >
                      {errors.approximateSize}
                    </p>
                  )}
                </div>

                {/* 8. Estimated Budget */}
                <div>
                  <label
                    htmlFor={`${formId}-budget`}
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#F5F5F5]"
                  >
                    Estimated Budget <span className="text-[#C49A6C]">*</span>
                  </label>
                  <select
                    id={`${formId}-budget`}
                    name="estimatedBudget"
                    required
                    value={formData.estimatedBudget}
                    onChange={(e) =>
                      updateField('estimatedBudget', e.target.value)
                    }
                    aria-invalid={Boolean(errors.estimatedBudget)}
                    aria-describedby={
                      errors.estimatedBudget
                        ? `${formId}-budget-err`
                        : undefined
                    }
                    className={`${inputBaseClass} ${
                      errors.estimatedBudget
                        ? 'border-red-500'
                        : 'border-[#303030]'
                    }`}
                  >
                    <option value="">Select estimated budget</option>
                    {booking.budgets.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                  {errors.estimatedBudget && (
                    <p
                      id={`${formId}-budget-err`}
                      className="mt-1.5 text-xs text-red-400"
                    >
                      {errors.estimatedBudget}
                    </p>
                  )}
                </div>
              </div>

              {/* 9. Tattoo Description / Ideas */}
              <div className="mt-6">
                <label
                  htmlFor={`${formId}-description`}
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#F5F5F5]"
                >
                  Tattoo Description / Ideas{' '}
                  <span className="text-[#C49A6C]">*</span>
                </label>
                <textarea
                  id={`${formId}-description`}
                  name="description"
                  rows={4}
                  required
                  placeholder="Describe your concept, visual elements, mood, whether this is a cover-up, and any meaningful details..."
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description ? `${formId}-description-err` : undefined
                  }
                  className={`${inputBaseClass} resize-y ${
                    errors.description ? 'border-red-500' : 'border-[#303030]'
                  }`}
                />
                {errors.description && (
                  <p
                    id={`${formId}-description-err`}
                    className="mt-1.5 text-xs text-red-400"
                  >
                    {errors.description}
                  </p>
                )}
              </div>

              {/* 10. Optional Reference Image Upload */}
              <div className="mt-6">
                <label
                  htmlFor={`${formId}-attachments`}
                  className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#F5F5F5]"
                >
                  Reference Images{' '}
                  <span className="font-normal text-[#A0A0A0]">
                    (Optional — up to {MAX_ATTACHMENT_COUNT} images, max{' '}
                    {MAX_ATTACHMENT_SIZE_MB} MB each)
                  </span>
                </label>

                <input
                  ref={fileInputRef}
                  id={`${formId}-attachments`}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={handleFileChange}
                  className="sr-only"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={formData.attachments.length >= MAX_ATTACHMENT_COUNT}
                  className="flex w-full cursor-pointer items-center justify-center gap-3 border border-dashed border-[#303030] bg-[#080808] px-4 py-5 text-xs uppercase tracking-[0.16em] text-[#A0A0A0] transition-colors hover:border-[#C49A6C] hover:text-[#F5F5F5] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ImagePlus className="h-4 w-4 text-[#C49A6C]" />
                  <span>
                    {formData.attachments.length >= MAX_ATTACHMENT_COUNT
                      ? `Maximum ${MAX_ATTACHMENT_COUNT} reference images attached`
                      : 'Attach Inspiration / Placement Photos'}
                  </span>
                </button>

                {errors.attachments && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.attachments}
                  </p>
                )}

                {previewUrls.length > 0 && (
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {previewUrls.map((item, idx) => (
                      <li
                        key={`${item.name}-${idx}`}
                        className="flex items-center justify-between gap-2 border border-[#303030] bg-[#080808] p-2"
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <img
                            src={item.url}
                            alt={`Reference ${idx + 1}: ${item.name}`}
                            className="h-10 w-10 shrink-0 object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-xs text-[#F5F5F5]">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-[#A0A0A0]">
                              {item.sizeKb} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(idx)}
                          aria-label={`Remove ${item.name}`}
                          className="shrink-0 cursor-pointer p-1.5 text-[#A0A0A0] transition-colors hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {duplicateNotice && (
                <div
                  role="status"
                  className="mt-6 border border-[#C49A6C]/45 bg-[#C49A6C]/10 p-4 text-xs leading-relaxed text-[#F5F5F5]"
                >
                  {duplicateNotice}
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-3 bg-[#C49A6C] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#080808] transition-colors duration-200 hover:bg-[#D4AE82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {isSubmitting
                      ? 'PROCESSING ENQUIRY...'
                      : 'SEND BOOKING ENQUIRY'}
                  </span>
                </button>
              </div>

              {/* Honest Submission Outcome Panel */}
              {outcome && outcome.status === 'sent' && (
                <div
                  role="status"
                  className="mt-6 border border-emerald-500/40 bg-emerald-950/30 p-5 text-sm leading-relaxed text-emerald-100"
                >
                  <p className="font-semibold text-emerald-300">
                    Enquiry Received
                  </p>
                  <p className="mt-1">{outcome.message}</p>
                </div>
              )}

              {outcome && outcome.status === 'error' && (
                <div
                  role="alert"
                  className="mt-6 space-y-4 border border-red-500/40 bg-red-950/30 p-5 text-sm text-red-100"
                >
                  <p>{outcome.message}</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={outcome.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#C49A6C] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#080808]"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <a
                      href={outcome.mailtoUrl}
                      className="inline-flex items-center gap-2 border border-[#F5F5F5]/30 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F5F5F5]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Open Email App</span>
                    </a>
                  </div>
                </div>
              )}

              {outcome && outcome.status === 'handoff_required' && (
                <div
                  role="status"
                  className="mt-6 space-y-4 border border-[#C49A6C]/50 bg-[#1C1C1C] p-5 text-sm text-[#F5F5F5]"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C49A6C]">
                      Enquiry Validated — Choose Dispatch Method
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#A0A0A0]">
                      {outcome.message}
                    </p>
                    {formData.attachments.length > 0 && (
                      <p className="mt-2 text-xs text-[#C49A6C]">
                        Note: Please attach your {formData.attachments.length}{' '}
                        selected reference image(s) directly inside WhatsApp or
                        your email client.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={outcome.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#C49A6C] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#080808] transition-colors hover:bg-[#D4AE82]"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      <span>Send via WhatsApp</span>
                    </a>

                    <a
                      href={outcome.mailtoUrl}
                      className="inline-flex items-center gap-2 border border-[#303030] bg-[#080808] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#F5F5F5] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C]"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Open Email Client</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopySummary(outcome.summaryText)}
                      className="inline-flex cursor-pointer items-center gap-2 border border-[#303030] bg-[#080808] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#A0A0A0] transition-colors hover:border-[#C49A6C] hover:text-[#F5F5F5]"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#C49A6C]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Summary</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
