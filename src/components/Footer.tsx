import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#111e14] text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/assets/Untitled_design_(14)_1778759060246.png"
                alt="Silk Savings"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#c9a227]/50"
              />
              <div>
                <div className="font-bold text-lg leading-none font-display">
                  Silk Savings<span className="text-[#c9a227] text-xs align-super ml-0.5">®</span>
                </div>
                <div className="text-[#c9a227]/60 text-xs tracking-widest uppercase font-sans">100% Pure & Organic</div>
              </div>
            </div>
            <p className="text-white/40 text-xs font-sans leading-relaxed max-w-48">
              Premium organic herbs, flowers &amp; seeds — ethically sourced.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-10 gap-y-6 flex-1">
            <div>
              <p className="text-[#c9a227] text-xs font-bold uppercase tracking-widest mb-3 font-sans">Shop</p>
              <ul className="space-y-2">
                {[
                  { href: "/products", label: "All Products" },
                  { href: "/products?cat=Flowers", label: "Dried Flowers" },
                  { href: "/products?cat=Seeds+%26+Kernels", label: "Seeds & Kernels" },
                  { href: "/products?cat=Herbs+%26+Leaves", label: "Herbs & Leaves" },
                ].map((l) => (
                  <li key={l.href}><Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors font-sans">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[#c9a227] text-xs font-bold uppercase tracking-widest mb-3 font-sans">Company</p>
              <ul className="space-y-2">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/contact", label: "Contact" },
                  { href: "/returns", label: "Returns" },
                  { href: "/privacy", label: "Privacy Policy" },
                ].map((l) => (
                  <li key={l.href}><Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors font-sans">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[#c9a227] text-xs font-bold uppercase tracking-widest mb-3 font-sans">Contact</p>
              <ul className="space-y-2 text-sm font-sans text-white/50">
                <li>30 N Gould St, Sheridan WY 82801</li>
                <li><a href="tel:3072438254" className="hover:text-white transition-colors">307-243-8254</a></li>
                <li><a href="mailto:support@leadscollab.uk" className="hover:text-white transition-colors">support@leadscollab.uk</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/30 font-sans">
          <p>&copy; {new Date().getFullYear()} leadscollaborate LLC. Silk Savings® is a registered trademark.</p>
        </div>
      </div>
    </footer>
  );
}
