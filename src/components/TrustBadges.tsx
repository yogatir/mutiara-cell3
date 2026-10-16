"use client";

import { ShieldCheck, Truck, CreditCard, RefreshCw } from "lucide-react";
import { useLanguageStore } from "@/store/language";

export function TrustBadges() {
  const { language } = useLanguageStore();

  const badges = [
    {
      icon: ShieldCheck,
      title: language === "ID" ? "100% Produk Original" : "100% Original Products",
      desc: language === "ID" ? "Garansi Resmi TAM, SEIN & iBox" : "Official warranty & certified IMEI",
    },
    {
      icon: Truck,
      title: language === "ID" ? "Gratis Ongkir & Asuransi" : "Free Shipping & Insurance",
      desc: language === "ID" ? "Pengiriman aman ke seluruh Indonesia" : "Fast & safe nationwide delivery",
    },
    {
      icon: CreditCard,
      title: language === "ID" ? "Cicilan 0% s/d 24 Bulan" : "0% Installment up to 24 Mos",
      desc: language === "ID" ? "Didukung berbagai bank terkemuka" : "Supported by major credit cards",
    },
    {
      icon: RefreshCw,
      title: language === "ID" ? "Trade-In & Purna Jual" : "Trade-In & Support",
      desc: language === "ID" ? "Tukar tambah mudah & klaim garansi resmi" : "Easy device exchange & official repair",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-gray-200 transition-all flex items-center space-x-3.5 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#e8f5f6] text-[#168287] flex items-center justify-center flex-shrink-0 group-hover:bg-[#168287] group-hover:text-white transition-colors duration-300">
                <Icon size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 leading-snug">
                  {badge.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
