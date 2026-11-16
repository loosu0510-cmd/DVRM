import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, ExternalLink, Minus, Plus, Trash2, X } from 'lucide-react';
import { BRANCH_INFO, type CartItem } from '../data/storeData';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearBag: () => void;
}

interface ConfirmedOrder {
  orderId: string;
  customerName: string;
  customerPhone: string;
  fulfillment: 'pickup' | 'local';
  addressNote: string;
  items: CartItem[];
  totalAmount: number;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearBag,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [fulfillment, setFulfillment] = useState<'pickup' | 'local'>('pickup');
  const [addressNote, setAddressNote] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const handleConfirmOrder = (e: FormEvent) => {
    e.preventDefault();
    const cleanName = customerName.trim();
    const cleanPhone = customerPhone.trim();

    if (!cleanName || cleanPhone.length < 10) {
      setFormError('Please provide your name and a valid 10-digit mobile number.');
      return;
    }

    if (fulfillment === 'local' && !addressNote.trim()) {
      setFormError('Please enter your Sothupakkam street/landmark for local drop-off.');
      return;
    }

    setFormError('');
    const orderId = `VRM-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrder({
      orderId,
      customerName: cleanName,
      customerPhone: cleanPhone,
      fulfillment,
      addressNote: addressNote.trim(),
      items: [...items],
      totalAmount: subtotal,
    });
    onClearBag();
  };

  const whatsappOrderUrl = confirmedOrder
    ? `https://wa.me/${BRANCH_INFO.whatsappNumber}?text=${encodeURIComponent(
        `New Order ${confirmedOrder.orderId} - VRM Stationery (Second Branch)\n` +
          `Customer: ${confirmedOrder.customerName} (${confirmedOrder.customerPhone})\n` +
          `Mode: ${
            confirmedOrder.fulfillment === 'pickup'
              ? 'Store Pickup at Cheyyur Road Branch'
              : `Local Delivery (${confirmedOrder.addressNote})`
          }\n` +
          `Items:\n` +
          confirmedOrder.items
            .map(
              (item) =>
                `- ${item.name} (${item.variantLabel}) x${item.quantity} = ₹${
                  item.unitPrice * item.quantity
                }`
            )
            .join('\n') +
          `\nTotal Payable (Pay at Counter/Cash): ₹${confirmedOrder.totalAmount}`
      )}`
    : '#';

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#141820]/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Order Bag"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col border-l border-[#E2DFD7] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#E2DFD7] flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-[#141820]">
              {confirmedOrder ? 'Order Confirmation' : 'Your Order Bag'}
            </h2>
            <p className="text-xs text-[#555B66]">
              {BRANCH_INFO.branchTitle} · Cheyyur Road
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Order Bag"
            className="p-2 rounded-md text-[#555B66] hover:text-[#141820] hover:bg-[#F8F8F6] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            <div className="p-4 rounded-lg bg-[#F8F8F6] border border-[#E2DFD7]">
              <div className="flex items-center gap-2 text-[#15803D] mb-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="text-xs font-semibold">
                  Order #{confirmedOrder.orderId} Confirmed
                </span>
              </div>
              <p className="text-sm font-semibold text-[#141820]">
                {confirmedOrder.fulfillment === 'pickup'
                  ? 'Ready for packing at Cheyyur Road (Near Railway Gate)'
                  : 'Scheduled for Sothupakkam local verification'}
              </p>
              <p className="text-xs text-[#555B66] mt-1">
                Pay via UPI or Cash at counter. Branch phone: {BRANCH_INFO.phoneDisplay}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#141820] mb-2">
                Receipt Summary
              </p>
              <div className="border border-[#E2DFD7] rounded-lg divide-y divide-[#E2DFD7]">
                {confirmedOrder.items.map((item) => (
                  <div
                    key={item.key}
                    className="px-3.5 py-2.5 flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-[#141820] truncate">{item.name}</p>
                      <p className="text-xs text-[#555B66]">
                        {item.variantLabel} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#141820] tabular-nums shrink-0">
                      ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="px-3.5 py-3 bg-[#F8F8F6] flex items-center justify-between text-sm font-semibold">
                  <span>Total Payable</span>
                  <span className="font-mono tabular-nums">
                    ₹{confirmedOrder.totalAmount}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-md bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold transition-colors"
              >
                <span>Send Order on WhatsApp ({BRANCH_INFO.phoneRaw})</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
              <button
                type="button"
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="w-full px-4 py-2.5 min-h-[42px] rounded-md border border-[#D4D0C5] bg-white hover:border-[#141820] text-[#141820] text-sm font-medium transition-colors cursor-pointer"
              >
                Back to Storefront
              </button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-base font-semibold text-[#141820] mb-1">
              Your order bag is empty
            </p>
            <p className="text-sm text-[#555B66] mb-6 max-w-[28ch]">
              Add notebooks, pens, art supplies, or a print &amp; binding job for quick
              pickup at our Cheyyur Road branch.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 min-h-[40px] rounded-md bg-[#141820] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-colors cursor-pointer"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#E2DFD7]">
              {items.map((item) => (
                <div key={item.key} className="py-4 flex items-start gap-3.5">
                  <div className="w-16 h-16 rounded-md overflow-hidden border border-[#E2DFD7] bg-[#EFECE6] shrink-0">
                    <ResilientImage
                      src={item.image}
                      alt={item.name}
                      fallbackLabel={item.category}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-[#141820] leading-snug">
                        {item.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.key)}
                        aria-label={`Remove ${item.name}`}
                        className="p-1 text-[#555B66] hover:text-red-700 cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[#555B66] mt-0.5">{item.variantLabel}</p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[#E2DFD7] rounded bg-[#F8F8F6]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.key, -1)}
                          aria-label="Decrease quantity"
                          className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center text-[#141820] hover:bg-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.key, 1)}
                          aria-label="Increase quantity"
                          className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center text-[#141820] hover:bg-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-semibold text-[#141820] tabular-nums">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleConfirmOrder}
              className="p-6 border-t border-[#E2DFD7] bg-[#F8F8F6] space-y-4"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-[#555B66]">
                  Subtotal (Pay at Store / Cash)
                </span>
                <span className="font-mono text-lg font-semibold text-[#141820] tabular-nums">
                  ₹{subtotal}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 p-1 bg-white border border-[#E2DFD7] rounded-md">
                <button
                  type="button"
                  onClick={() => setFulfillment('pickup')}
                  className={`py-1.5 px-2 text-xs font-medium rounded cursor-pointer transition-colors ${
                    fulfillment === 'pickup'
                      ? 'bg-[#141820] text-white'
                      : 'text-[#555B66] hover:text-[#141820]'
                  }`}
                >
                  Store Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillment('local')}
                  className={`py-1.5 px-2 text-xs font-medium rounded cursor-pointer transition-colors ${
                    fulfillment === 'local'
                      ? 'bg-[#141820] text-white'
                      : 'text-[#555B66] hover:text-[#141820]'
                  }`}
                >
                  Sothupakkam Delivery
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your Name"
                  aria-label="Customer Name"
                  className="min-h-[40px] px-3 py-2 text-xs bg-white border border-[#E2DFD7] rounded-md text-[#141820] focus:outline-none focus:border-[#1D4ED8]"
                />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="10-digit Phone"
                  aria-label="Phone Number"
                  className="min-h-[40px] px-3 py-2 text-xs font-mono tabular-nums bg-white border border-[#E2DFD7] rounded-md text-[#141820] focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              {fulfillment === 'local' && (
                <input
                  type="text"
                  value={addressNote}
                  onChange={(e) => setAddressNote(e.target.value)}
                  placeholder="Street / Landmark in Sothupakkam-603319"
                  aria-label="Delivery address in Sothupakkam"
                  className="w-full min-h-[40px] px-3 py-2 text-xs bg-white border border-[#E2DFD7] rounded-md text-[#141820] focus:outline-none focus:border-[#1D4ED8]"
                />
              )}

              {formError && (
                <p role="alert" className="text-xs font-medium text-red-700">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="w-full min-h-[44px] px-4 py-2.5 rounded-md bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Confirm {fulfillment === 'pickup' ? 'Pickup' : 'Local'} Order · ₹{subtotal}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
