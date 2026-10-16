"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="mb-6 text-green-500 flex justify-center">
        <CheckCircle size={80} strokeWidth={1.5} />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
        Pesanan Berhasil Dibuat!
      </h1>
      <p className="text-lg text-gray-500 mb-2 max-w-lg">
        Terima kasih telah berbelanja di Mutiara Cell. Pesanan Anda sedang kami proses.
      </p>
      <p className="text-gray-500 mb-8 max-w-lg">
        Detail pesanan dan instruksi pembayaran telah dikirim ke email Anda.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="bg-[#168287] text-white px-8 py-3 rounded-full font-medium hover:bg-[#11686c] transition-colors"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/category/smartphone"
          className="bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-full font-medium hover:bg-[#e8f5f6] hover:border-[#168287] hover:text-[#168287] transition-colors"
        >
          Lanjut Belanja
        </Link>
      </div>
    </div>
  );
}
