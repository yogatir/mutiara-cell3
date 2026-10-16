"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useLanguageStore } from "@/store/language";

interface HeroCarouselProps {
  products: Product[];
}

export function HeroCarousel({ products }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguageStore();

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [products.length, isHovered]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  if (!products.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4 w-full">
      <div 
        className="relative w-full h-[520px] md:h-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white shadow-2xl border border-zinc-800"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ambient lighting effect */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#168287]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-zinc-700/20 rounded-full blur-3xl pointer-events-none" />

        {/* Slides */}
        {products.map((product, index) => {
          const desc = language === "EN" && product.descriptionEN ? product.descriptionEN : product.description;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={product.id}
              className={`absolute inset-0 flex flex-col-reverse md:flex-row transition-all duration-700 ease-in-out ${
                isCurrent
                  ? "opacity-100 z-10 translate-y-0"
                  : "opacity-0 z-0 translate-y-4 pointer-events-none"
              }`}
            >
              {/* Text Content */}
              <div className="w-full md:w-1/2 h-[55%] md:h-full flex flex-col items-center md:items-start justify-center text-center md:text-left px-6 sm:px-12 lg:px-16 z-10">
                <div className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-white/10 text-zinc-200 text-xs font-semibold tracking-wider mb-4 border border-white/15 uppercase backdrop-blur-md">
                  <Sparkles size={13} className="text-amber-400" />
                  <span>{language === "ID" ? "Produk Terlaris" : "Best Sellers"}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight text-white leading-tight">
                  {product.name}
                </h1>

                <p className="text-sm md:text-base text-zinc-300 mb-2 font-light max-w-md line-clamp-2">
                  {desc}
                </p>

                <p className="text-xs sm:text-sm font-medium text-[#25adb5] mb-6">
                  {language === "ID" ? "Mulai dari" : "From"} Rp {product.price.toLocaleString("id-ID")}
                </p>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={() => {
                      useCartStore.getState().addItem(product);
                      useCartStore.getState().openCartDrawer();
                    }}
                    className="bg-[#168287] hover:bg-[#11686c] text-white px-7 py-2.5 rounded-full font-medium transition-all shadow-lg hover:shadow-[#168287]/30 active:scale-95 text-sm sm:text-base"
                  >
                    {language === "ID" ? "Beli Sekarang" : "Buy Now"}
                  </button>
                  <Link
                    href={`/product/${product.slug}`}
                    className="border border-white/25 hover:border-white text-white hover:bg-white/10 px-6 py-2.5 rounded-full font-medium transition-all text-sm sm:text-base backdrop-blur-sm"
                  >
                    {language === "ID" ? "Lihat Detail" : "View Details"}
                  </Link>
                </div>
              </div>

              {/* Product Image */}
              <div className="w-full md:w-1/2 h-[45%] md:h-full relative flex items-center justify-center p-6 md:p-10 z-10">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-4 md:p-8 drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] transition-transform duration-700 hover:scale-105"
                  priority={index === 0}
                />
              </div>
            </div>
          );
        })}

        {/* Desktop Arrow Controls */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white items-center justify-center backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Centered Slider Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-7"
                  : "bg-white/30 w-2 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
