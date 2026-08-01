import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { getProductById } from "@/data/products";

export default function About() {
  useSEO({
    title: "About Silk Savings® | USDA Organic Herbs, Dried Flowers & Seeds",
    description: "Silk Savings® sells USDA Organic herbs, dried flowers & seeds. Non-GMO, lab-tested, zero additives. Ethically sourced from certified organic farms.",
    keywords: "about Silk Savings, organic herbs brand, USDA organic company, Non-GMO botanicals, organic dried flowers, organic seeds",
    canonical: "https://www.silksavings.shop/about",
  });
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="hero-gradient pt-28 pb-16 px-4 text-center">
        <div className="text-[#c9a227] text-sm tracking-widest uppercase font-semibold mb-2">Who We Are</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Silk Savings</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          A story rooted in nature, built on transparency, and driven by a commitment to your wellbeing.
        </p>
      </div>

      {/* Brand Story */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[#c9a227] text-sm tracking-widest uppercase font-semibold mb-3">Our Beginning</div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a22] mb-6">From a Simple Belief to a Growing Mission</h2>
              <div className="section-divider mb-8" />
              <p className="text-gray-600 leading-relaxed mb-5 text-base">
                Silk Savings was founded with one core belief: that nature provides everything we need to live well. We saw a world full of premium organic botanicals that were either unavailable, overpriced, or compromised with fillers and additives — and we set out to change that.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Based in Sheridan, Wyoming, and operating under leadscollaborate LLC, we built Silk Savings as a brand that would never cut corners. From our very first product, we committed to sourcing only from certified organic farms, using zero artificial additives, and testing every batch for purity and potency.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, Silk Savings is a registered trademark — a symbol of the trust our customers place in us, and the standard we hold ourselves to every single day. Our customers know that when they see the Silk Savings name, they're getting exactly what's on the label: pure, organic, and authentic.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl h-96">
              <img
                src={getProductById("dried-calendula-flowers")!.images[1] ?? getProductById("dried-calendula-flowers")!.images[0]}
                alt="Calendula flower tea"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[#c9a227] text-sm tracking-widest uppercase font-semibold mb-2">What Drives Us</div>
            <h2 className="text-3xl font-bold text-[#1e3a22]">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🌿",
                title: "Purity Above All",
                desc: "Every product is free from pesticides, fillers, artificial colors, and preservatives. What's in the bag is exactly what the label says — nothing more, nothing less.",
              },
              {
                icon: "🤝",
                title: "Radical Transparency",
                desc: "We believe you have the right to know where your herbs come from and how they're processed. We share everything, because we have nothing to hide.",
              },
              {
                icon: "♻️",
                title: "Ethical Sourcing",
                desc: "We partner exclusively with certified organic farms that practice sustainable agriculture, protecting both the environment and the communities that grow our botanicals.",
              },
              {
                icon: "🔬",
                title: "Quality Testing",
                desc: "Every batch is tested for potency, purity, and safety before it reaches your hands. We don't ship anything we wouldn't use ourselves.",
              },
              {
                icon: "💚",
                title: "Community First",
                desc: "Our customers are our community. We listen, we improve, and we grow together. Your health and satisfaction will always be our first priority.",
              },
              {
                icon: "📜",
                title: "Honest Labeling",
                desc: "We follow all FDA guidelines for labeling and make clear distinctions between product benefits and medical claims. We respect your intelligence.",
              },
            ].map((val) => (
              <div key={val.title} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{val.icon}</div>
                <h3 className="font-bold text-[#1e3a22] text-lg mb-3">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-[#c9a227] text-sm tracking-widest uppercase font-semibold mb-3">Legal Information</div>
              <h2 className="text-3xl font-bold text-[#1e3a22] mb-6">Company Details</h2>
              <div className="space-y-5">
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Legal Name</div>
                  <div className="font-semibold text-[#1e3a22]">leadscollaborate LLC</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Trademark</div>
                  <div className="font-semibold text-[#1e3a22]">Silk Savings® (Registered Trademark)</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Address</div>
                  <div className="font-semibold text-[#1e3a22]">30 N Gould St<br />Sheridan, WY 82801<br />United States</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Phone</div>
                  <a href="tel:3072438254" className="font-semibold text-[#2c5530] hover:text-[#c9a227] transition-colors">307-243-8254</a>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">Email</div>
                  <a href="mailto:support@leadscollab.uk" className="font-semibold text-[#2c5530] hover:text-[#c9a227] transition-colors">support@leadscollab.uk</a>
                </div>
              </div>
            </div>
            <div className="bg-[#1e3a22] rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold text-[#c9a227] mb-5">Our Commitment to You</h3>
              <ul className="space-y-4">
                {[
                  "All products are USDA certified organic",
                  "Non-GMO and free from artificial additives",
                  "Harvested at peak potency and freshness",
                  "Packaged in resealable, moisture-proof bags",
                  "Each batch tested for quality and purity",
                  "FDA disclaimer displayed on all products",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="text-[#c9a227] mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Resources / Authority Backlinks */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-2">Verified & Trusted</div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a22] mb-3">Our Standards Are Backed By Science</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">We align our practices with the most respected authorities in organic agriculture, food safety, and botanical wellness.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "USDA Organic Program",
                desc: "All our products meet or exceed USDA National Organic Program (NOP) standards — the gold standard for organic certification.",
                href: "https://www.ams.usda.gov/about-ams/programs-offices/national-organic-program",
                label: "ams.usda.gov",
                icon: "🌿",
              },
              {
                title: "Non-GMO Standards",
                desc: "We follow Non-GMO verification guidelines to ensure our products are free from genetically modified organisms.",
                href: "https://www.ams.usda.gov/rules-regulations/be",
                label: "ams.usda.gov/be",
                icon: "🌱",
              },
              {
                title: "FDA Food Safety",
                desc: "Our products comply with FDA guidelines for dietary botanicals and food-grade herbs.",
                href: "https://www.fda.gov/food/dietary-supplements",
                label: "fda.gov",
                icon: "🛡️",
              },
              {
                title: "Organic Certification Info",
                desc: "Learn what USDA Organic certification means and why it matters for the herbs and botanicals you consume.",
                href: "https://www.nal.usda.gov/legacy/afsic/organic-farming",
                label: "nal.usda.gov",
                icon: "📋",
              },
              {
                title: "Herbal Medicine Research",
                desc: "Evidence-based research on botanical herbs from the National Center for Complementary and Integrative Health.",
                href: "https://www.nccih.nih.gov/health/herbsataglance",
                label: "nccih.nih.gov",
                icon: "🔬",
              },
              {
                title: "Sustainable Agriculture",
                desc: "We partner with farms aligned with USDA sustainable agriculture practices to protect the planet.",
                href: "https://www.ams.usda.gov/services/local-regional/organic-agriculture",
                label: "ams.usda.gov",
                icon: "♻️",
              },
            ].map((res) => (
              <a
                key={res.title}
                href={res.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-100 bg-[#f9f7f2] hover:border-[#2c5530] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{res.icon}</span>
                  <span className="font-bold text-[#1e3a22] text-sm group-hover:text-[#2c5530]">{res.title}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{res.desc}</p>
                <span className="text-[#c9a227] text-xs font-semibold">{res.label} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#f5f0e8] text-center">
        <h2 className="text-3xl font-bold text-[#1e3a22] mb-4">Have Questions?</h2>
        <p className="text-gray-600 mb-8">Our team is here to help. Reach out anytime.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="bg-[#2c5530] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1e3a22] transition-colors">
            Contact Us
          </Link>
          <Link href="/products" className="border-2 border-[#2c5530] text-[#2c5530] px-8 py-4 rounded-full font-bold hover:bg-[#e8f5e8] transition-colors">
            Shop Products
          </Link>
        </div>
      </section>
    </div>
  );
}
