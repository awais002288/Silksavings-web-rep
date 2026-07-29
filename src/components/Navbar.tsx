import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current < 10) {
        setVisible(true);
      } else if (current > lastScrollY.current) {
        setVisible(false);
        setMenuOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#1a3320] shadow-xl border-b border-white/5 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-1.5 md:py-2">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <img
              src="/assets/Untitled_design_(14)_1778759060246.webp"
              alt="Silk Savings Lion Logo"
              className="w-9 h-9 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-[#c9a227]/40 group-hover:ring-[#c9a227] transition-all"
            />
            <div>
              <div className="text-white font-bold text-base md:text-xl leading-none tracking-wide font-display">
                Silk Savings<span className="text-[#c9a227] text-[10px] md:text-xs align-super ml-0.5">®</span>
              </div>
              <div className="text-[#c9a227]/80 text-[9px] md:text-xs tracking-widest uppercase font-sans mt-0.5">
                100% Pure & Organic
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors font-sans ${
                  location === link.href
                    ? "text-[#c9a227]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/products"
              className="bg-[#c9a227] text-[#1a3320] px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#e0b730] transition-colors font-sans tracking-wide shadow-md"
            >
              Shop Now
            </Link>
            <Link href="/cart" className="relative text-white hover:text-[#c9a227] transition-colors" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#c9a227] text-[#1a3320] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link href="/cart" className="relative text-white hover:text-[#c9a227] transition-colors p-1" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {count > 0 && (
                <span className="absolute top-0 right-0 bg-[#c9a227] text-[#1a3320] text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
            <button
              className="text-white p-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-3 flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium px-2 py-1.5 rounded transition-colors font-sans ${
                  location === link.href
                    ? "text-[#c9a227]"
                    : "text-white/80 hover:text-white"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/products"
              className="bg-[#c9a227] text-[#1a3320] px-5 py-2 rounded-full text-sm font-bold text-center hover:bg-[#e0b730] transition-colors mt-1 font-sans"
              onClick={() => setMenuOpen(false)}
            >
              Shop Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
