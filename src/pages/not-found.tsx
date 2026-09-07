import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

export default function NotFound() {
  useSEO({
    title: "404 Page Not Found | Silk Savings®",
    description: "The page you are looking for does not exist. Explore our collection of 100% pure & organic botanicals.",
    noindex: true,
  });

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#f9f7f2]">
      <div className="text-center max-w-md bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl">
        <div className="text-6xl mb-4">🌿</div>
        <div className="text-[#c9a227] text-xs uppercase tracking-widest font-semibold mb-2 font-sans">
          Error 404
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a22] mb-3 font-display">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-sm mb-8 font-sans leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#2c5530] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1e3a22] transition-colors font-sans text-sm shadow-md"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="border-2 border-[#2c5530] text-[#2c5530] px-6 py-3 rounded-full font-bold hover:bg-[#f0f7f0] transition-colors font-sans text-sm"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
}
