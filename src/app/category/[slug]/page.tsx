import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug.toLowerCase();

  let displayProducts = products;
  let title = "Semua Produk";
  let description = "Temukan berbagai gadget terbaik pilihan Anda di Mutiara Cell.";

  if (slug !== "all") {
    displayProducts = products.filter((p) => p.category.toLowerCase() === slug);
    // Format the title, e.g., "smartphone" -> "Smartphone"
    title = slug.charAt(0).toUpperCase() + slug.slice(1);
    description = `Temukan ${title} dengan teknologi terbaru dan harga terbaik.`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full min-h-[70vh]">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#fbfbfd] rounded-2xl">
          <p className="text-xl text-gray-500">Belum ada produk di kategori ini.</p>
        </div>
      )}
    </div>
  );
}
