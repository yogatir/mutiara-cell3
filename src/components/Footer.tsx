"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguageStore } from "@/store/language";

export function Footer() {
  const { language } = useLanguageStore();

  return (
    <footer className="bg-[#f5f5f7] pt-12 pb-10 border-t border-gray-200 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/images/mutiara-logo.png"
                alt="Mutiara Cell"
                width={140}
                height={38}
                className="h-8 w-auto object-contain rounded-md"
              />
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm mb-4">
              {language === "ID"
                ? "Toko gadget dan aksesoris resmi terpercaya di Indonesia. Menyediakan jajaran produk teknologi terkini dengan jaminan garansi resmi dan layanan purna jual terbaik."
                : "Trusted official gadget and tech store in Indonesia. Offering original cutting-edge devices with guaranteed official warranty and dedicated support."}
            </p>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-400 flex-shrink-0" />
                <span>{language === "ID" ? "Senin – Minggu: 09:00 – 21:00 WIB" : "Mon – Sun: 09:00 – 21:00 WIB"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gray-400 flex-shrink-0" />
                <span>+62 812-3456-7890 (WhatsApp CS)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gray-400 flex-shrink-0" />
                <span>cs@mutiaracell.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Produk Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{language === "ID" ? "Kategori Produk" : "Categories"}</h3>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="/category/smartphone" className="hover:text-black transition-colors">Smartphone</Link></li>
              <li><Link href="/category/tablet" className="hover:text-black transition-colors">Tablet</Link></li>
              <li><Link href="/category/smartwatch" className="hover:text-black transition-colors">Smartwatch</Link></li>
              <li><Link href="/category/audio" className="hover:text-black transition-colors">Audio</Link></li>
              <li><Link href="/category/aksesoris" className="hover:text-black transition-colors">{language === "ID" ? "Aksesoris" : "Accessories"}</Link></li>
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{language === "ID" ? "Bantuan & Layanan" : "Help & Services"}</h3>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="/service" className="hover:text-black transition-colors">Service Center</Link></li>
              <li><Link href="/trade-in" className="hover:text-black transition-colors">Trade-In (Tukar Tambah)</Link></li>
              <li><Link href="/warranty" className="hover:text-black transition-colors">Klaim Garansi Resmi</Link></li>
              <li><Link href="/contact" className="hover:text-black transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{language === "ID" ? "Ikuti Kami" : "Follow Us"}</h3>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Instagram (@mutiaracell)</a></li>
              <li><a href="#" className="hover:text-black transition-colors">TikTok (@mutiaracell)</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-black transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Shipping & Payment Section */}
        <div className="py-8 border-t border-gray-200/80 grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          {/* Shipping */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-4 tracking-wider uppercase">
              {language === "ID" ? "Metode Pengiriman Resmi" : "Shipping & Delivery Partners"}
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="bg-white rounded-xl w-20 h-11 flex items-center justify-center p-2 shadow-sm border border-gray-200/70 hover:shadow-md transition-shadow">
                <div className="relative w-full h-full">
                  <Image src="/images/jt-express-logo-png_seeklogo-336498.png" alt="J&T Express" fill className="object-contain" unoptimized />
                </div>
              </div>
              <div className="bg-white rounded-xl w-20 h-11 flex items-center justify-center p-2 shadow-sm border border-gray-200/70 hover:shadow-md transition-shadow">
                <div className="relative w-full h-full">
                  <Image src="/images/logojneexpress.png" alt="JNE Express" fill className="object-contain" unoptimized />
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-4 tracking-wider uppercase">
              {language === "ID" ? "Metode Pembayaran Terverifikasi" : "Verified Payment Methods"}
            </h4>
            <div className="flex flex-wrap gap-2.5 items-center">
              {[
                { src: "/images/bank-mandiri-logo-png_seeklogo-16290.png", alt: "Mandiri" },
                { src: "/images/bri-logo.png", alt: "BRI" },
                { src: "/images/bank-bni-logo-png_seeklogo-355606.png", alt: "BNI" },
                { src: "/images/bca-bank-logo-png_seeklogo-232742.png", alt: "BCA" },
                { src: "/images/permatabank-logo-png_seeklogo-633996.png", alt: "PermataBank" },
                { src: "/images/alfamart-logo-png_seeklogo-339891.png", alt: "Alfamart" },
              ].map((bank) => (
                <div key={bank.alt} className="bg-white rounded-xl w-16 h-10 flex items-center justify-center p-1.5 shadow-sm border border-gray-200/70 hover:shadow-md transition-shadow">
                  <div className="relative w-full h-full">
                    <Image src={bank.src} alt={bank.alt} fill className="object-contain" unoptimized />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p className="mb-3 md:mb-0">
            &copy; {new Date().getFullYear()} Mutiara Cell. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">
              {language === "ID" ? "Kebijakan Privasi" : "Privacy Policy"}
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">
              {language === "ID" ? "Syarat & Ketentuan" : "Terms & Conditions"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
