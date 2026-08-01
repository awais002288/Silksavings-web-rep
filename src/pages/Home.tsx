import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { products, getProductById, allReviews } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";

const trustBadges = [
  { icon: "🌿", label: "100% Organic" },
  { icon: "🚫", label: "Non-GMO" },
  { icon: "🧪", label: "No Preservatives" },
  { icon: "✅", label: "USDA Certified" },
  { icon: "📦", label: "Premium Quality" },
];

const shopCategories = [
  {
    name: "Dried Flowers",
    desc: "Calendula, Rose Petals & more",
    href: "/products?cat=Flowers",
    image: getProductById("dried-calendula-flowers")!.images[0],
    accent: "#c9a227",
    bg: "#fdf8ee",
  },
  {
    name: "Seeds & Kernels",
    desc: "Apricot Seeds, Sea Buckthorn & more",
    href: "/products?cat=Seeds+%26+Kernels",
    image: getProductById("bitter-apricot-seeds-1lb")!.images[0],
    accent: "#2c5530",
    bg: "#f0f7f0",
  },
  {
    name: "Herbs & Leaves",
    desc: "Yarrow, Lemon Grass, Rue & more",
    href: "/products?cat=Herbs+%26+Leaves",
    image: getProductById("dried-lemon-grass")!.images[0],
    accent: "#1e3a22",
    bg: "#e8f5e8",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array(5).fill(0).map((_, i) => (
        <span key={i} className={i < rating ? "text-[#c9a227]" : "text-gray-300"}>★</span>
      ))}
    </div>
  );
}

function FeaturedSlider() {
  const featured = products.filter((p) => p.badge).slice(0, 6);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => setCurrent(idx);
  const next = () => setCurrent((c) => (c + 1) % featured.length);
  const prev = () => setCurrent((c) => (c - 1 + featured.length) % featured.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4500);
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-2 font-sans">Bestsellers</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a22]">Featured Products</h2>
          <p className="text-gray-500 font-sans mt-2 text-sm md:text-base">Premium organic botanicals — loved by thousands</p>
        </div>

        {/* Slider wrapper — overflow-hidden clips the rail */}
        <div className="relative" style={{ overflow: "hidden" }}>
          {/* Rail — all slides sit side by side here */}
          <div
            className="flex"
            style={{
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              transform: `translateX(-${current * 100}%)`,
              willChange: "transform",
            }}
          >
            {featured.map((product) => (
              /* Each slide is EXACTLY 100% wide — image + info live inside together */
              <div
                key={product.id}
                style={{ minWidth: "100%", maxWidth: "100%", boxSizing: "border-box" }}
                className="flex-shrink-0"
              >
                <div
                  className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-[#f8f7f4]"
                  style={{ display: "grid", gridTemplateColumns: "1fr", minHeight: "320px" }}
                >
                  {/* On desktop: side-by-side. On mobile: stacked */}
                  <div style={{ display: "contents" }}>
                    {/* Mobile layout */}
                    <div className="md:hidden flex flex-col">
                      <div className="bg-white flex items-center justify-center" style={{ height: "220px" }}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          style={{ maxHeight: "200px", width: "auto", maxWidth: "85%", objectFit: "contain" }}
                        />
                      </div>
                      <div className="flex flex-col justify-center px-6 py-6 bg-[#f8f7f4]">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {product.badge && (
                            <span className="bg-[#c9a227] text-[#1e3a22] text-xs font-bold px-2.5 py-0.5 rounded-full font-sans">{product.badge}</span>
                          )}
                          <span className="text-[#c9a227] text-xs font-bold uppercase tracking-widest font-sans">{product.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#1e3a22] mb-2 leading-tight">{product.name}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 font-sans line-clamp-2">{product.description}</p>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-2xl font-black text-[#2c5530]">${product.price.toFixed(2)}</span>
                          <Link href={`/products/${product.id}`} className="bg-[#2c5530] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#1e3a22] transition-all font-sans">
                            View Product →
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Desktop layout — true side-by-side */}
                    <div className="hidden md:flex" style={{ minHeight: "380px" }}>
                      {/* Image panel — fixed width */}
                      <div
                        className="bg-white flex items-center justify-center flex-shrink-0"
                        style={{ width: "420px", padding: "32px" }}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          style={{ maxHeight: "300px", maxWidth: "340px", width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </div>
                      {/* Info panel — fills remaining space */}
                      <div className="flex flex-col justify-center px-10 py-10 flex-1 bg-[#f8f7f4]">
                        <div className="flex items-center gap-3 mb-3">
                          {product.badge && (
                            <span className="bg-[#c9a227] text-[#1e3a22] text-xs font-bold px-3 py-1 rounded-full font-sans">{product.badge}</span>
                          )}
                          <span className="text-[#c9a227] text-xs font-bold uppercase tracking-widest font-sans">{product.category}</span>
                        </div>
                        <h3 className="text-3xl font-bold text-[#1e3a22] mb-3 leading-tight">{product.name}</h3>
                        <p className="text-gray-500 text-base leading-relaxed mb-5 font-sans">{product.description}</p>
                        <div className="flex items-center gap-2 mb-6">
                          <span className="text-[#c9a227] text-xl">★★★★★</span>
                          <span className="text-gray-400 text-sm font-sans">Verified Organic · 100% Pure</span>
                        </div>
                        <div className="flex items-center gap-5">
                          <span className="text-4xl font-black text-[#2c5530]">${product.price.toFixed(2)}</span>
                          <Link
                            href={`/products/${product.id}`}
                            className="bg-[#2c5530] text-white px-7 py-3.5 rounded-full font-bold text-base hover:bg-[#1e3a22] transition-all shadow-md font-sans"
                          >
                            View Product →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => { prev(); resetTimer(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#2c5530] hover:bg-[#f0f7f0] transition-all z-10 font-bold text-2xl"
          >‹</button>
          <button
            onClick={() => { next(); resetTimer(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-[#2c5530] hover:bg-[#f0f7f0] transition-all z-10 font-bold text-2xl"
          >›</button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); resetTimer(); }}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-7 h-2 bg-[#2c5530]" : "w-2 h-2 bg-gray-300 hover:bg-[#2c5530]/40"}`}
            />
          ))}
        </div>

        {/* Thumbnails — hidden on small screens */}
        <div className="mt-6 hidden sm:flex gap-3 justify-center flex-wrap">
          {featured.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { goTo(i); resetTimer(); }}
              className={`w-14 h-14 rounded-xl border-2 bg-white flex items-center justify-center transition-all flex-shrink-0 ${
                i === current ? "border-[#2c5530] shadow-md" : "border-gray-200 hover:border-[#2c5530]/40 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block bg-[#1e3a22] text-white px-8 md:px-10 py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#2c5530] transition-colors shadow-lg font-sans"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useSEO({
    title: "Silk Savings® | Organic Herbs, Dried Flowers & Seeds — USDA Certified",
    description: "Shop USDA Organic herbs, dried flowers & seeds. Non-GMO, lab-tested, free from additives. Premium organic botanicals shipped worldwide.",
    keywords: "organic herbs, USDA organic, dried flowers, organic seeds, Non-GMO, organic botanicals, shilajit resin, apricot seeds, calendula flowers",
    canonical: "https://www.silksavings.shop/",
  });
  return (
    <div>
      {/* Hero */}
      <section className="relative flex items-center justify-center overflow-hidden pt-24 pb-12 md:pt-0 md:pb-0 md:min-h-screen">
        <div className="absolute inset-0 hero-gradient" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a227' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
          <div className="inline-block border border-[#c9a227]/40 text-[#c9a227] text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 md:mb-6 font-sans">
            Silk Savings® — 100% Pure & Organic
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-5 md:mb-6 leading-tight">
            Nature's Finest,
            <br />
            <span className="gold-text">Delivered to You</span>
          </h1>
          <p className="text-white/70 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-sans">
            Premium organic herbs, flowers, and seeds — ethically sourced, carefully dried, and tested for purity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link
              href="/products"
              className="bg-[#c9a227] text-[#1e3a22] px-7 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#e0b730] transition-all hover:-translate-y-1 shadow-lg font-sans"
            >
              Explore Products
            </Link>
            <Link
              href="/about"
              className="border border-white/30 text-white px-7 py-3.5 md:py-4 rounded-full font-semibold text-base md:text-lg hover:border-white/60 hover:bg-white/5 transition-all font-sans"
            >
              Our Story
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[hsl(42_30%_97%)] to-transparent" />
      </section>

      {/* Trust badges */}
      <section className="bg-[hsl(42_30%_97%)] py-5 overflow-x-auto">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-start sm:justify-center gap-5 md:gap-10 min-w-max sm:min-w-0">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xl">{b.icon}</span>
                <span className="text-xs md:text-sm font-semibold text-[#2c5530] font-sans whitespace-nowrap">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-3 font-sans">Our Story</div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1e3a22] mb-5 md:mb-6 leading-tight">
                Rooted in Nature,
                <br />Built on Trust
              </h2>
              <div className="section-divider mb-6 md:mb-8" />
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-5 font-sans">
                Silk Savings was born from a simple belief: that the earth provides everything we need to thrive. Founded by leadscollaborate LLC and based in Sheridan, Wyoming, we set out to make premium organic botanicals accessible to everyone.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 md:mb-8 font-sans text-sm md:text-base">
                Every product is carefully selected from trusted organic farms, gently processed to preserve peak potency, and tested for purity. No fillers, no shortcuts, no compromises.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#2c5530] font-bold border-b-2 border-[#c9a227] pb-1 hover:text-[#c9a227] transition-colors font-sans"
              >
                Read Our Full Story →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-3 md:space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md bg-white h-36 md:h-48">
                  <img src={getProductById("dried-calendula-flowers")!.images[1] ?? getProductById("dried-calendula-flowers")!.images[0]} alt="Calendula benefits" className="w-full h-full object-contain p-2" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md bg-white h-48 md:h-64">
                  <img src={getProductById("dried-rose-petals")!.images[1] ?? getProductById("dried-rose-petals")!.images[0]} alt="Rose petal tea" className="w-full h-full object-contain p-2" />
                </div>
              </div>
              <div className="space-y-3 md:space-y-4 pt-6 md:pt-8">
                <div className="rounded-2xl overflow-hidden shadow-md bg-white h-48 md:h-64">
                  <img src={getProductById("bitter-apricot-seeds-8oz")!.images[0]} alt="Apricot seeds" className="w-full h-full object-contain p-2" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md bg-white h-36 md:h-48">
                  <img src={getProductById("dried-lemon-grass")!.images[0]} alt="Lemon grass" className="w-full h-full object-contain p-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category — redesigned with contained images */}
      <section className="py-16 md:py-20 px-4 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-2 font-sans">Our Collection</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a22]">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {shopCategories.map((cat) => (
              <Link key={cat.name} href={cat.href}>
                <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer">
                  {/* Image fills the space nicely — small padding so image is prominent */}
                  <div
                    className="flex items-center justify-center overflow-hidden"
                    style={{ height: "260px", background: cat.bg }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="group-hover:scale-105 transition-transform duration-500"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                        padding: "12px",
                      }}
                    />
                  </div>
                  {/* Text section */}
                  <div className="px-5 py-4 bg-[#1e3a22]">
                    <h3 className="text-white font-bold text-lg mb-0.5">{cat.name}</h3>
                    <p className="text-white/55 text-sm mb-3 font-sans">{cat.desc}</p>
                    <span className="text-[#c9a227] text-sm font-semibold font-sans inline-flex items-center gap-2">
                      Shop Now <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Slider */}
      <FeaturedSlider />

      {/* Why Silk Savings */}
      <section className="py-16 md:py-20 px-4 bg-[#1e3a22] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-2 font-sans">Why Us</div>
            <h2 className="text-3xl md:text-4xl font-bold">The Silk Savings Difference</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: "🌱", title: "Ethically Sourced", desc: "Sourced from certified organic farms with sustainable practices." },
              { icon: "🔬", title: "Purity Tested", desc: "Free from pesticides, additives, and fillers." },
              { icon: "📦", title: "Fresh & Potent", desc: "Harvested at peak potency and sealed for freshness." },
              { icon: "🤝", title: "100% Transparent", desc: "Clear labeling. What you see is what you get." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl md:text-5xl mb-3 md:mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#c9a227] text-base md:text-lg mb-2 md:mb-3">{item.title}</h3>
                <p className="text-white/60 text-xs md:text-sm leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 md:py-20 px-4 bg-[hsl(42_30%_97%)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-2 font-sans">Happy Customers</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a22]">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {allReviews.map((rev, i) => (
              <Link key={i} href={`/products/${rev.productId}`}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#2c5530] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {rev.avatar}
                      </div>
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
                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-green-600 text-xs font-semibold font-sans">✓ Verified Purchase</span>
                    <span className="text-[#c9a227] text-xs font-sans truncate max-w-28">{rev.productName.split(" ").slice(0, 3).join(" ")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 bg-[#f5f0e8]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a22] mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-7 font-sans">
            Browse our full collection of premium organic botanicals.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#c9a227] text-[#1e3a22] px-8 md:px-10 py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#e0b730] transition-all hover:-translate-y-1 shadow-lg font-sans"
          >
            Shop All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
