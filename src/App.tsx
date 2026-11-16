import { useEffect, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PrintAndBranchSection } from './components/PrintAndBranchSection';
import { ProductModal } from './components/ProductModal';
import {
  STORE_IMAGES,
  type CartItem,
  type ProductItem,
  type ProductVariant,
} from './data/storeData';

const STORAGE_KEY = 'vrm_stationery_bag_v1';

export default function App() {
  const [bagItems, setBagItems] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage read errors in restricted contexts
    }
    return [];
  });

  const [isBagOpen, setIsBagOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bagItems));
    } catch {
      // Ignore storage write errors
    }
  }, [bagItems]);

  const handleAddToBag = (
    product: ProductItem,
    variant: ProductVariant,
    quantity: number
  ) => {
    const itemKey = `${product.id}__${variant.id}`;
    setBagItems((prev) => {
      const existing = prev.find((item) => item.key === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          productId: product.id,
          name: product.name,
          variantLabel: variant.label,
          category: product.category,
          unitPrice: variant.price,
          quantity,
          image: product.image,
        },
      ];
    });
  };

  const handleAddPrintJob = (title: string, detail: string, totalCost: number) => {
    const jobKey = `print__${Date.now()}`;
    setBagItems((prev) => [
      ...prev,
      {
        key: jobKey,
        productId: 'print-desk-job',
        name: title,
        variantLabel: detail,
        category: 'Print & Binding',
        unitPrice: totalCost,
        quantity: 1,
        image: STORE_IMAGES.print,
        isPrintJob: true,
      },
    ]);
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setBagItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleClearBag = () => {
    setBagItems([]);
  };

  const totalItems = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#141820]">
      <Header totalItems={totalItems} onOpenBag={() => setIsBagOpen(true)} />

      <main className="flex-1">
        <HeroSection />
        <CatalogSection
          onAddToBag={handleAddToBag}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />
        <PrintAndBranchSection onAddPrintJob={handleAddPrintJob} />
      </main>

      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToBag={handleAddToBag}
      />

      <CartDrawer
        isOpen={isBagOpen}
        items={bagItems}
        onClose={() => setIsBagOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
      />
    </div>
  );
}
