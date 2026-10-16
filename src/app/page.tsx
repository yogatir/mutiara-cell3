"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TrustBadges } from "@/components/TrustBadges";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { useLanguageStore } from "@/store/language";

export default function Home() {
  const featuredProducts = products;
  const { language } = useLanguageStore();

  // Produk terlaris untuk hero banner (slider)
  const bestSellers = products.slice(0, 3);

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Hero Section (Carousel Produk Terlaris) */}
      <HeroCarousel products={bestSellers} />

      {/* Trust Badges / Value Proposition */}
      <TrustBadges />

      {/* Category Quick Access */}
      <CategoryShowcase />

      {/* Product Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#168287] uppercase tracking-widest bg-[#e8f5f6] px-3 py-1 rounded-full border border-[#168287]/20">
            {language === 'ID' ? 'Koleksi Unggulan' : 'Featured Collection'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-3">
            {language === 'ID' ? 'Produk Terbaru & Terpopuler' : 'Latest & Popular Products'}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            {language === 'ID' 
              ? 'Temukan inovasi gadget terkini dengan jaminan garansi resmi dan penawaran terbaik.' 
              : 'Explore the latest gadget innovations with official warranty and best offers.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/category/all" className="inline-block border border-gray-300 text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-[#e8f5f6] hover:border-[#168287] hover:text-[#168287] transition-colors shadow-sm">
            {language === 'ID' ? 'Lihat Semua Produk' : 'View All Products'}
          </Link>
        </div>
      </section>
    </div>
  );
}
