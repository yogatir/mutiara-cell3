"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    shippingMethod: "jne",
    paymentMethod: "bca",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Keranjang kosong</h1>
        <p className="text-gray-500 mb-8">Anda harus menambahkan produk ke keranjang untuk melakukan checkout.</p>
        <Link href="/" className="bg-[#168287] text-white px-8 py-3 rounded-full font-medium hover:bg-[#11686c] transition-colors">
          Kembali Berbelanja
        </Link>
      </div>
    );
  }

  const shippingCost = formData.shippingMethod === "jne" ? 25000 : formData.shippingMethod === "jnt" ? 22000 : 0;
  const grandTotal = totalPrice + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and success redirect
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form Section */}
        <div className="w-full lg:w-2/3">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Informasi Kontak</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Depan *</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#168287] focus:border-[#168287]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Belakang *</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#168287] focus:border-[#168287]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#168287] focus:border-[#168287]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon/WhatsApp *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#168287] focus:border-[#168287]" />
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Alamat Pengiriman</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap *</label>
                  <textarea required name="address" rows={3} value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#168287] focus:border-[#168287]" placeholder="Nama jalan, gedung, no rumah"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi *</label>
                    <input required type="text" name="province" value={formData.province} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#168287] focus:border-[#168287]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kota/Kabupaten *</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#168287] focus:border-[#168287]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos *</label>
                    <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-[#168287] focus:border-[#168287]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Metode Pengiriman</h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="shippingMethod" value="jne" checked={formData.shippingMethod === "jne"} onChange={handleChange} className="h-4 w-4 text-[#168287] focus:ring-[#168287]" />
                  <div className="ml-3 w-12 h-6 relative shrink-0 hidden sm:block"><Image src="/images/logojneexpress.png" alt="JNE" fill className="object-contain" unoptimized /></div>
                  <span className="ml-3 flex-grow">JNE Reguler (Estimasi 2-3 hari)</span>
                  <span className="font-medium">Rp 25.000</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="shippingMethod" value="jnt" checked={formData.shippingMethod === "jnt"} onChange={handleChange} className="h-4 w-4 text-[#168287] focus:ring-[#168287]" />
                  <div className="ml-3 w-12 h-6 relative shrink-0 hidden sm:block overflow-hidden"><Image src="/images/jt-express-logo-png_seeklogo-336498.png" alt="J&T Express" fill className="object-contain scale-[1.5]" unoptimized /></div>
                  <span className="ml-3 flex-grow">J&T Express (Estimasi 2-4 hari)</span>
                  <span className="font-medium">Rp 22.000</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="shippingMethod" value="pickup" checked={formData.shippingMethod === "pickup"} onChange={handleChange} className="h-4 w-4 text-[#168287] focus:ring-[#168287]" />
                  <div className="ml-3 w-12 h-6 shrink-0 hidden sm:flex items-center justify-center bg-gray-100 rounded-md"><span className="text-xs font-semibold text-gray-600">STORE</span></div>
                  <span className="ml-3 flex-grow">Ambil di Toko (Gratis)</span>
                  <span className="font-medium">Rp 0</span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Metode Pembayaran</h2>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="bca" checked={formData.paymentMethod === "bca"} onChange={handleChange} className="h-4 w-4 text-[#168287] focus:ring-[#168287]" />
                  <div className="ml-3 w-12 h-6 relative shrink-0 hidden sm:block"><Image src="/images/bca-bank-logo-png_seeklogo-232742.png" alt="BCA" fill className="object-contain" unoptimized /></div>
                  <span className="ml-3 flex-grow">Transfer Bank BCA</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="mandiri" checked={formData.paymentMethod === "mandiri"} onChange={handleChange} className="h-4 w-4 text-[#168287] focus:ring-[#168287]" />
                  <div className="ml-3 w-12 h-6 relative shrink-0 hidden sm:block"><Image src="/images/bank-mandiri-logo-png_seeklogo-16290.png" alt="Mandiri" fill className="object-contain" unoptimized /></div>
                  <span className="ml-3 flex-grow">Transfer Bank Mandiri</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="bri" checked={formData.paymentMethod === "bri"} onChange={handleChange} className="h-4 w-4 text-[#168287] focus:ring-[#168287]" />
                  <div className="ml-3 w-12 h-6 relative shrink-0 hidden sm:block"><Image src="/images/bri-logo.png" alt="BRI" fill className="object-contain" unoptimized /></div>
                  <span className="ml-3 flex-grow">Transfer Bank BRI</span>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === "cod"} onChange={handleChange} className="h-4 w-4 text-[#168287] focus:ring-[#168287]" />
                  <div className="ml-3 w-12 h-6 shrink-0 hidden sm:flex items-center justify-center bg-gray-100 rounded-md"><span className="text-xs font-semibold text-gray-600">COD</span></div>
                  <span className="ml-3 flex-grow">Bayar di Tempat (COD)</span>
                </label>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#168287] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#11686c] transition-colors disabled:bg-[#168287]/50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Memproses..." : "Buat Pesanan"}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Ringkasan Pesanan</h2>
            
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-4">
                  <div className="w-16 h-16 relative bg-white rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">Warna: {item.selectedColor || "Bawaan"}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-500">{item.quantity} x</span>
                      <span className="text-sm font-medium text-gray-900">Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900">Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pengiriman</span>
                <span className="font-medium text-gray-900">Rp {shippingCost.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-base font-bold text-gray-900">Total Akhir</span>
                <span className="text-xl font-bold text-[#168287]">Rp {grandTotal.toLocaleString("id-ID")}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">Sudah termasuk pajak</p>
            </div>

            <button 
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full lg:hidden bg-[#168287] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#11686c] transition-colors disabled:bg-[#168287]/50 disabled:cursor-not-allowed mb-4"
            >
              {isSubmitting ? "Memproses..." : "Buat Pesanan"}
            </button>

            <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pembayaran aman dan terenkripsi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
