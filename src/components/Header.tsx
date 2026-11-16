import { ShoppingBag } from 'lucide-react';
import { BRANCH_INFO } from '../data/storeData';

interface HeaderProps {
  totalItems: number;
  onOpenBag: () => void;
}

export function Header({ totalItems, onOpenBag }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#F8F8F6]/95 backdrop-blur-sm border-b border-[#E2DFD7]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-xl font-semibold tracking-tight text-[#141820] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] rounded-sm"
        >
          {BRANCH_INFO.brandName}
        </a>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#555B66]"
        >
          <a
            href="#catalog"
            className="hover:text-[#141820] hover:underline underline-offset-4 decoration-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Catalog
          </a>
          <a
            href="#print-desk"
            className="hover:text-[#141820] hover:underline underline-offset-4 decoration-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Print Desk
          </a>
          <a
            href="#bulk-inquiry"
            className="hover:text-[#141820] hover:underline underline-offset-4 decoration-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Bulk Orders
          </a>
          <a
            href="#visit-branch"
            className="hover:text-[#141820] hover:underline underline-offset-4 decoration-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Visit Branch
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-md bg-[#141820] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" strokeWidth={1.75} />
            <span className="tabular-nums">
              {totalItems > 0 ? `Order Bag (${totalItems})` : 'Order Bag'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
