import { BRANCH_INFO } from '../data/storeData';

export function Footer() {
  return (
    <footer className="border-t border-[#E2DFD7] bg-[#F8F8F6] py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#E2DFD7]">
          <div className="md:col-span-5">
            <p className="font-display text-lg font-semibold text-[#141820] mb-2">
              {BRANCH_INFO.brandName}
            </p>
            <p className="text-sm text-[#555B66] leading-relaxed">
              {BRANCH_INFO.branchTitle}, {BRANCH_INFO.addressLine1}
              <br />
              {BRANCH_INFO.addressLine2}
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold text-[#141820] mb-2">
              Branch Contact &amp; Hours
            </p>
            <p className="text-sm text-[#555B66] tabular-nums">
              Phone:{' '}
              <a
                href={`tel:+91${BRANCH_INFO.phoneRaw}`}
                className="text-[#141820] font-medium hover:text-[#1D4ED8]"
              >
                {BRANCH_INFO.phoneDisplay}
              </a>
            </p>
            <p className="text-xs text-[#555B66] mt-1 tabular-nums">
              {BRANCH_INFO.weekdayHours}
            </p>
            <p className="text-xs text-[#555B66] mt-0.5 tabular-nums">
              {BRANCH_INFO.sundayHours}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold text-[#141820] mb-2">Quick Links</p>
            <ul className="space-y-1.5 text-sm text-[#555B66]">
              <li>
                <a href="#catalog" className="hover:text-[#141820]">
                  Stationery Catalog
                </a>
              </li>
              <li>
                <a href="#print-desk" className="hover:text-[#141820]">
                  Print &amp; Binding Desk
                </a>
              </li>
              <li>
                <a href="#bulk-inquiry" className="hover:text-[#141820]">
                  Bulk &amp; Booklists
                </a>
              </li>
              <li>
                <a href="#visit-branch" className="hover:text-[#141820]">
                  Branch Directions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#555B66]">
          <p>
            © {new Date().getFullYear()} {BRANCH_INFO.brandName} · Sothupakkam-603319
          </p>
          <p className="tabular-nums">Cheyyur Road (Near Railway Gate) · {BRANCH_INFO.phoneRaw}</p>
        </div>
      </div>
    </footer>
  );
}
