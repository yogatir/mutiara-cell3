"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, updateColor, totalPrice } = useCartStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Memuat keranjang...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Keranjang belanja Anda kosong.
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Belanja untuk melihat produk ditambahkan di sini.
        </p>
        <Link
          href="/"
          className="bg-[#168287] text-white px-8 py-3 rounded-full font-medium hover:bg-[#11686c] transition-colors"
        >
          Lanjut Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 tracking-tight">
        Tinjau tas Anda.
      </h1>

      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.cartItemId} className="flex flex-col sm:flex-row items-start sm:items-center py-8 border-b border-gray-200">
            <div className="w-32 h-32 relative flex-shrink-0 bg-[#fbfbfd] rounded-xl overflow-hidden mb-4 sm:mb-0 sm:mr-8">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="flex-grow w-full flex flex-col sm:flex-row justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  <Link href={`/product/${item.slug}`} className="hover:underline">
                    {item.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 mb-4">Rp {item.price.toLocaleString("id-ID")}</p>
                
                {item.colors && item.colors.length > 0 ? (
                  <div className="flex items-center text-sm text-gray-600 mb-4 w-fit">
                    <span className="font-medium mr-2">Warna:</span>
                    <select
                      value={item.selectedColor || item.colors[0]}
                      onChange={(e) => updateColor(item.cartItemId, e.target.value)}
                      className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#168287] focus:border-[#168287] block p-1.5"
                    >
                      {item.colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-gray-600 mb-4 bg-gray-50 py-1 px-3 rounded-full w-fit border border-gray-200">
                    <span className="font-medium mr-1">Warna:</span> {item.selectedColor || "Bawaan"}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start sm:items-end space-y-4">
                <div className="text-xl font-semibold text-gray-900">
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 text-gray-600 rounded-l-lg transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 text-gray-600 rounded-r-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-8 rounded-2xl">
        <div className="mb-6 sm:mb-0">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Total</h2>
          <p className="text-gray-500">Sudah termasuk pajak.</p>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-3xl font-bold text-gray-900 mb-4">
            Rp {totalPrice.toLocaleString("id-ID")}
          </div>
          <Link href="/checkout" className="inline-block w-full sm:w-auto text-center bg-[#168287] text-white px-12 py-4 rounded-xl font-medium hover:bg-[#11686c] transition-colors">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
