import { useMemo } from "react";
import { Link, useSearch, useLocation } from "wouter";
import { products, categories } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";
import { generateCategoryJsonLd } from "@/lib/schema";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const CATEGORY_SEO_DATA: Record<
  string,
  {
    title: string;
    description: string;
    keywords: string;
    heading: string;
    subheading: string;
    guideTitle: string;
    guideText: string;
    faqs: Array<{ question: string; answer: string }>;
  }
> = {
  All: {
    title: "Shop All Organic Botanicals, Dried Flowers & Seeds | Silk Savings®",
    description: "Explore the complete Silk Savings® catalog of USDA Organic loose dried flowers, nutritious seeds, medicinal herbs, and pure mountain shilajit resin. 100% lab-tested purity.",
    keywords: "organic botanicals catalog, buy dried herbs online, organic seeds collection, dried edible flowers, herbal infusions shop, certified organic apothecary, bulk dried herbs, natural herbal teas",
    heading: "Organic Herbs, Dried Flowers & Seeds",
    subheading: "Explore premium USDA Organic botanicals, sun-dried flowers, and nutrient-dense seeds — 100% pure and additive-free.",
    guideTitle: "The Silk Savings® Botanical Quality Standard",
    guideText: "Every botanical in our collection is sustainably cultivated or wildcrafted at peak potency, gently dried at low temperatures to preserve essential phytonutrients, and rigorously tested for purity. Whether you are brewing restorative herbal infusions, handcrafting skincare salves, or supplementing daily wellness with raw superfoods, our USDA Organic verification guarantees zero pesticides, radiation, or artificial additives.",
    faqs: [
      {
        question: "How are Silk Savings® botanicals sourced and certified?",
        answer: "All Silk Savings® botanicals are sourced from certified organic family farms and pristine mountain regions. Every harvest holds USDA Organic, Non-GMO Project, and Halal certifications, and undergoes third-party ISO-17025 accredited laboratory testing.",
      },
      {
        question: "How should I store loose dried herbs and seeds?",
        answer: "Store your botanicals in their original resealable, UV-protective pouches in a cool, dry pantry away from direct sunlight and moisture. Under these conditions, our dried herbs retain full potency for up to 24 months.",
      },
      {
        question: "Can these botanicals be used for culinary and cosmetic purposes?",
        answer: "Yes! Our dried flowers, seeds, and herbs are 100% food-grade. They are extensively used for brewing artisanal herbal teas, infusing facial serums and bath soaks, and flavoring gourmet culinary recipes.",
      },
      {
        question: "What is your shipping policy and satisfaction guarantee?",
        answer: "Orders over $50 qualify for Free Worldwide Shipping with full online tracking. We back every order with our 30-Day Money-Back Guarantee — if you are not delighted with your botanicals, contact us for an easy refund or exchange.",
      },
    ],
  },
  Flowers: {
    title: "USDA Organic Dried Flowers | Pure Whole Blooms | Silk Savings®",
    description: "Shop pure organic dried calendula blooms and rose petals. Sun-dried, food-grade, lab-tested for soothing floral teas, DIY skincare, and aromatherapy.",
    keywords: "organic dried flowers, calendula blooms, dried rose petals, whole flower tea, botanical skincare flowers, edible dried flowers, natural herbal teas, dried flowers for crafts",
    heading: "Organic Dried Flowers Collection",
    subheading: "Hand-harvested whole calendula blooms and aromatic rose petals packed with antioxidants and floral serenity.",
    guideTitle: "Botanical Guide: Organic Calendula & Rose Petals",
    guideText: "Our dried flower collection features sun-kissed whole Calendula (marigold) blossoms and delicately dried aromatic Rose Petals. Harvested by hand to keep petals intact, they are rich in natural antioxidants, flavonoids, and vitamin C. Ideal for calming herbal teas, infused body oils, soothing facial steams, and culinary garnishes.",
    faqs: [
      {
        question: "Are your dried flowers edible and food-grade?",
        answer: "Yes, our organic Calendula and Rose Petals are 100% food-grade, USDA Certified Organic, and free from any chemical pesticides or artificial preservatives.",
      },
      {
        question: "How do I brew floral tea with dried flowers?",
        answer: "Use 1 to 2 teaspoons of dried flowers per 8 oz cup of water heated to 195°F. Cover and steep for 5 to 7 minutes. You can enjoy them standalone or blended with green tea and raw honey.",
      },
      {
        question: "Can I use these flowers for DIY skincare and salves?",
        answer: "Absolutely. Calendula and rose petals are traditional favorites for infusing carrier oils (such as jojoba or sweet almond oil) to create healing balms, salves, and bath salts.",
      },
    ],
  },
  "Seeds & Kernels": {
    title: "Organic Apricot Seeds, Sea Buckthorn & Shilajit | Silk Savings®",
    description: "Shop raw organic bitter apricot kernels, wild sea buckthorn berries, and pure sun-dried Himalayan Shilajit resin. Nutrient-dense organic superfoods.",
    keywords: "organic apricot kernels, raw bitter apricot seeds, wild sea buckthorn berries, pure shilajit resin, organic superfood seeds, bulk dried herbs",
    heading: "Organic Seeds, Kernels & Superfoods",
    subheading: "Unprocessed bitter apricot seeds, nutrient-packed sea buckthorn, and authentic mineral-rich Himalayan Shilajit.",
    guideTitle: "Superfood Guide: Seeds, Berries & Mountain Resin",
    guideText: "From raw, sun-dried bitter apricot kernels to wild-harvested sea buckthorn berries and authentic high-altitude Shilajit resin, our seeds and superfoods deliver dense nutritional profiles rich in healthy fatty acids, vitamins A, C, and E, and over 84 trace minerals.",
    faqs: [
      {
        question: "What is the recommended daily serving of bitter apricot seeds?",
        answer: "We suggest starting with 3 kernels per day. They can be added to morning smoothies, mixed with yogurt or oatmeal, or sprinkled onto fresh salads.",
      },
      {
        question: "How do I prepare and consume Himalayan Shilajit resin?",
        answer: "Dissolve a pea-sized portion (250–500mg) using the included spatula into warm water, herbal tea, or warm milk. Drink in the morning for sustained natural energy.",
      },
      {
        question: "Are these seeds raw and unprocessed?",
        answer: "Yes, our bitter apricot seeds and sea buckthorn berries are raw, unroasted, non-GMO, and certified organic with zero added oils or preservatives.",
      },
    ],
  },
  "Herbs & Leaves": {
    title: "Organic Dried Herbs & Medicinal Leaves | Silk Savings®",
    description: "Explore organic dried yarrow, citrus lemongrass, senna leaves, juniper berries, and traditional rue herb. 100% pure botanicals with zero additives.",
    keywords: "organic dried herbs, dried yarrow herb, organic lemongrass, senna leaves for tea, juniper berries, traditional herbal infusions, bulk dried herbs, herbs for skincare, natural herbal teas",
    heading: "Organic Herbs & Leaves Collection",
    subheading: "Time-tested whole herbs, medicinal leaves, and purifying berries for traditional herbal infusions.",
    guideTitle: "Apothecary Guide: Traditional Leaves & Infusions",
    guideText: "Our herbs and leaves are carefully harvested from whole plants—including stems, leaves, and blooms—to preserve full-spectrum botanical compounds. Whether you seek the digestive support of Senna and Yarrow, the bright uplifting citrus notes of Lemongrass, or the purifying woodsy aroma of Juniper, each variety is dried slowly to protect natural essential oils.",
    faqs: [
      {
        question: "What makes whole-cut herbs superior to commercial tea bags?",
        answer: "Standard tea bags typically contain pulverized herbal dust and fannings that oxidize quickly. Our whole cut leaves preserve essential oils, aroma, and therapeutic potency.",
      },
      {
        question: "How often can I drink Senna tea?",
        answer: "Senna is traditionally used for short-term digestive support. We recommend enjoying 1 cup in the evening as needed, for up to 7 consecutive days.",
      },
      {
        question: "Can I blend different Silk Savings herbs together?",
        answer: "Yes! Many herbal tea enthusiasts combine Lemongrass with Calendula, or Yarrow with Rose Petals, for customized flavor profiles and wellness benefits.",
      },
    ],
  },
};

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

  const currentSeo = CATEGORY_SEO_DATA[activeCategory] || CATEGORY_SEO_DATA.All;

  const categorySchema = useMemo(
    () => (isValidCategory ? generateCategoryJsonLd(activeCategory, currentSeo.faqs) : undefined),
    [activeCategory, isValidCategory, currentSeo]
  );

  const canonicalUrl =
    activeCategory === "All"
      ? "https://www.silksavings.shop/products"
      : `https://www.silksavings.shop/products?cat=${encodeURIComponent(activeCategory)}`;

  useSEO({
    title: currentSeo.title,
    description: currentSeo.description,
    keywords: currentSeo.keywords,
    canonical: canonicalUrl,
    noindex: shouldNoIndex,
    jsonLd: categorySchema,
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
      {/* Breadcrumb Navigation */}
      <div className="bg-[#1b3420] border-b border-white/10 pt-20 pb-3 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs md:text-sm text-white/85 flex items-center gap-1.5 md:gap-2 font-sans flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            {activeCategory === "All" ? (
              <span className="text-[#c9a227] font-semibold">Products</span>
            ) : (
              <>
                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                <span>/</span>
                <span className="text-[#c9a227] font-semibold">{activeCategory}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="hero-gradient pt-16 pb-16 px-4 text-center">
        <div className="text-[#c9a227] text-sm tracking-widest uppercase font-semibold mb-2 font-sans">Our Collection</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-serif break-words">
          {currentSeo.heading}
        </h1>
        <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
          {currentSeo.subheading}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10 justify-center">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`min-h-[44px] px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold transition-all font-sans cursor-pointer flex items-center justify-center ${
                activeCategory === cat
                  ? "bg-[#2c5530] text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-[#2c5530] hover:text-[#2c5530]"
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
            <p className="text-gray-600 text-sm mb-6 font-sans">
              We couldn't find any products in "{activeCategory}".
            </p>
            <button
              onClick={() => handleCategoryChange("All")}
              className="bg-[#2c5530] text-white text-sm min-h-[44px] px-6 py-2.5 rounded-full hover:bg-[#1e3a22] transition-colors font-sans font-semibold cursor-pointer inline-flex items-center justify-center"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer border border-gray-100 h-full flex flex-col">
                  {/* Image container */}
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
                    <div className="text-[#855f00] text-xs font-bold uppercase tracking-wide mb-1 font-sans">{product.category}</div>
                    <h3 className="font-bold text-[#1e3a22] text-lg mb-2 leading-snug">{product.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 font-sans">{product.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.benefits.slice(0, 2).map((b) => (
                        <span key={b} className="text-xs bg-[#e8f5e8] text-[#2c5530] px-2.5 py-1 rounded-full font-semibold font-sans">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-2xl font-bold text-[#2c5530]">${product.price.toFixed(2)}</span>
                        {product.weight && (
                          <span className="text-gray-500 text-xs ml-1 font-sans">/ {product.weight}</span>
                        )}
                      </div>
                      <span className="bg-[#2c5530] text-white text-sm min-h-[40px] px-5 py-2 rounded-full hover:bg-[#1e3a22] transition-colors font-sans font-semibold inline-flex items-center justify-center">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ═══ CATEGORY EDUCATIONAL GUIDE & BUYING ADVICE ═══ */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#855f00] text-xs uppercase tracking-widest font-bold font-sans">Botanical Guide</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22] mt-2 mb-4 font-serif">{currentSeo.guideTitle}</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-sans mb-8">
              {currentSeo.guideText}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#fafaf8]">
              <div className="text-3xl mb-2">🌿</div>
              <h4 className="font-bold text-[#1e3a22] text-sm mb-1 font-sans">100% USDA Certified</h4>
              <p className="text-gray-600 text-xs font-sans">Sustainably wildcrafted and grown without synthetic chemicals or GMOs.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#fafaf8]">
              <div className="text-3xl mb-2">☀️</div>
              <h4 className="font-bold text-[#1e3a22] text-sm mb-1 font-sans">Gentle Air &amp; Sun Dried</h4>
              <p className="text-gray-600 text-xs font-sans">Preserves full-spectrum terpenes, essential oils, and aromatic profile.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#fafaf8]">
              <div className="text-3xl mb-2">🔬</div>
              <h4 className="font-bold text-[#1e3a22] text-sm mb-1 font-sans">Third-Party Lab Tested</h4>
              <p className="text-gray-600 text-xs font-sans">Tested for heavy metals, microbials, and moisture in ISO-17025 facilities.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#fafaf8]">
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-bold text-[#1e3a22] text-sm mb-1 font-sans">UV-Barrier Packaging</h4>
              <p className="text-gray-600 text-xs font-sans">Airtight multi-layer resealable pouches lock in freshness for 24 months.</p>
            </div>
          </div>
        </div>

        {/* ═══ CATEGORY FREQUENTLY ASKED QUESTIONS ═══ */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#855f00] text-xs uppercase tracking-widest font-bold font-sans">Got Questions?</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22] mt-2 mb-2 font-serif">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-sm font-sans">Learn more about our organic sourcing, storage guidelines, and brewing advice.</p>
          </div>

          <Accordion type="single" collapsible className="w-full bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm">
            {currentSeo.faqs.map((faq, index) => (
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

      </div>
    </div>
  );
}
