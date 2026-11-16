import { ArrowRight, Phone } from 'lucide-react';
import { BRANCH_INFO, STORE_IMAGES } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  return (
    <section id="top" className="border-b border-[#E2DFD7] bg-[#F8F8F6]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-[#555B66] mb-4">
              <span>{BRANCH_INFO.branchTitle}</span>
              <span aria-hidden="true" className="mx-2 text-[#141820]/30">
                ·
              </span>
              <span>{BRANCH_INFO.addressLine1}</span>
              <span aria-hidden="true" className="mx-2 text-[#141820]/30">
                ·
              </span>
              <span className="tabular-nums">Sothupakkam 603319</span>
            </p>

            <h1
              className="font-display text-[#141820] font-semibold tracking-tight leading-[1.08] mb-5"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                textWrap: 'balance',
              }}
            >
              Everyday paper, pens &amp; print care for Sothupakkam.
            </h1>

            <p className="text-base sm:text-[17px] leading-relaxed text-[#555B66] max-w-[54ch] mb-8">
              School notebooks, exam stationery, art materials, office files, and
              same-day Xerox &amp; spiral binding right on Cheyyur Road near the
              railway gate.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-md bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={2} />
              </a>

              <a
                href={`tel:+91${BRANCH_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-md border border-[#D4D0C5] bg-white hover:border-[#141820] text-[#141820] text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <Phone className="w-4 h-4 text-[#1D4ED8] shrink-0" strokeWidth={1.75} />
                <span className="tabular-nums">Call {BRANCH_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex">
            <div className="w-full rounded-lg overflow-hidden border border-[#E2DFD7] bg-[#EFECE6] aspect-16/10 lg:aspect-auto lg:min-h-[380px]">
              <ResilientImage
                src={STORE_IMAGES.hero}
                alt="Curated notebooks, gel pens, highlighters, kraft folders, and wooden pencils at VRM Stationery"
                eager
                fallbackLabel="VRM Stationery · Second Branch"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[#E2DFD7] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-medium text-[#555B66] mb-1">Branch Location</p>
            <p className="text-sm font-semibold text-[#141820]">
              {BRANCH_INFO.addressLine1}
            </p>
            <p className="text-xs text-[#555B66] mt-0.5 tabular-nums">
              {BRANCH_INFO.addressLine2}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#555B66] mb-1">Opening Hours</p>
            <p className="text-sm font-semibold text-[#141820] tabular-nums">
              {BRANCH_INFO.weekdayHours}
            </p>
            <p className="text-xs text-[#555B66] mt-0.5 tabular-nums">
              {BRANCH_INFO.sundayHours}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#555B66] mb-1">In-Store Services</p>
            <p className="text-sm font-semibold text-[#141820]">
              Print, Xerox &amp; Spiral Binding
            </p>
            <p className="text-xs text-[#555B66] mt-0.5">
              A4 lamination · Passport photo prints
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-[#555B66] mb-1">Direct Branch Desk</p>
            <a
              href={`tel:+91${BRANCH_INFO.phoneRaw}`}
              className="text-sm font-semibold text-[#1D4ED8] hover:underline underline-offset-4 tabular-nums"
            >
              {BRANCH_INFO.phoneDisplay}
            </a>
            <p className="text-xs text-[#555B66] mt-0.5">
              Pickup orders &amp; school booklists
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
