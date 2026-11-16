import { useState, type FormEvent } from 'react';
import { Check, Copy, ExternalLink, MapPin, Phone, Printer } from 'lucide-react';
import {
  BRANCH_INFO,
  PRINT_SERVICES,
  STORE_IMAGES,
} from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface PrintAndBranchSectionProps {
  onAddPrintJob: (title: string, detail: string, totalCost: number) => void;
}

export function PrintAndBranchSection({ onAddPrintJob }: PrintAndBranchSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(PRINT_SERVICES[0].id);
  const [pagesCount, setPagesCount] = useState(20);
  const [copiesCount, setCopiesCount] = useState(1);
  const [doubleSided, setDoubleSided] = useState(false);
  const [printAdded, setPrintAdded] = useState(false);

  const [copiedAddress, setCopiedAddress] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [requirementNote, setRequirementNote] = useState('');
  const [inquiryError, setInquiryError] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState<{
    refId: string;
    name: string;
    phone: string;
    note: string;
  } | null>(null);

  const activeService =
    PRINT_SERVICES.find((s) => s.id === selectedServiceId) ?? PRINT_SERVICES[0];

  const effectivePages = Math.max(1, pagesCount || 1);
  const effectiveCopies = Math.max(1, copiesCount || 1);
  const rawEstimate = activeService.supportsDoubleSided
    ? activeService.ratePerUnit * effectivePages * effectiveCopies
    : activeService.ratePerUnit * effectiveCopies;
  const estimatedTotal =
    activeService.supportsDoubleSided && doubleSided && effectivePages >= 20
      ? Math.round(rawEstimate * 0.9)
      : rawEstimate;

  const handleAddPrintEstimate = () => {
    const detail = activeService.supportsDoubleSided
      ? `${effectivePages} pgs × ${effectiveCopies} ${
          effectiveCopies === 1 ? 'copy' : 'copies'
        } (${doubleSided ? 'Back-to-Back' : 'Single-Sided'})`
      : `${effectiveCopies} ${effectiveCopies === 1 ? 'unit' : 'units'}`;

    onAddPrintJob(activeService.name, detail, estimatedTotal);
    setPrintAdded(true);
    window.setTimeout(() => setPrintAdded(false), 1500);
  };

  const whatsappPrintUrl = `https://wa.me/${BRANCH_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello VRM Stationery (Cheyyur Road Branch), I need a print/binding job:\nService: ${activeService.name}\nQuantity: ${
      activeService.supportsDoubleSided
        ? `${effectivePages} pages × ${effectiveCopies} copies (${doubleSided ? 'Back-to-Back' : 'Single-Sided'})`
        : `${effectiveCopies} units`
    }\nEstimated Total: ₹${estimatedTotal}`
  )}`;

  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${BRANCH_INFO.fullAddress} · Ph: ${BRANCH_INFO.phoneRaw}`);
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanName = customerName.trim();
    const cleanPhone = customerPhone.trim();
    const cleanNote = requirementNote.trim();

    if (!cleanName || cleanPhone.length < 10 || !cleanNote) {
      setInquiryError('Please enter your name, 10-digit phone number, and item list.');
      return;
    }

    setInquiryError('');
    const refId = `VRM-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedInquiry({
      refId,
      name: cleanName,
      phone: cleanPhone,
      note: cleanNote,
    });
  };

  const whatsappInquiryUrl = submittedInquiry
    ? `https://wa.me/${BRANCH_INFO.whatsappNumber}?text=${encodeURIComponent(
        `Hello VRM Stationery (Second Branch),\nRef: ${submittedInquiry.refId}\nName: ${submittedInquiry.name}\nPhone: ${submittedInquiry.phone}\nBooklist / Bulk Requirement:\n${submittedInquiry.note}`
      )}`
    : '#';

  return (
    <>
      <section id="print-desk" className="py-14 lg:py-20 border-b border-[#E2DFD7] bg-[#F8F8F6]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-medium text-[#555B66] mb-2">
                  Same-Day Counter · Cheyyur Road Branch
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#141820] mb-3"
                  style={{ textWrap: 'balance' }}
                >
                  Print, Xerox &amp; Spiral Binding Desk
                </h2>
                <p className="text-sm sm:text-base text-[#555B66] leading-relaxed">
                  Quick turnaround for college project reports, school worksheets,
                  exam hall tickets, and laminated certificates. Calculate your
                  estimate and add it to your pickup bag or send specs directly.
                </p>
              </div>

              <div className="rounded-lg overflow-hidden border border-[#E2DFD7] bg-[#EFECE6] aspect-4/3">
                <ResilientImage
                  src={STORE_IMAGES.print}
                  alt="Spiral-bound reports, laminated sheets, and crisp printed A4 documents"
                  fallbackLabel="Print & Spiral Binding Counter"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-[#E2DFD7] rounded-lg p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[#E2DFD7]">
                  <div className="flex items-center gap-2.5">
                    <Printer className="w-5 h-5 text-[#1D4ED8]" strokeWidth={1.75} />
                    <h3 className="text-base font-semibold text-[#141820]">
                      Instant Print &amp; Binding Estimator
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#555B66] tabular-nums">
                    Counter Rate · INR
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                  {PRINT_SERVICES.map((service) => {
                    const active = service.id === activeService.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`p-3.5 text-left rounded-md border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#141820] text-white border-[#141820]'
                            : 'bg-[#F8F8F6] text-[#141820] border-[#E2DFD7] hover:border-[#141820]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-semibold">{service.name}</span>
                          <span
                            className={`font-mono text-xs tabular-nums ${
                              active ? 'text-white/85' : 'text-[#1D4ED8]'
                            }`}
                          >
                            ₹{service.ratePerUnit}
                          </span>
                        </div>
                        <p
                          className={`text-xs ${
                            active ? 'text-white/75' : 'text-[#555B66]'
                          }`}
                        >
                          {service.unitLabel}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-[#555B66] mb-6">{activeService.note}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {activeService.supportsDoubleSided && (
                    <div>
                      <label
                        htmlFor="print-pages"
                        className="block text-xs font-medium text-[#141820] mb-1.5"
                      >
                        Pages per Copy
                      </label>
                      <input
                        id="print-pages"
                        type="number"
                        min={1}
                        max={2000}
                        value={pagesCount}
                        onChange={(e) => setPagesCount(Math.max(1, Number(e.target.value)))}
                        className="w-full min-h-[42px] px-3 py-2 text-sm font-mono tabular-nums bg-[#F8F8F6] border border-[#E2DFD7] rounded-md text-[#141820] focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="print-copies"
                      className="block text-xs font-medium text-[#141820] mb-1.5"
                    >
                      {activeService.supportsDoubleSided ? 'Number of Copies' : 'Quantity'}
                    </label>
                    <input
                      id="print-copies"
                      type="number"
                      min={1}
                      max={500}
                      value={copiesCount}
                      onChange={(e) => setCopiesCount(Math.max(1, Number(e.target.value)))}
                      className="w-full min-h-[42px] px-3 py-2 text-sm font-mono tabular-nums bg-[#F8F8F6] border border-[#E2DFD7] rounded-md text-[#141820] focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>

                  {activeService.supportsDoubleSided && (
                    <div>
                      <span className="block text-xs font-medium text-[#141820] mb-1.5">
                        Print Sides
                      </span>
                      <div className="grid grid-cols-2 gap-1 p-1 bg-[#F8F8F6] border border-[#E2DFD7] rounded-md">
                        <button
                          type="button"
                          onClick={() => setDoubleSided(false)}
                          className={`py-1.5 text-xs font-medium rounded cursor-pointer transition-colors ${
                            !doubleSided
                              ? 'bg-white text-[#141820] shadow-xs'
                              : 'text-[#555B66] hover:text-[#141820]'
                          }`}
                        >
                          1-Side
                        </button>
                        <button
                          type="button"
                          onClick={() => setDoubleSided(true)}
                          className={`py-1.5 text-xs font-medium rounded cursor-pointer transition-colors ${
                            doubleSided
                              ? 'bg-white text-[#141820] shadow-xs'
                              : 'text-[#555B66] hover:text-[#141820]'
                          }`}
                        >
                          2-Side
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-5 border-t border-[#E2DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#555B66]">Estimated Counter Total</p>
                  <p className="font-mono text-2xl font-semibold text-[#141820] tabular-nums">
                    ₹{estimatedTotal}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAddPrintEstimate}
                    className={`px-4 py-2.5 min-h-[42px] rounded-md text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      printAdded
                        ? 'bg-[#15803D] text-white'
                        : 'bg-[#1D4ED8] hover:bg-[#1E40AF] text-white'
                    }`}
                  >
                    {printAdded ? 'Added to Order Bag' : 'Add Job to Order Bag'}
                  </button>

                  <a
                    href={whatsappPrintUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[42px] rounded-md border border-[#D4D0C5] bg-white hover:border-[#141820] text-[#141820] text-sm font-medium transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Send Spec via WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="visit-branch" className="py-14 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-[#555B66] mb-2">
                Storefront &amp; Landmark
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#141820] mb-6"
                style={{ textWrap: 'balance' }}
              >
                Visit VRM Second Branch
              </h2>

              <div className="border border-[#E2DFD7] rounded-lg bg-[#F8F8F6] p-6 space-y-5">
                <div>
                  <p className="text-xs font-medium text-[#555B66] mb-1">Address</p>
                  <p className="text-base font-semibold text-[#141820]">
                    {BRANCH_INFO.brandName} · {BRANCH_INFO.branchTitle}
                  </p>
                  <p className="text-sm text-[#141820] mt-1">
                    {BRANCH_INFO.addressLine1}
                  </p>
                  <p className="text-sm text-[#555B66] tabular-nums">
                    {BRANCH_INFO.addressLine2}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2DFD7] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-[#555B66] mb-1">Phone</p>
                    <a
                      href={`tel:+91${BRANCH_INFO.phoneRaw}`}
                      className="font-mono text-sm font-semibold text-[#1D4ED8] hover:underline underline-offset-4 tabular-nums"
                    >
                      {BRANCH_INFO.phoneRaw}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#555B66] mb-1">Hours</p>
                    <p className="text-xs font-medium text-[#141820] tabular-nums">
                      {BRANCH_INFO.weekdayHours}
                    </p>
                    <p className="text-xs text-[#555B66] tabular-nums mt-0.5">
                      {BRANCH_INFO.sundayHours}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2DFD7] flex flex-wrap items-center gap-2.5">
                  <a
                    href={BRANCH_INFO.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-md bg-[#141820] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Open Directions</span>
                  </a>

                  <a
                    href={`tel:+91${BRANCH_INFO.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-md border border-[#D4D0C5] bg-white hover:border-[#141820] text-[#141820] text-xs font-medium transition-colors whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>Call Branch</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-md border border-[#D4D0C5] bg-white hover:border-[#141820] text-[#141820] text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#15803D]" />
                        <span>Address Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div id="bulk-inquiry" className="lg:col-span-7">
              <p className="text-xs font-medium text-[#555B66] mb-2">
                Schools, Tuition Centres &amp; Offices
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#141820] mb-6"
                style={{ textWrap: 'balance' }}
              >
                School Booklist &amp; Bulk Supply Inquiry
              </h2>

              <div className="border border-[#E2DFD7] rounded-lg bg-[#F8F8F6] p-6 sm:p-8">
                {submittedInquiry ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E2DFD7]">
                      <div>
                        <p className="text-xs font-medium text-[#15803D]">
                          Inquiry Slip Ready · {submittedInquiry.refId}
                        </p>
                        <h3 className="text-lg font-semibold text-[#141820] mt-0.5">
                          Requirement prepared for VRM Second Branch
                        </h3>
                      </div>
                    </div>

                    <div className="text-sm text-[#141820] space-y-1.5">
                      <p>
                        <span className="text-[#555B66]">Name:</span> {submittedInquiry.name}
                      </p>
                      <p className="tabular-nums">
                        <span className="text-[#555B66]">Phone:</span> {submittedInquiry.phone}
                      </p>
                      <p>
                        <span className="text-[#555B66]">List:</span> {submittedInquiry.note}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E2DFD7] flex flex-wrap items-center gap-3">
                      <a
                        href={whatsappInquiryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-md bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Send List on WhatsApp ({BRANCH_INFO.phoneRaw})</span>
                        <ExternalLink className="w-4 h-4 shrink-0" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedInquiry(null);
                          setRequirementNote('');
                        }}
                        className="px-4 py-2.5 min-h-[42px] rounded-md border border-[#D4D0C5] bg-white hover:border-[#141820] text-[#141820] text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Submit Another List
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <p className="text-sm text-[#555B66] mb-2">
                      Need bundled term notebooks, exam pads, or bulk A4 reams packed
                      before you arrive at Cheyyur Road? Leave your list below.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="bulk-name"
                          className="block text-xs font-medium text-[#141820] mb-1.5"
                        >
                          Your Name
                        </label>
                        <input
                          id="bulk-name"
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Karthik Sundar"
                          className="w-full min-h-[42px] px-3 py-2 text-sm bg-white border border-[#E2DFD7] rounded-md text-[#141820] focus:outline-none focus:border-[#1D4ED8]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="bulk-phone"
                          className="block text-xs font-medium text-[#141820] mb-1.5"
                        >
                          Mobile / WhatsApp Number
                        </label>
                        <input
                          id="bulk-phone"
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="10-digit mobile number"
                          className="w-full min-h-[42px] px-3 py-2 text-sm font-mono tabular-nums bg-white border border-[#E2DFD7] rounded-md text-[#141820] focus:outline-none focus:border-[#1D4ED8]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="bulk-note"
                        className="block text-xs font-medium text-[#141820] mb-1.5"
                      >
                        School Booklist or Office Supply Requirement
                      </label>
                      <textarea
                        id="bulk-note"
                        rows={3}
                        value={requirementNote}
                        onChange={(e) => setRequirementNote(e.target.value)}
                        placeholder="Example: 12 long ruled notebooks, 2 geometry boxes, 3 A4 paper reams..."
                        className="w-full px-3 py-2.5 text-sm bg-white border border-[#E2DFD7] rounded-md text-[#141820] focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>

                    {inquiryError && (
                      <p role="alert" className="text-xs font-medium text-red-700">
                        {inquiryError}
                      </p>
                    )}

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs text-[#555B66]">
                        Same-day packing at Cheyyur Road branch
                      </span>
                      <button
                        type="submit"
                        className="px-5 py-2.5 min-h-[42px] rounded-md bg-[#141820] hover:bg-[#1D4ED8] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Prepare Pickup Inquiry
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
