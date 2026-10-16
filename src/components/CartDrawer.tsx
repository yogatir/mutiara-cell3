"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useLanguageStore } from "@/store/language";

export function CartDrawer() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const [mounted, setMounted] = useState(false);
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    removeItem,
    updateQuantity,
    totalPrice,
  } = useCartStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    // Avoid hydration mismatch
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Handle ESC key and scroll locking
  useEffect(() => {
    if (!isCartDrawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCartDrawer();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartDrawerOpen, closeCartDrawer]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${
        isCartDrawerOpen ? "visible" : "invisible delay-300"
      }`}
      aria-labelledby="cart-drawer-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isCartDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          className={`w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
            isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#e8f5f6] text-[#168287] flex items-center justify-center">
                <ShoppingBag size={18} />
              </div>
              <h2 id="cart-drawer-title" className="text-lg font-bold text-gray-900 tracking-tight">
                {language === "ID" ? "Tas Belanja" : "Shopping Bag"}
              </h2>
              {totalItems > 0 && (
                <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">
                  {totalItems} {language === "ID" ? "item" : "items"}
                </span>
              )}
            </div>

            <button
              onClick={closeCartDrawer}
              className="w-8 h-8 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 flex items-center justify-center transition-colors"
              aria-label={language === "ID" ? "Tutup keranjang" : "Close cart"}
            >
              <X size={20} />
            </button>
          </div>

          {/* Shipping Benefit Notification */}
          <div className="bg-[#e8f5f6]/70 border-b border-[#168287]/10 px-5 py-2.5 flex items-center gap-2 text-xs text-[#168287] font-medium">
            <Truck size={15} className="flex-shrink-0" />
            <span>
              {language === "ID"
                ? "Gratis Ongkir & Asuransi Pengiriman Resmi"
                : "Free Nationwide Shipping & Insurance Included"}
            </span>
          </div>

          {/* Cart Content */}
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-4 border border-gray-100">
                <ShoppingBag size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {language === "ID" ? "Tas Belanja Anda Kosong" : "Your Shopping Bag is Empty"}
              </h3>
              <p className="text-xs text-gray-500 max-w-xs mb-6">
                {language === "ID"
                  ? "Temukan smartphone, smartwatch, audio, atau tablet impian Anda di katalog resmi kami."
                  : "Discover smartphones, tablets, audio, or accessories in our official catalog."}
              </p>
              <button
                onClick={closeCartDrawer}
                className="bg-[#168287] hover:bg-[#11686c] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm active:scale-95"
              >
                {language === "ID" ? "Mulai Belanja" : "Start Shopping"}
              </button>
            </div>
          ) : (
            /* Item List */
            <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.cartItemId} className="py-4 first:pt-0 last:pb-0 flex gap-4 group">
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCartDrawer}
                    className="relative w-20 h-20 rounded-xl bg-[#fbfbfd] border border-gray-100 flex-shrink-0 overflow-hidden p-2 flex items-center justify-center hover:border-gray-300 transition-colors"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCartDrawer}
                          className="text-sm font-semibold text-gray-900 hover:text-[#168287] transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-gray-400 hover:text-rose-600 transition-colors p-0.5"
                          title={language === "ID" ? "Hapus produk" : "Remove item"}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Variant badge */}
                      {item.selectedColor && (
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-gray-500">
                          <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
                          <span>{item.selectedColor}</span>
                        </div>
                      )}

                      <div className="mt-1.5 text-xs font-bold text-gray-900">
                        Rp {item.price.toLocaleString("id-ID")}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-600 active:scale-95 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 text-gray-600 active:scale-95 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="text-xs font-semibold text-gray-600">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-5 bg-[#fafafc] space-y-3.5">
              {/* Subtotal */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{language === "ID" ? "Subtotal" : "Subtotal"}</span>
                  <span className="font-medium text-gray-900">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{language === "ID" ? "Estimasi Pengiriman" : "Estimated Shipping"}</span>
                  <span className="text-emerald-600 font-semibold uppercase text-[11px]">
                    {language === "ID" ? "Gratis Ongkir" : "Free Delivery"}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-[#168287]">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </span>
                    <p className="text-[10px] text-gray-400">
                      {language === "ID" ? "Termasuk PPN & Garansi Resmi" : "Tax & Warranty Included"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    closeCartDrawer();
                    router.push("/checkout");
                  }}
                  className="w-full bg-[#168287] hover:bg-[#11686c] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                >
                  <span>{language === "ID" ? "Lanjut ke Pembayaran" : "Proceed to Checkout"}</span>
                  <ArrowRight size={16} />
                </button>

                <Link
                  href="/cart"
                  onClick={closeCartDrawer}
                  className="w-full bg-white hover:bg-gray-100 border border-gray-200 text-gray-800 py-2.5 px-4 rounded-xl font-semibold text-xs text-center block transition-colors shadow-2xs"
                >
                  {language === "ID" ? "Lihat Halaman Tas Lengkap" : "View Full Cart Page"}
                </Link>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>{language === "ID" ? "Garansi Resmi & Transaksi 100% Aman" : "Official Warranty & 100% Secure Checkout"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
