"use client";

import Link from "next/link";
import { Smartphone, Tablet, Watch, Headphones, Zap, ArrowRight } from "lucide-react";
import { useLanguageStore } from "@/store/language";

export function CategoryShowcase() {
  const { language } = useLanguageStore();

  const categories = [
    {
      name: "Smartphone",
      slug: "smartphone",
      desc: language === "ID" ? "iPhone, Galaxy, Xiaomi" : "iPhone, Galaxy, Xiaomi",
      icon: Smartphone,
      color: "bg-[#e8f5f6] text-[#168287] group-hover:bg-[#168287]",
    },
    {
      name: "Tablet",
      slug: "tablet",
      desc: language === "ID" ? "iPad & Galaxy Tab" : "iPad & Galaxy Tab",
      icon: Tablet,
      color: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
    },
    {
      name: "Smartwatch",
      slug: "smartwatch",
      desc: language === "ID" ? "Apple Watch & Wearables" : "Apple Watch & Wearables",
      icon: Watch,
      color: "bg-amber-50 text-amber-600 group-hover:bg-amber-600",
    },
    {
      name: "Audio",
      slug: "audio",
      desc: language === "ID" ? "AirPods & Earbuds TWS" : "AirPods & TWS Earbuds",
      icon: Headphones,
      color: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600",
    },
    {
      name: language === "ID" ? "Aksesoris" : "Accessories",
      slug: "aksesoris",
      desc: language === "ID" ? "Charger, MagSafe & Kabel" : "Charger, MagSafe & Cables",
      icon: Zap,
      color: "bg-rose-50 text-rose-600 group-hover:bg-rose-600",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {language === "ID" ? "Kategori Pilihan" : "Popular Categories"}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {language === "ID" ? "Pilih kategori produk gadget yang Anda butuhkan" : "Browse products by your favorite category"}
          </p>
        </div>
        <Link
          href="/category/all"
          className="text-xs sm:text-sm font-semibold text-[#168287] hover:text-[#11686c] flex items-center gap-1 group"
        >
          <span>{language === "ID" ? "Semua Kategori" : "All Categories"}</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center mb-3 group-hover:text-white transition-colors duration-300 shadow-sm`}
              >
                <Icon size={22} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#168287] transition-colors">
                {cat.name}
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">
                {cat.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
