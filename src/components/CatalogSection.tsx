import { useMemo, useState } from 'react';
import { Check, Plus, Search, X } from 'lucide-react';
import {
  CATALOG_CATEGORIES,
  CATALOG_ITEMS,
  type ProductCategory,
  type ProductItem,
  type ProductVariant,
} from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  onAddToBag: (product: ProductItem, variant: ProductVariant, quantity: number) => void;
  onSelectProduct: (product: ProductItem) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc';

export function CatalogSection({ onAddToBag, onSelectProduct }: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = CATALOG_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.packSummary.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.variants[0].price - b.variants[0].price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.variants[0].price - a.variants[0].price);
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleQuickAdd = (product: ProductItem) => {
    const defaultVariant = product.variants[0];
    onAddToBag(product, defaultVariant, 1);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1200);
  };

  return (
    <section id="catalog" className="py-14 lg:py-20 border-b border-[#E2DFD7] bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-medium text-[#555B66] mb-2">
              In-Store Inventory · Ready for Pickup
            </p>
            <h2
              className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#141820]"
              style={{ textWrap: 'balance' }}
            >
              Stationery &amp; School Supply Catalog
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#555B66] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                strokeWidth={1.75}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notebooks, pens, A4..."
                aria-label="Search stationery catalog"
                className="w-full sm:w-64 min-h-[40px] pl-9 pr-8 py-2 text-sm bg-[#F8F8F6] border border-[#E2DFD7] rounded-md text-[#141820] placeholder:text-[#555B66]/70 focus:outline-none focus:border-[#1D4ED8]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#555B66] hover:text-[#141820] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort products"
              className="min-h-[40px] px-3 py-2 text-sm bg-[#F8F8F6] border border-[#E2DFD7] rounded-md text-[#141820] focus:outline-none focus:border-[#1D4ED8] cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Product Categories"
          className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 border-b border-[#E2DFD7]"
        >
          {CATALOG_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 min-h-[40px] text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                  active
                    ? 'bg-[#141820] text-white'
                    : 'text-[#555B66] hover:text-[#141820] hover:bg-[#F8F8F6]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 px-6 text-center border border-[#E2DFD7] rounded-lg bg-[#F8F8F6]">
            <p className="text-base font-semibold text-[#141820] mb-1">
              No matching stationery items found
            </p>
            <p className="text-sm text-[#555B66] mb-5">
              Try a different keyword or clear the active category filter. Need a specific
              school book or brand? Call our desk at 9790586876.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 min-h-[40px] rounded-md bg-[#141820] text-white text-sm font-medium hover:bg-[#1D4ED8] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const startingPrice = product.variants[0].price;
              const isAdded = recentlyAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group flex flex-col border border-[#E2DFD7] rounded-lg bg-[#F8F8F6] overflow-hidden transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="block w-full aspect-4/3 bg-[#EFECE6] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#1D4ED8]"
                  >
                    <ResilientImage
                      src={product.image}
                      alt={product.name}
                      fallbackLabel={product.name}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  </button>

                  <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                    <div>
                      <div className="flex items-center justify-between gap-3 text-xs text-[#555B66] mb-2">
                        <span className="truncate">
                          {product.category}
                          <span aria-hidden="true" className="mx-1.5">
                            ·
                          </span>
                          {product.packSummary}
                        </span>
                        <span className="shrink-0 font-medium text-[#141820]/75">
                          {product.availability}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="text-left text-base font-semibold text-[#141820] hover:text-[#1D4ED8] transition-colors leading-snug cursor-pointer"
                      >
                        {product.name}
                      </button>

                      <p className="mt-1.5 text-xs text-[#555B66]">
                        {product.variants.length > 1
                          ? `${product.variants.length} pack options available`
                          : product.variants[0].label}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E2DFD7] flex items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-base font-semibold text-[#141820] tabular-nums">
                          ₹{startingPrice}
                        </span>
                        {product.variants.length > 1 && (
                          <span className="text-xs text-[#555B66] ml-1.5">onwards</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="px-3 py-2 min-h-[40px] rounded-md border border-[#D4D0C5] bg-white hover:border-[#141820] text-[#141820] text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Options
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(product)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isAdded
                              ? 'bg-[#15803D] text-white'
                              : 'bg-[#141820] hover:bg-[#1D4ED8] text-white'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                              <span>Add to Bag</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
