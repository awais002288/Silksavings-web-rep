import { Link, useSearch, useLocation } from "wouter";
import { products, categories } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";

export default function Products() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const activeCategory = params.get("cat") || "All";

  const allCategories = ["All", ...categories];
  const isValidCategory = activeCategory === "All" || categories.includes(activeCategory);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const shouldNoIndex = !isValidCategory || filtered.length === 0;

  useSEO({
    title:
      activeCategory !== "All" && isValidCategory
        ? `${activeCategory} | Organic Botanicals | Silk Savings®`
        : "Organic Herbs, Dried Flowers & Seeds | Silk Savings® — USDA Certified",
    description:
      activeCategory !== "All" && isValidCategory
        ? `Shop USDA Organic ${activeCategory.toLowerCase()} from Silk Savings. 100% pure, lab-tested, non-GMO with zero additives.`
        : "Shop USDA Organic herbs, dried flowers, apricot seeds, shilajit & more. Non-GMO, lab-tested, free from additives. Browse all organic botanicals.",
    keywords:
      "organic herbs, dried flowers, USDA organic, apricot seeds, shilajit resin, calendula flowers, yarrow herb, rose petals, Non-GMO botanicals",
    canonical: "https://www.silksavings.shop/products",
    noindex: shouldNoIndex,
  });

  const handleCategoryChange = (cat: string) => {
    if (cat === "All") {
      navigate("/products");
    } else {
      navigate(`/products?cat=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="hero-gradient pt-28 pb-16 px-4 text-center">
        <div className="text-[#c9a227] text-sm tracking-widest uppercase font-semibold mb-2 font-sans">Our Collection</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">All Products</h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto font-sans">
          Premium organic herbs, flowers, and seeds — 100% pure and free from additives.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all font-sans cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#2c5530] text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#2c5530] hover:text-[#2c5530]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl p-8 border border-gray-100 max-w-md mx-auto shadow-sm">
            <div className="text-4xl mb-3">🍃</div>
            <h3 className="text-xl font-bold text-[#1e3a22] mb-2 font-serif">No products found</h3>
            <p className="text-gray-500 text-sm mb-6 font-sans">
              We couldn't find any products in "{activeCategory}".
            </p>
            <button
              onClick={() => handleCategoryChange("All")}
              className="bg-[#2c5530] text-white text-sm px-6 py-2.5 rounded-full hover:bg-[#1e3a22] transition-colors font-sans font-semibold cursor-pointer"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer border border-gray-100 h-full flex flex-col">
                  {/* Image container — white bg + object-contain so nothing is cropped */}
                  <div className="relative flex-shrink-0 bg-white" style={{ height: "260px" }}>
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-10 bg-[#c9a227] text-[#1e3a22] text-xs font-bold px-3 py-1 rounded-full font-sans">
                        {product.badge}
                      </div>
                    )}
                    {product.weight && (
                      <div className="absolute top-4 right-4 z-10 bg-[#1e3a22] text-white text-xs font-bold px-3 py-1 rounded-full font-sans">
                        {product.weight}
                      </div>
                    )}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 border-t border-gray-50">
                    <div className="text-[#c9a227] text-xs font-semibold uppercase tracking-wide mb-1 font-sans">{product.category}</div>
                    <h3 className="font-bold text-[#1e3a22] text-lg mb-2 leading-snug">{product.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 font-sans">{product.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.benefits.slice(0, 2).map((b) => (
                        <span key={b} className="text-xs bg-[#e8f5e8] text-[#2c5530] px-2.5 py-1 rounded-full font-medium font-sans">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-bold text-[#2c5530]">${product.price.toFixed(2)}</span>
                        {product.weight && (
                          <span className="text-gray-400 text-xs ml-1 font-sans">/ {product.weight}</span>
                        )}
                      </div>
                      <span className="bg-[#2c5530] text-white text-sm px-5 py-2 rounded-full hover:bg-[#1e3a22] transition-colors font-sans font-semibold">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
