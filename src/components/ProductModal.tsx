import { useEffect, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import type { ProductItem, ProductVariant } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToBag: (product: ProductItem, variant: ProductVariant, quantity: number) => void;
}

export function ProductModal({ product, onClose, onAddToBag }: ProductModalProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedVariantId(product.variants[0].id);
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  const handleConfirmAdd = () => {
    onAddToBag(product, activeVariant, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141820]/50 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white border border-[#E2DFD7] rounded-lg overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:col-span-6 bg-[#EFECE6] aspect-4/3 md:aspect-auto">
          <ResilientImage
            src={product.image}
            alt={product.name}
            fallbackLabel={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-6 p-6 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <p className="text-xs font-medium text-[#555B66]">
                {product.category}
                <span aria-hidden="true" className="mx-1.5">
                  ·
                </span>
                {product.availability}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close product details"
                className="p-1.5 -mt-1 -mr-1 rounded-md text-[#555B66] hover:text-[#141820] hover:bg-[#F8F8F6] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3
              id="pdp-modal-title"
              className="font-display text-xl sm:text-2xl font-semibold text-[#141820] leading-snug mb-2"
            >
              {product.name}
            </h3>

            <p className="font-mono text-xl font-semibold text-[#141820] tabular-nums mb-4">
              ₹{activeVariant.price}
            </p>

            <p className="text-sm text-[#555B66] leading-relaxed mb-5">
              {product.description}
            </p>

            <div className="mb-5">
              <p className="text-xs font-semibold text-[#141820] mb-2">
                Select Pack / Option
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const selected = variant.id === activeVariant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`px-3 py-2 min-h-[40px] rounded-md text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selected
                          ? 'bg-[#141820] text-white border-[#141820]'
                          : 'bg-[#F8F8F6] text-[#141820] border-[#E2DFD7] hover:border-[#141820]'
                      }`}
                    >
                      {variant.label} · ₹{variant.price}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2DFD7] flex items-center gap-3">
            <div className="inline-flex items-center border border-[#E2DFD7] rounded-md bg-[#F8F8F6]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="p-2.5 min-h-[40px] min-w-[40px] flex items-center justify-center text-[#141820] hover:bg-white cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 text-sm font-mono font-semibold tabular-nums text-[#141820]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="p-2.5 min-h-[40px] min-w-[40px] flex items-center justify-center text-[#141820] hover:bg-white cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleConfirmAdd}
              className="flex-1 min-h-[44px] px-4 py-2.5 rounded-md bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Add to Bag · ₹{activeVariant.price * quantity}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
