import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = (resolvedParams.q || "").toLowerCase();

  const searchResults = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full min-h-[70vh]">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
          Hasil Pencarian
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          {query ? `Menampilkan hasil untuk "${resolvedParams.q}"` : "Silakan masukkan kata kunci pencarian."}
        </p>
      </div>

      {query && searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-20 bg-[#fbfbfd] rounded-2xl">
          <p className="text-xl text-gray-500">Tidak ada produk yang cocok dengan pencarian Anda.</p>
        </div>
      ) : null}
    </div>
  );
}
