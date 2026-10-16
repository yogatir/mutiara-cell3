"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { AddToCartButton } from "./AddToCartButton";
import { useLanguageStore } from "@/store/language";
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Cpu, 
  Camera, 
  BatteryCharging, 
  Smartphone,
  Share2,
  Check
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.slug === resolvedParams.slug);
  const { language } = useLanguageStore();

  const [activeImage, setActiveImage] = useState(product?.imageUrl || "");
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    notFound();
  }

  const gallery = product.images && product.images.length > 0 ? product.images : [product.imageUrl];
  const currentIndex = gallery.indexOf(activeImage) !== -1 ? gallery.indexOf(activeImage) : 0;

  const desc = language === "EN" && product.descriptionEN ? product.descriptionEN : product.description;

  const handlePrevImage = () => {
    const prevIdx = (currentIndex - 1 + gallery.length) % gallery.length;
    setActiveImage(gallery[prevIdx]);
  };

  const handleNextImage = () => {
    const nextIdx = (currentIndex + 1) % gallery.length;
    setActiveImage(gallery[nextIdx]);
  };

  const handleSelectColor = (colorName: string) => {
    // Try to find an image matching the selected color keywords
    const lowerColor = colorName.toLowerCase();
    const colorKeywords = lowerColor.split(" ");
    
    const matchingImg = gallery.find((img) => {
      const lowerImg = img.toLowerCase();
      return colorKeywords.some((word) => word.length > 2 && lowerImg.includes(word));
    });

    if (matchingImg) {
      setActiveImage(matchingImg);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full min-h-screen">
      {/* Breadcrumb & Share */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-8 pb-4 border-b border-gray-100">
        <nav className="flex items-center space-x-2 truncate">
          <Link href="/" className="hover:text-black transition-colors">
            {language === "ID" ? "Beranda" : "Home"}
          </Link>
          <span>/</span>
          <Link
            href={`/category/${product.category.toLowerCase()}`}
            className="hover:text-black transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-black py-1.5 px-3 rounded-full hover:bg-gray-100 transition-colors"
          title={language === "ID" ? "Salin Link Produk" : "Copy Product Link"}
        >
          {copiedLink ? (
            <>
              <Check size={14} className="text-emerald-600" />
              <span className="text-emerald-600 font-medium">
                {language === "ID" ? "Tersalin!" : "Copied!"}
              </span>
            </>
          ) : (
            <>
              <Share2 size={14} />
              <span className="hidden sm:inline">
                {language === "ID" ? "Bagikan" : "Share"}
              </span>
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left Column: Interactive Product Photo Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Main Photo Showcase */}
          <div className="relative aspect-square w-full bg-[#fbfbfd] rounded-3xl p-6 sm:p-10 flex items-center justify-center border border-gray-100 shadow-xs group overflow-hidden mb-4">
            <Image
              src={activeImage || product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-4 sm:p-8 transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Navigation Arrows (for multiple images) */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 border border-gray-200 shadow-md flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 active:scale-95 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 border border-gray-200 shadow-md flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 active:scale-95 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Photo Counter Pill */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full z-10">
                  {currentIndex + 1} / {gallery.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Gallery Strip */}
          {gallery.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2 custom-scrollbar">
              {gallery.map((img, idx) => {
                const isActive = (activeImage || product.imageUrl) === img;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-2xl flex-shrink-0 bg-[#fbfbfd] p-1.5 border-2 transition-all duration-200 cursor-pointer overflow-hidden ${
                      isActive
                        ? "border-[#168287] ring-2 ring-[#168287]/25 shadow-sm scale-102 bg-white"
                        : "border-gray-200/80 hover:border-gray-400 opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} photo ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Product Information & Purchase Flow */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start">
          {/* Badge & Social Proof */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold text-[#168287] tracking-wider uppercase bg-[#e8f5f6] px-3 py-1 rounded-full border border-[#168287]/20">
              {product.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-900">{product.rating || 4.9}</span>
              <span className="text-gray-400">({product.reviewsCount || 100}+ {language === "ID" ? "ulasan" : "reviews"})</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            {product.name}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-500 mb-6 font-normal leading-relaxed">
            {desc}
          </p>

          {/* Pricing */}
          <div className="mb-8 p-4 rounded-2xl bg-[#fbfbfd] border border-gray-100">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Rp {product.price.toLocaleString("id-ID")}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    Rp {product.originalPrice.toLocaleString("id-ID")}
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                    Hemat Rp {(product.originalPrice - product.price).toLocaleString("id-ID")}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              {language === "ID"
                ? "Harga sudah termasuk PPN 11% & Garansi Resmi Distributor Indonesia."
                : "Prices include 11% VAT and official manufacturer warranty in Indonesia."}
            </p>
          </div>

          {/* Add to Cart Client Component with Color Selection */}
          <AddToCartButton product={product} onSelectColor={handleSelectColor} />

          {/* Specifications Grid */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {language === "ID" ? "Spesifikasi Unggulan" : "Key Specifications"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.specs.screen && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#fbfbfd] border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#168287] flex items-center justify-center flex-shrink-0">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {language === "ID" ? "Layar & Tampilan" : "Display"}
                    </h4>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5 leading-snug">
                      {product.specs.screen}
                    </p>
                  </div>
                </div>
              )}

              {product.specs.chip && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#fbfbfd] border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {language === "ID" ? "Prosesor & Chip" : "Processor / Chip"}
                    </h4>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5 leading-snug">
                      {product.specs.chip}
                    </p>
                  </div>
                </div>
              )}

              {product.specs.camera && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#fbfbfd] border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Camera size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {language === "ID" ? "Sistem Kamera" : "Camera System"}
                    </h4>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5 leading-snug">
                      {product.specs.camera}
                    </p>
                  </div>
                </div>
              )}

              {product.specs.battery && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#fbfbfd] border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <BatteryCharging size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {language === "ID" ? "Daya & Baterai" : "Battery & Charging"}
                    </h4>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5 leading-snug">
                      {product.specs.battery}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
