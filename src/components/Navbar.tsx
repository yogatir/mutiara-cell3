"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, User, LogOut, Search, Globe } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguageStore } from "@/store/language";

export function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { language, setLanguage } = useLanguageStore();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // To avoid hydration mismatch with Zustand persist
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const openCartDrawer = useCartStore((state) => state.openCartDrawer);
  const { isLoggedIn, user, logout } = useAuthStore();
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = language === 'ID' ? [
    { name: "Smartphone", href: "/category/smartphone" },
    { name: "Tablet", href: "/category/tablet" },
    { name: "Smartwatch", href: "/category/smartwatch" },
    { name: "Audio", href: "/category/audio" },
    { name: "Aksesoris", href: "/category/aksesoris" },
  ] : [
    { name: "Smartphone", href: "/category/smartphone" },
    { name: "Tablet", href: "/category/tablet" },
    { name: "Smartwatch", href: "/category/smartwatch" },
    { name: "Audio", href: "/category/audio" },
    { name: "Accessories", href: "/category/aksesoris" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200" : "bg-white border-b border-gray-100"
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="bg-zinc-950 text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {language === 'ID' 
              ? '🎉 Promo Spesial: Gratis Ongkir Seluruh Indonesia • Garansi Resmi TAM/iBox • Cicilan 0%' 
              : '🎉 Special Promo: Free Nationwide Delivery • Official Warranty • 0% Installment'}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-black p-2 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/mutiara-logo.png"
                alt="Mutiara Cell"
                width={140}
                height={38}
                priority
                className="h-8 md:h-9 w-auto object-contain rounded-md"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-gray-600 hover:text-black transition-colors uppercase tracking-widest font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-black p-2 transition-colors"
              title={language === 'ID' ? "Cari" : "Search"}
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>
            
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="text-gray-600 hover:text-black p-2 transition-colors flex items-center space-x-1"
                title={language === 'ID' ? 'Pilih Bahasa' : 'Choose Language'}
              >
                <Globe size={18} />
                <span className="text-[10px] font-bold">{language}</span>
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 shadow-lg rounded-md py-1 z-50">
                  <button
                    onClick={() => {
                      setLanguage('ID');
                      setIsLangMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'ID' ? 'bg-gray-100 font-semibold text-black' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Indonesia
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('EN');
                      setIsLangMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${language === 'EN' ? 'bg-gray-100 font-semibold text-black' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {mounted && isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-600 hidden sm:inline-block truncate max-w-[100px]">
                  {language === 'ID' ? 'Hai' : 'Hi'}, {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-black p-2 transition-colors"
                  title={language === 'ID' ? 'Keluar' : 'Logout'}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-black p-2 transition-colors" title={language === 'ID' ? 'Masuk' : 'Login'}>
                <User size={18} />
              </Link>
            )}
            
            <button
              type="button"
              onClick={openCartDrawer}
              className="text-gray-600 hover:text-black p-2 relative transition-colors"
              title={language === 'ID' ? "Buka Tas Belanja" : "Open Shopping Bag"}
              aria-label={language === 'ID' ? "Buka Tas Belanja" : "Open Shopping Bag"}
            >
              <ShoppingBag size={18} />
              {mounted && totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#168287] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Dropdown with Popular Searches */}
      <div className={`absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-xl overflow-hidden transition-all duration-300 ${isSearchOpen ? 'max-h-48 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search className="absolute left-4 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ID' ? "Cari smartphone, tablet, aksesoris..." : "Search smartphones, tablets, accessories..."}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-[#168287] focus:bg-white transition-all text-sm"
              autoFocus={isSearchOpen}
            />
          </form>

          {/* Quick search chips */}
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400 font-medium">
              {language === 'ID' ? 'Pencarian Populer:' : 'Popular:'}
            </span>
            {['iPhone 15 Pro', 'Galaxy S24', 'Apple Watch', 'AirPods Pro', 'Xiaomi 17'].map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(keyword)}`);
                  setIsSearchOpen(false);
                }}
                className="text-xs bg-gray-100 hover:bg-[#168287] hover:text-white text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-black block px-3 py-2 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
