"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Heart, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useLanguageStore } from "@/store/language";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const openCartDrawer = useCartStore((state) => state.openCartDrawer);
  const { language } = useLanguageStore();
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setIsAdded(true);
    openCartDrawer();
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    router.push("/checkout");
  };

  const desc = language === "EN" && product.descriptionEN ? product.descriptionEN : product.description;
  const badgeText = language === "EN" && product.badgeEN ? product.badgeEN : (product.badge || (language === "ID" ? "Baru" : "New"));
  
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-[#fbfbfd] border border-gray-100/80 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col group relative">
      {/* Top Floating Badges & Wishlist */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <span className="pointer-events-auto inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-[#168287] border border-[#168287]/20 shadow-sm backdrop-blur-sm">
          {badgeText}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/60 flex items-center justify-center hover:bg-white text-gray-400 hover:text-rose-500 shadow-sm transition-all active:scale-90"
          aria-label="Wishlist"
        >
          <Heart size={15} className={isLiked ? "fill-rose-500 text-rose-500" : ""} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square w-full mt-4 mb-5 flex-shrink-0 overflow-hidden rounded-xl bg-white p-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </Link>
      
      {/* Product Information */}
      <div className="flex flex-col flex-grow text-center">
        {/* Rating & Social Proof */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-gray-800">{product.rating || 4.9}</span>
          <span className="text-[11px] text-gray-400">({product.reviewsCount || 80})</span>
          <span className="text-gray-300">•</span>
          <span className="text-[11px] text-emerald-600 font-medium">
            {language === "ID" ? "Garansi Resmi" : "Official Warranty"}
          </span>
        </div>

        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-1.5 hover:text-[#168287] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Short Description */}
        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {desc}
        </p>

        {/* Price Section */}
        <div className="mt-auto mb-4">
          <div className="text-base font-bold text-gray-900">
            Rp {product.price.toLocaleString("id-ID")}
          </div>
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="flex items-center justify-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400 line-through">
                Rp {product.originalPrice.toLocaleString("id-ID")}
              </span>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">
                -{discountPercent}%
              </span>
            </div>
          )}
        </div>
        
        {/* Actions: Add to Cart + Buy Now */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <button 
              type="button"
              onClick={handleAddToCart}
              className={`py-2 px-2 rounded-full font-medium text-xs border transition-all flex items-center justify-center gap-1 active:scale-95 ${
                isAdded 
                  ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm" 
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-black hover:border-gray-300"
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={13} className="text-emerald-600" />
                  <span>{language === "ID" ? "Masuk!" : "Added!"}</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={13} />
                  <span>{language === "ID" ? "+ Keranjang" : "+ Cart"}</span>
                </>
              )}
            </button>

            <button 
              type="button"
              onClick={handleBuyNow}
              className="bg-[#168287] text-white py-2 px-2 rounded-full font-medium text-xs hover:bg-[#11686c] transition-colors shadow-sm active:scale-95"
            >
              {language === "ID" ? "Beli Sekarang" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
