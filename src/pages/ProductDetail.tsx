import { useState } from "react";
import { Link, useParams } from "wouter";
import { getProductById, products } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";
import { useCart } from "@/lib/cartContext";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array(5).fill(0).map((_, i) => (
        <span key={i} className={i < rating ? "text-[#c9a227]" : "text-gray-200"}>★</span>
      ))}
    </div>
  );
}

function NutritionLabel({ facts }: { facts: NonNullable<ReturnType<typeof getProductById>>["nutritionFacts"] }) {
  if (!facts) return null;
  const rows = [
    { label: "Total Fat", value: facts.totalFat, bold: true },
    { label: "Saturated Fat", value: facts.saturatedFat, indent: true },
    { label: "Trans Fat", value: facts.transFat, indent: true },
    { label: "Cholesterol", value: facts.cholesterol, bold: true },
    { label: "Sodium", value: facts.sodium, bold: true },
    { label: "Total Carbohydrate", value: facts.totalCarb, bold: true },
    { label: "Dietary Fiber", value: facts.dietaryFiber, indent: true },
    { label: "Total Sugars", value: facts.totalSugars, indent: true },
    { label: "Protein", value: facts.protein, bold: true },
  ];
  const vitamins = [
    facts.vitaminA && { label: "Vitamin A", value: facts.vitaminA },
    facts.vitaminC && { label: "Vitamin C", value: facts.vitaminC },
    facts.calcium && { label: "Calcium", value: facts.calcium },
    facts.iron && { label: "Iron", value: facts.iron },
    facts.magnesium && { label: "Magnesium", value: facts.magnesium },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="border-2 border-black font-sans w-full max-w-xs">
      <div className="bg-black text-white px-3 py-2">
        <h3 className="text-2xl font-black leading-none">Nutrition Facts</h3>
      </div>
      <div className="px-3 py-1 border-b-8 border-black">
        <p className="text-xs">Serving Size <span className="font-bold">{facts.servingSize}</span></p>
      </div>
      <div className="px-3 pt-1 pb-1">
        <p className="text-xs font-bold">Amount Per Serving</p>
        <div className="flex justify-between items-baseline border-b-4 border-black pb-1 mb-1">
          <span className="text-2xl font-black">Calories</span>
          <span className="text-4xl font-black">{facts.calories}</span>
        </div>
        <p className="text-xs text-right font-bold border-b border-black pb-0.5 mb-0.5">% Daily Value*</p>
      </div>
      {rows.map((row) => (
        <div key={row.label} className={`flex justify-between px-3 py-0.5 border-b border-gray-300 ${row.indent ? "pl-6" : ""}`}>
          <span className={`text-xs ${row.bold ? "font-bold" : ""}`}>{row.label} <span className="font-normal">{row.value}</span></span>
          <span className="text-xs font-bold">—</span>
        </div>
      ))}
      {vitamins.length > 0 && (
        <div className="px-3 py-1 border-t-4 border-black">
          <div className="flex flex-wrap gap-x-3">
            {vitamins.map((v) => <span key={v.label} className="text-xs">{v.label} <strong>{v.value}</strong></span>)}
          </div>
        </div>
      )}
      <div className="px-3 py-1 border-t border-black">
        <p className="text-[10px] text-gray-600 leading-tight">* The % Daily Value tells you how much a nutrient in a serving contributes to a daily diet.</p>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id);
  const [activeImage, setActiveImage] = useState(0);
  const [cartMsg, setCartMsg] = useState("");
  const { addToCart } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 px-4">
        <div className="text-center">
          <div className="text-6xl mb-6">🌿</div>
          <h2 className="text-2xl font-bold text-[#1e3a22] mb-4">Product not found</h2>
          <Link href="/products" className="bg-[#2c5530] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1e3a22] transition-colors font-sans">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  useSEO({
    title: `${product.name} | USDA Organic — Silk Savings®`,
    description: `Buy ${product.name} — USDA Organic, Non-GMO, lab-tested & free from additives. ${product.shortDescription ?? product.description.slice(0, 80)}`.slice(0, 160),
    keywords: `${product.name}, organic herbs, USDA organic, Non-GMO, ${product.category}, organic botanicals, Silk Savings`,
    image: product.images[0] ? `https://www.silksavings.shop${product.images[0]}` : undefined,
    canonical: `https://www.silksavings.shop/products/${product.id}`,
  });

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const handleCart = () => {
    addToCart(product);
    setCartMsg("Added!");
    setTimeout(() => setCartMsg(""), 2000);
  };

  const handleBuyNow = async () => {
    setCheckoutLoading(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productHandle: product.id,
          productName: product.name,
          productPrice: product.price,
          productImage: product.images[0]
            ? `${window.location.origin}${product.images[0]}`
            : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err: any) {
      setCheckoutError(err.message || "Could not start checkout. Please try again.");
      setCheckoutLoading(false);
    }
  };
  const avgRating = product.reviews
    ? Math.round(product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length)
    : 5;

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 pt-16 md:pt-20 pb-3 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs md:text-sm text-gray-400 flex items-center gap-1.5 md:gap-2 font-sans flex-wrap">
            <Link href="/" className="hover:text-[#2c5530]">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#2c5530]">Products</Link>
            <span>/</span>
            <span className="text-[#1e3a22] font-medium truncate max-w-40 md:max-w-none">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* ═══ MAIN PRODUCT SECTION ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 xl:gap-20">

          {/* LEFT: Image Gallery */}
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden" style={{ minHeight: "300px" }}>
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full object-contain p-4 md:p-6"
                style={{ maxHeight: "400px" }}
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 md:gap-3 flex-wrap">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-14 h-14 md:w-20 md:h-20 rounded-xl border-2 transition-all bg-white flex items-center justify-center flex-shrink-0 ${
                      activeImage === i ? "border-[#2c5530] shadow-md ring-2 ring-[#2c5530]/20" : "border-gray-200 hover:border-[#2c5530]/50"
                    }`}
                  >
                    <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
            {/* Cert badges */}
            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 px-4 py-3 flex flex-wrap gap-4 justify-center">
              {[
                {
                  label: "USDA Organic",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                  ),
                },
                {
                  label: "Non GMO",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
                      <path d="M12 2a9 9 0 0 1 0 18"/>
                      <path d="M12 2a9 9 0 0 0 0 18"/>
                      <path d="M12 2v18"/>
                      <path d="M4.93 7h14.14"/>
                      <path d="M3 12h18"/>
                      <path d="M4.93 17h14.14"/>
                    </svg>
                  ),
                },
                {
                  label: "No Additives",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
                      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  ),
                },
                {
                  label: "100% Vegan",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7">
                      <path d="M17 8C8 10 5.9 16.17 3.82 22"/>
                      <path d="M3.82 22C10 22 16.83 17 17 8"/>
                      <path d="M17 8c0-4-3-6-3-6s3 2 3 6z"/>
                    </svg>
                  ),
                },
              ].map((cert) => (
                <div key={cert.label} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#e8f5e8] border-2 border-[#2c5530] flex items-center justify-center text-[#2c5530]">
                    {cert.icon}
                  </div>
                  <span className="text-[#2c5530] text-[9px] md:text-[10px] font-bold text-center leading-tight font-sans max-w-[52px]">{cert.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="text-[#c9a227] text-xs font-bold uppercase tracking-widest font-sans">{product.category}</span>
              {product.badge && (
                <span className="bg-[#c9a227] text-[#1e3a22] text-xs font-bold px-3 py-1 rounded-full font-sans">{product.badge}</span>
              )}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-[#1e3a22] mb-3 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <StarRating rating={avgRating} />
              <span className="text-gray-400 text-sm font-sans">({product.reviews?.length ?? 0} reviews)</span>
              {product.weight && (
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-sans font-medium">{product.weight}</span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-5 flex-wrap">
              <span className="text-4xl md:text-5xl font-black text-[#2c5530]">${product.price.toFixed(2)}</span>
              <span className="text-gray-400 text-sm line-through font-sans">${(product.price * 1.2).toFixed(2)}</span>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full font-sans">Save 17%</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-5 text-sm md:text-base font-sans">{product.longDescription}</p>

            {/* ── BUY NOW / ADD TO CART ── */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <button
                onClick={handleBuyNow}
                disabled={checkoutLoading}
                className="flex-1 bg-[#2c5530] text-white text-center py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-[#1e3a22] transition-all shadow-md font-sans disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? "Redirecting…" : "🛒 Buy Now — Secure Checkout"}
              </button>
              <button
                onClick={handleCart}
                className={`flex-1 border-2 border-[#2c5530] text-center py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base transition-all font-sans ${
                  cartMsg
                    ? "bg-[#2c5530] text-white border-[#2c5530]"
                    : "text-[#2c5530] hover:bg-[#f0f7f0]"
                }`}
              >
                {cartMsg ? "✓ Added to Cart!" : "+ Add to Cart"}
              </button>
            </div>
            {checkoutError && (
              <p className="text-red-500 text-sm font-sans mb-3">{checkoutError}</p>
            )}

            {/* ── KEY BENEFITS ── */}
            <div className="bg-[#f0f7f0] rounded-xl md:rounded-2xl p-4 md:p-5 mb-4">
              <h3 className="font-bold text-[#1e3a22] mb-3 flex items-center gap-2 text-sm md:text-base">
                <span className="w-5 h-5 bg-[#2c5530] rounded-full flex items-center justify-center text-white text-xs">✓</span>
                Key Benefits
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {product.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-white border border-[#2c5530] flex items-center justify-center text-[#2c5530] text-xs flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm font-sans leading-snug">{b}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ═══ HOW TO PREPARE ═══ */}
        {product.prepSteps && (
          <div className="mt-12 md:mt-16">
            <div className="text-center mb-8 md:mb-10">
              <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-2 font-sans">Step by Step</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22]">How to Prepare</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
              {product.prepSteps.map((step, i) => (
                <div key={step.label} className="relative flex flex-col items-center text-center bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 hover:shadow-md transition-shadow">
                  <div className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-[#2c5530] text-white rounded-full flex items-center justify-center text-xs font-bold font-sans shadow">
                    {i + 1}
                  </div>
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">{step.icon}</div>
                  <h4 className="font-bold text-[#1e3a22] text-xs md:text-sm mb-1">{step.label}</h4>
                  <p className="text-gray-500 text-xs leading-snug font-sans">{step.detail}</p>
                  {i < (product.prepSteps?.length ?? 0) - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-[#c9a227] text-lg font-bold z-10">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ NUTRITION FACTS ═══ */}
        {product.nutritionFacts && (
          <div className="mt-12 md:mt-16">
            <div className="text-center mb-8 md:mb-10">
              <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-2 font-sans">Label Info</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22]">Nutrition Facts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
              <NutritionLabel facts={product.nutritionFacts} />
              <div>
                <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-4 md:p-5">
                  <h4 className="font-bold text-[#1e3a22] mb-3 font-sans text-sm">Package Info</h4>
                  <div className="space-y-2">
                    {[
                      ["Brand", "Silk Savings®"],
                      ["Net Weight", product.weight || "—"],
                      ["Certifications", "USDA Organic, Non-GMO"],
                      ["Storage", "Cool, dry place away from sunlight"],
                      ["Shelf Life", "24 months from production date"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex gap-3 text-sm font-sans">
                        <span className="font-semibold text-[#1e3a22] w-24 md:w-28 flex-shrink-0">{label}</span>
                        <span className="text-gray-500">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ GALLERY ═══ */}
        {product.images.length > 1 && (
          <div className="mt-12 md:mt-16">
            <div className="text-center mb-7 md:mb-8">
              <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-2 font-sans">Gallery</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22]">Product Images</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveImage(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`bg-white rounded-xl md:rounded-2xl border-2 transition-all hover:shadow-lg overflow-hidden ${activeImage === i ? "border-[#2c5530] shadow-md" : "border-gray-100 hover:border-[#2c5530]/40"}`}
                  style={{ aspectRatio: "1" }}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain p-3 md:p-4" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ CUSTOMER REVIEWS ═══ */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12 md:mt-16">
            <div className="text-center mb-8 md:mb-10">
              <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-2 font-sans">What Customers Say</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22]">Customer Reviews</h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <StarRating rating={avgRating} />
                <span className="text-gray-600 font-sans text-sm">{avgRating}.0 / 5 — {product.reviews.length} verified reviews</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {product.reviews.map((rev, i) => (
                <div key={i} className="bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#2c5530] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{rev.avatar}</div>
                      <div>
                        <p className="font-bold text-[#1e3a22] text-sm">{rev.name}</p>
                        <p className="text-gray-400 text-xs font-sans">{rev.location}</p>
                      </div>
                    </div>
                    <span className="text-gray-400 text-xs font-sans flex-shrink-0">{rev.date}</span>
                  </div>
                  <StarRating rating={rev.rating} />
                  <h4 className="font-bold text-[#1e3a22] text-sm">{rev.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed font-sans flex-1">"{rev.body}"</p>
                  <div className="flex items-center gap-1 pt-2 border-t border-gray-50">
                    <span className="text-green-600 text-xs font-semibold font-sans">✓ Verified Purchase</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ RELATED PRODUCTS ═══ */}
        {related.length > 0 && (
          <div className="mt-12 md:mt-16">
            <div className="text-center mb-8 md:mb-10">
              <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-2 font-sans">More From This Category</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22]">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group border border-gray-100 flex flex-col h-full">
                    <div className="bg-white flex items-center justify-center" style={{ height: "140px" }}>
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3 md:p-4 border-t border-gray-50 flex flex-col flex-1">
                      <p className="text-[#c9a227] text-xs font-semibold uppercase tracking-wide mb-1 font-sans">{p.category}</p>
                      <h3 className="font-bold text-[#1e3a22] text-xs md:text-sm mb-2 leading-snug flex-1">{p.name}</h3>
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                        <span className="text-[#2c5530] font-bold font-sans text-sm">${p.price.toFixed(2)}</span>
                        <span className="text-xs text-[#2c5530] font-semibold font-sans">View →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
