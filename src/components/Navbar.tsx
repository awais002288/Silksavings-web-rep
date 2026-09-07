import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cartContext";
import logo from "@/assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import halalCertification from "@/assets/certifications/halal-certification.webp";
import gmpCertification from "@/assets/certifications/gmp-certification.webp";
import certificateOfAnalysis from "@/assets/certifications/certificate-of-analysis.webp";
import materialTesting from "@/assets/certifications/material-testing.webp";

const certifications = [
  { label: "Halal Certification", image: halalCertification },
  { label: "GMP Certification", image: gmpCertification },
  { label: "Certificate of Analysis (COA)", image: certificateOfAnalysis },
  { label: "Material Testing", image: materialTesting },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { count } = useCart();
  const [activeCert, setActiveCert] = useState<(typeof certifications)[number] | null>(null);

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
              src={logo}
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
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium tracking-wide transition-colors font-sans text-white/80 hover:text-white outline-none cursor-pointer">
                Certifications
                <ChevronDown className="w-3.5 h-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="bg-[#1a3320] border-white/10 text-white/90"
              >
                {certifications.map((cert) => (
                  <DropdownMenuItem
                    key={cert.label}
                    onSelect={() => setActiveCert(cert)}
                    className="cursor-pointer font-sans focus:bg-white/10 focus:text-white"
                  >
                    {cert.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
            <div className="px-2 py-1.5">
              <div className="text-sm font-medium text-white/80 font-sans mb-1.5">
                Certifications
              </div>
              <div className="flex flex-col gap-1 pl-2 border-l border-white/10">
                {certifications.map((cert) => (
                  <button
                    key={cert.label}
                    type="button"
                    className="text-left text-sm text-white/70 hover:text-white transition-colors font-sans py-1 cursor-pointer"
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveCert(cert);
                    }}
                  >
                    {cert.label}
                  </button>
                ))}
              </div>
            </div>
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

      <Dialog open={!!activeCert} onOpenChange={(open) => !open && setActiveCert(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl md:max-w-3xl max-h-[92vh] flex flex-col p-4 sm:p-6 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden text-gray-900">
          <DialogHeader className="mb-2 text-left pr-8">
            <DialogTitle className="text-lg md:text-xl font-bold text-[#1e3a22] font-sans">
              {activeCert?.label}
            </DialogTitle>
            <DialogDescription className="text-xs text-[#c9a227] font-semibold uppercase tracking-wider font-sans">
              Silk Savings® 100% Pure & Organic Quality Verification
            </DialogDescription>
          </DialogHeader>

          {activeCert && (
            <div className="relative flex-1 overflow-auto rounded-xl bg-gray-50/80 p-2 sm:p-4 flex items-center justify-center border border-gray-100">
              <img
                src={activeCert.image}
                alt={activeCert.label}
                className="max-h-[66vh] w-auto object-contain rounded-lg shadow-sm"
              />
            </div>
          )}

          <div className="mt-2 flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500 font-sans">
            <span>Silk Savings® Verified Document</span>
            {activeCert && (
              <a
                href={activeCert.image}
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
    </header>
  );
}
