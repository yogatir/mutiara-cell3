"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { Product } from "@/data/products";
import { useLanguageStore } from "@/store/language";
import { ShoppingBag, Zap, Check, ShieldCheck, Truck, RefreshCw } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  onSelectColor?: (color: string) => void;
}

export function AddToCartButton({ product, onSelectColor }: AddToCartButtonProps) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openCartDrawer = useCartStore((state) => state.openCartDrawer);
  const { language } = useLanguageStore();

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (onSelectColor) {
      onSelectColor(color);
    }
  };

  const handleAddToCart = () => {
    addItem(product, selectedColor);
    setIsAdded(true);
    openCartDrawer();
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, selectedColor);
    router.push("/checkout");
  };

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {language === "ID" ? "Pilihan Warna:" : "Choose Color:"}
            </h3>
            <span className="text-sm font-medium text-[#168287] bg-[#e8f5f6] px-2.5 py-0.5 rounded-full border border-[#168287]/20">
              {selectedColor}
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {product.colors.map((color) => {
              const isSelected = selectedColor === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorChange(color)}
                  className={`py-2.5 px-5 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? "border-[#168287] ring-2 ring-[#168287]/30 text-[#168287] bg-[#e8f5f6] shadow-2xs"
                      : "border-gray-200 text-gray-700 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons: Add to Cart + Buy Now */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`py-3.5 px-6 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm active:scale-98 border ${
            isAdded
              ? "bg-emerald-600 border-emerald-600 text-white"
              : "bg-[#168287] hover:bg-[#11686c] border-[#168287] text-white hover:shadow-md"
          }`}
        >
          {isAdded ? (
            <>
              <Check size={18} className="animate-scale-in" />
              <span>{language === "ID" ? "Berhasil Masuk!" : "Added to Bag!"}</span>
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              <span>{language === "ID" ? "+ Keranjang Belanja" : "+ Add to Bag"}</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="bg-zinc-950 hover:bg-black text-white py-3.5 px-6 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-98"
        >
          <Zap size={18} className="text-amber-400" />
          <span>{language === "ID" ? "Beli Sekarang (Langsung)" : "Buy Now"}</span>
        </button>
      </div>

      {/* Mini Trust Badges */}
      <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center text-gray-600">
        <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50/70 border border-gray-100">
          <ShieldCheck size={18} className="text-[#168287] mb-1" />
          <span className="text-[11px] font-semibold text-gray-800 leading-tight">
            {language === "ID" ? "Garansi Resmi" : "Official Warranty"}
          </span>
          <span className="text-[10px] text-gray-400 mt-0.5">
            {language === "ID" ? "100% Original" : "Certified Device"}
          </span>
        </div>

        <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50/70 border border-gray-100">
          <Truck size={18} className="text-[#168287] mb-1" />
          <span className="text-[11px] font-semibold text-gray-800 leading-tight">
            {language === "ID" ? "Bebas Ongkir" : "Free Shipping"}
          </span>
          <span className="text-[10px] text-gray-400 mt-0.5">
            {language === "ID" ? "Se-Indonesia" : "Nationwide"}
          </span>
        </div>

        <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50/70 border border-gray-100">
          <RefreshCw size={18} className="text-[#168287] mb-1" />
          <span className="text-[11px] font-semibold text-gray-800 leading-tight">
            {language === "ID" ? "Trade-In" : "Trade-In"}
          </span>
          <span className="text-[10px] text-gray-400 mt-0.5">
            {language === "ID" ? "Tukar Tambah" : "Device Upgrade"}
          </span>
        </div>
      </div>
    </div>
  );
}
