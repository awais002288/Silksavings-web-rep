import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "wouter";
import { getProductById, products, BROAD_CATEGORY_KEYWORDS } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";
import { useCart } from "@/lib/cartContext";
import { generateProductJsonLd } from "@/lib/schema";
import halalCertification from "@/assets/certifications/halal-certification.webp";
import gmpCertification from "@/assets/certifications/gmp-certification.webp";
import certificateOfAnalysis from "@/assets/certifications/certificate-of-analysis.webp";
import materialTesting from "@/assets/certifications/material-testing.webp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const CERTIFICATIONS = [
  { key: "halal", label: "Halal Certification", image: halalCertification },
  { key: "gmp", label: "GMP Certification", image: gmpCertification },
  { key: "coa", label: "Certificate of Analysis", image: certificateOfAnalysis },
  { key: "material", label: "Material Testing", image: materialTesting },
] as const;

function CertificationsSection() {
  const [activeCert, setActiveCert] = useState<string | null>(null);
  const active = CERTIFICATIONS.find((c) => c.key === activeCert);

  return (
    <div className="mt-12 md:mt-16">
      <div className="text-center mb-8 md:mb-10">
        <div className="text-[#855f00] text-xs tracking-widest uppercase font-bold mb-2 font-sans">
          Verified Quality
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22]">Certifications</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
        {CERTIFICATIONS.map((cert) => (
          <button
            key={cert.key}
            type="button"
            onClick={() => setActiveCert(cert.key)}
            className="px-3 py-3 min-h-[44px] flex items-center justify-center rounded-xl border border-gray-200 bg-white text-[#1e3a22] hover:border-[#855f00] hover:text-[#855f00] hover:shadow-md transition-all text-xs md:text-sm font-semibold font-sans text-center cursor-pointer active:scale-95"
          >
            {cert.label}
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActiveCert(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[92vh] flex flex-col p-4 sm:p-6 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden">
          <DialogHeader className="mb-2 text-left pr-8">
            <DialogTitle className="text-lg md:text-xl font-bold text-[#1e3a22] font-sans">
              {active?.label}
            </DialogTitle>
            <DialogDescription className="text-xs text-[#855f00] font-semibold uppercase tracking-wider font-sans">
              Silk Savings® 100% Pure & Organic Quality Verification
            </DialogDescription>
          </DialogHeader>

          {active && (
            <div className="relative flex-1 overflow-auto rounded-xl bg-gray-50/80 p-2 sm:p-4 flex items-center justify-center border border-gray-100">
              <img
                src={active.image}
                alt={active.label}
                className="max-h-[66vh] w-auto object-contain rounded-lg shadow-sm"
              />
            </div>
          )}

          <div className="mt-2 flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-600 font-sans">
            <span>Silk Savings® Verified Document</span>
            {active && (
              <a
                href={active.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2c5530] font-semibold hover:text-[#1e3a22] hover:underline flex items-center gap-1"
              >
                Open Full Resolution ↗
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array(5).fill(0).map((_, i) => (
        <span key={i} className={i < rating ? "text-[#a87a00]" : "text-gray-300"}>★</span>
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

function ProductNotFound() {
  useSEO({
    title: "Product Not Found | Silk Savings®",
    description: "The requested organic product could not be found. Browse our full catalog of USDA Organic herbs, flowers, and seeds.",
    noindex: true,
  });

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#f9f7f2]">
      <div className="text-center max-w-md bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl">
        <div className="text-6xl mb-4">🌿</div>
        <div className="text-[#c9a227] text-xs uppercase tracking-widest font-semibold mb-2 font-sans">
          Item Unavailable
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a22] mb-3 font-display">
          Product Not Found
        </h1>
        <p className="text-gray-600 text-sm mb-8 font-sans leading-relaxed">
          The product you are looking for might have been moved or is no longer available in our collection.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="bg-[#2c5530] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1e3a22] transition-colors font-sans text-sm shadow-md"
          >
            Explore All Products
          </Link>
          <Link
            href="/"
            className="border-2 border-[#2c5530] text-[#2c5530] px-6 py-3 rounded-full font-bold hover:bg-[#f0f7f0] transition-colors font-sans text-sm"
          >
            Go to Home
          </Link>
        </div>
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

  // Pre-warm the backend as soon as the product page loads.
  // Render's free tier shuts down after inactivity; this ping wakes it up
  // early so the server is ready long before the user clicks Buy Now.
  useEffect(() => {
    fetch("/api/healthz").catch(() => {/* ignore — fire-and-forget */});
  }, []);

  if (!product) {
    return <ProductNotFound />;
  }

  const productFaqs = useMemo(
    () => [
      {
        question: `How should I store ${product.name} for maximum potency?`,
        answer: `Store ${product.name} in its original resealable, UV-protective pouch or an airtight container in a cool, dry pantry away from direct sunlight. Under optimal conditions, it retains maximum aroma, flavor, and botanical potency for up to 24 months.`,
      },
      {
        question: `What certifications and third-party lab tests verify this product?`,
        answer: `Silk Savings ${product.name} is USDA Certified Organic, Non-GMO Project verified, and Halal certified. Every harvest undergoes comprehensive third-party ISO-17025 accredited laboratory testing for heavy metals, microbial safety, and purity.`,
      },
      {
        question: `What is the recommended daily usage and preparation method?`,
        answer: `${product.usage} Always consult with a qualified healthcare professional before beginning any new herbal regimen if you are pregnant, nursing, taking medications, or have a pre-existing medical condition.`,
      },
      {
        question: `What are the delivery times and 30-day guarantee?`,
        answer: `Orders are packed in protective eco-friendly packaging and dispatched promptly with live tracking. Orders over $50 receive Free Worldwide Shipping. Every purchase is backed by our 30-Day Money-Back Guarantee.`,
      },
    ],
    [product]
  );

  const productSchema = useMemo(() => generateProductJsonLd(product, productFaqs), [product, productFaqs]);

  useSEO({
    title: `Buy ${product.name}${product.weight ? ` (${product.weight})` : ""} — USDA Organic | Silk Savings®`,
    description: `Buy ${product.name} — USDA Organic, Non-GMO, lab-tested & free from additives. ${product.benefits.slice(0, 2).join(". ")}. In stock with fast worldwide shipping.`.slice(0, 160),
    keywords: `${product.name}, buy ${product.name.toLowerCase()}, organic ${product.category.toLowerCase()}, ${BROAD_CATEGORY_KEYWORDS[product.category] || ""}, USDA organic botanicals, Silk Savings`,
    image: product.images[0] ? `https://www.silksavings.shop${product.images[0]}` : undefined,
    canonical: `https://www.silksavings.shop/products/${product.id}`,
    jsonLd: productSchema,
  });

  const sameCategory = products.filter((p) => p.id !== product.id && p.category === product.category);
  const otherProducts = products.filter((p) => p.id !== product.id && p.category !== product.category);
  const related = [...sameCategory, ...otherProducts].slice(0, 4);

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
          <nav className="text-xs md:text-sm text-gray-600 flex items-center gap-1.5 md:gap-2 font-sans flex-wrap">
            <Link href="/" className="hover:text-[#2c5530] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#2c5530] transition-colors">Products</Link>
            <span>/</span>
            <Link
              href={`/products?cat=${encodeURIComponent(product.category)}`}
              className="hover:text-[#2c5530] transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#1e3a22] font-semibold truncate max-w-40 md:max-w-none">{product.name}</span>
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
                    aria-label={`View image ${i + 1}`}
                    className={`w-14 h-14 md:w-20 md:h-20 min-w-[48px] min-h-[48px] rounded-xl border-2 transition-all bg-white flex items-center justify-center flex-shrink-0 cursor-pointer ${
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
            <div className="flex items-center gap-2 md:gap-3 mb-2 flex-wrap text-xs">
              <Link
                href={`/products?cat=${encodeURIComponent(product.category)}`}
                className="text-[#855f00] hover:text-[#1e3a22] transition-colors font-bold uppercase tracking-widest font-sans"
              >
                {product.category}
              </Link>
              {product.badge && (
                <span className="bg-[#c9a227] text-[#1e3a22] font-bold px-3 py-1 rounded-full font-sans">{product.badge}</span>
              )}
              <span className="text-gray-300 hidden sm:inline">•</span>
              <span className="text-gray-600 font-sans">
                Brand: <strong className="text-gray-800 font-semibold">{product.brand || "Silk Savings®"}</strong>
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600 font-sans">
                SKU: <span className="font-mono text-gray-700">{product.sku || product.id}</span>
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-[#1e3a22] mb-3 leading-tight font-serif">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <StarRating rating={avgRating} />
              <span className="text-gray-600 text-sm font-sans font-medium">({product.reviews?.length ?? 0} reviews)</span>
              {product.weight && (
                <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-sans font-medium">{product.weight}</span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-5 flex-wrap">
              <span className="text-4xl md:text-5xl font-black text-[#2c5530]">${product.price.toFixed(2)}</span>
              <span className="text-gray-500 text-sm line-through font-sans">${(product.price * 1.2).toFixed(2)}</span>
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full font-sans">Save 17%</span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-5 text-sm md:text-base font-sans">{product.longDescription}</p>

            {/* ── BUY NOW / ADD TO CART ── */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <button
                onClick={handleBuyNow}
                disabled={checkoutLoading}
                className="flex-1 min-h-[48px] bg-[#2c5530] text-white text-center py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-[#1e3a22] transition-all shadow-md font-sans disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
              >
                {checkoutLoading ? "Redirecting…" : "🛒 Buy Now — Secure Checkout"}
              </button>
              <button
                onClick={handleCart}
                className={`flex-1 min-h-[48px] border-2 border-[#2c5530] text-center py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base transition-all font-sans flex items-center justify-center cursor-pointer ${
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
              <div className="flex items-center justify-between gap-3 text-xs text-gray-500 font-sans border-t border-[#2c5530]/10 pt-3 mt-3 flex-wrap">
                <Link href="/returns" className="hover:text-[#2c5530] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-[#2c5530]">📦</span> 30-Day Hassle-Free Returns
                </Link>
                <Link href="/contact" className="hover:text-[#2c5530] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="text-[#2c5530]">💬</span> Questions? Contact Us
                </Link>
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
              <div className="text-[#855f00] text-xs tracking-widest uppercase font-bold mb-2 font-sans">Label Info</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22] font-serif">Nutrition Facts</h2>
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
                        <span className="text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ CERTIFICATIONS ═══ */}
        <CertificationsSection />

        {/* ═══ THE SILK SAVINGS DIFFERENCE (COMPARISON TABLE) ═══ */}
        <div className="mt-12 md:mt-16 bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-10 border border-gray-100 shadow-sm">
          <div className="text-center mb-6 md:mb-8">
            <span className="text-[#855f00] text-xs tracking-widest uppercase font-bold font-sans">Purity Comparison</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22] mt-1 font-serif">The Silk Savings® Difference</h2>
            <p className="text-gray-600 text-sm max-w-xl mx-auto font-sans mt-2">See how our USDA Organic whole botanicals compare to conventional mass-market brands.</p>
          </div>

          <p className="text-[11px] text-gray-500 md:hidden mb-2 text-center font-sans">← Swipe table horizontally to compare features →</p>
          <div className="overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: "touch" }}>
            <table className="w-full text-left text-sm font-sans border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3.5 px-4 font-semibold text-gray-700 w-1/3">Feature</th>
                  <th className="py-3.5 px-4 font-bold text-[#2c5530] bg-[#f0f7f0] rounded-t-xl w-1/3">Silk Savings® Standard</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-700 w-1/3">Conventional Store Brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-gray-900">Organic Certification</td>
                  <td className="py-3.5 px-4 text-[#2c5530] bg-[#f0f7f0] font-semibold">✓ 100% USDA Certified Organic</td>
                  <td className="py-3.5 px-4 text-gray-700">✗ Often conventional / unverified</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-gray-900">Botanical Quality &amp; Cut</td>
                  <td className="py-3.5 px-4 text-[#2c5530] bg-[#f0f7f0] font-semibold">✓ Whole select cuts &amp; pure whole forms</td>
                  <td className="py-3.5 px-4 text-gray-700">✗ Crushed dust, fannings &amp; high stems</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-gray-900">Additives &amp; Preservatives</td>
                  <td className="py-3.5 px-4 text-[#2c5530] bg-[#f0f7f0] font-semibold">✓ Zero sulfites, fillers, or additives</td>
                  <td className="py-3.5 px-4 text-gray-700">✗ Commonly irradiated or sulfur-treated</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-gray-900">Laboratory Verification</td>
                  <td className="py-3.5 px-4 text-[#2c5530] bg-[#f0f7f0] font-semibold">✓ ISO-17025 third-party batch COA</td>
                  <td className="py-3.5 px-4 text-gray-700">✗ Seldom tested for heavy metals</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-gray-900">Packaging Freshness</td>
                  <td className="py-3.5 px-4 text-[#2c5530] bg-[#f0f7f0] font-semibold rounded-b-xl">✓ Multi-barrier UV airtight pouch</td>
                  <td className="py-3.5 px-4 text-gray-700">✗ Clear plastic susceptible to UV decay</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ═══ PRODUCT FAQS ACCORDION ═══ */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#855f00] text-xs tracking-widest uppercase font-bold font-sans">Common Questions</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22] mt-1 font-serif">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-sm font-sans mt-2">Everything you need to know about {product.name}.</p>
          </div>

          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm">
            {productFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-b border-gray-100 last:border-b-0">
                <AccordionTrigger className="text-[#1e3a22] hover:text-[#2c5530] font-semibold text-left text-sm md:text-base py-4 font-sans cursor-pointer min-h-[48px]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-sm leading-relaxed font-sans pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* ═══ SHIPPING, PACKAGING & ASSURANCE ═══ */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#f0f7f0] flex items-center justify-center text-[#2c5530] text-2xl mb-3">
              📦
            </div>
            <h4 className="font-bold text-[#1e3a22] text-base mb-1 font-sans">Free Worldwide Shipping</h4>
            <p className="text-gray-600 text-xs leading-relaxed font-sans">Orders over $50 qualify for fast, tracked international dispatch directly to your doorstep.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#f0f7f0] flex items-center justify-center text-[#2c5530] text-2xl mb-3">
              🛡️
            </div>
            <h4 className="font-bold text-[#1e3a22] text-base mb-1 font-sans">30-Day Money-Back Guarantee</h4>
            <p className="text-gray-600 text-xs leading-relaxed font-sans">Try our botanicals with complete confidence. If you are not 100% satisfied, return for a prompt refund.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#f0f7f0] flex items-center justify-center text-[#2c5530] text-2xl mb-3">
              🌿
            </div>
            <h4 className="font-bold text-[#1e3a22] text-base mb-1 font-sans">Guaranteed Lab Purity</h4>
            <p className="text-gray-600 text-xs leading-relaxed font-sans">Certified USDA Organic, Non-GMO Project verified, and batch-tested for heavy metals and purity.</p>
          </div>
        </div>

        {/* ═══ GALLERY ═══ */}
        {product.images.length > 1 && (
          <div className="mt-12 md:mt-16">
            <div className="text-center mb-7 md:mb-8">
              <div className="text-[#855f00] text-xs tracking-widest uppercase font-bold mb-2 font-sans">Gallery</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22] font-serif">Product Images</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveImage(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  aria-label={`Select product image ${i + 1}`}
                  className={`bg-white rounded-xl md:rounded-2xl border-2 transition-all hover:shadow-lg overflow-hidden min-h-[48px] min-w-[48px] cursor-pointer ${activeImage === i ? "border-[#2c5530] shadow-md" : "border-gray-100 hover:border-[#2c5530]/40"}`}
                  style={{ aspectRatio: "1" }}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-contain p-3 md:p-4" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ CUSTOMER REVIEWS ═══ */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12 md:mt-16">
            <div className="text-center mb-8 md:mb-10">
              <div className="text-[#855f00] text-xs tracking-widest uppercase font-bold mb-2 font-sans">What Customers Say</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22] font-serif">Customer Reviews</h2>
              <div className="flex items-center justify-center gap-2 mt-3">
                <StarRating rating={avgRating} />
                <span className="text-gray-700 font-sans text-sm font-medium">{avgRating}.0 / 5 — {product.reviews.length} verified reviews</span>
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
                        <p className="text-gray-500 text-xs font-sans">{rev.location}</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs font-sans flex-shrink-0">{rev.date}</span>
                  </div>
                  <StarRating rating={rev.rating} />
                  <h4 className="font-bold text-[#1e3a22] text-sm">{rev.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed font-sans flex-1">"{rev.body}"</p>
                  <div className="flex items-center gap-1 pt-2 border-t border-gray-100">
                    <span className="text-green-700 text-xs font-semibold font-sans">✓ Verified Purchase</span>
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
              <div className="text-[#855f00] text-xs tracking-widest uppercase font-bold mb-2 font-sans">Recommended Organic Botanicals</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22] font-serif">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group border border-gray-100 flex flex-col h-full cursor-pointer">
                    <div className="bg-white flex items-center justify-center" style={{ height: "140px" }}>
                      <img src={p.images[0]} alt={p.name} loading="lazy" decoding="async" className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3 md:p-4 border-t border-gray-50 flex flex-col flex-1">
                      <p className="text-[#855f00] text-xs font-bold uppercase tracking-wide mb-1 font-sans">{p.category}</p>
                      <h3 className="font-bold text-[#1e3a22] text-xs md:text-sm mb-2 leading-snug flex-1">{p.name}</h3>
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
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
