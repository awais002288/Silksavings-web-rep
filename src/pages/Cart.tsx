import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cartContext";
import { products } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";

export default function Cart() {
  useSEO({
    title: "Your Cart | Silk Savings® — Organic Herbs & Botanicals",
    description: "Review your organic herbs, dried flowers & seeds order. USDA Organic, Non-GMO, lab-tested. Checkout securely at Silk Savings®.",
    keywords: "organic herbs cart, buy organic herbs, USDA organic checkout, Silk Savings",
    canonical: "https://www.silksavings.shop/cart",
    noindex: true,
  });

  const { items, count, subtotal, removeFromCart, updateQty, addToCart } = useCart();
  const [, navigate] = useLocation();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const suggestions = products
    .filter((p) => !items.find((i) => i.product.id === p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const handleCheckout = async (item: typeof items[0]) => {
    setCheckoutLoading(true);
    setCheckoutError("");
    try {
      const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
      const res = await fetch(`${base}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productHandle: item.product.id,
          productName: item.product.name,
          productPrice: item.product.price,
          productImage: item.product.images[0]
            ? `${window.location.origin}${item.product.images[0]}`
            : undefined,
          quantity: item.quantity,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError("Could not start checkout. Please try again.");
      }
    } catch {
      setCheckoutError("Network error. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleAddSuggestion = (product: typeof products[0]) => {
    addToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => setAddedIds((prev) => prev.filter((id) => id !== product.id)), 1800);
  };

  const shipping = subtotal >= 35 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8faf8] to-white flex flex-col items-center justify-center px-4 pt-24 pb-16">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-[#1e3a22] mb-3">Your cart is empty</h1>
          <p className="text-gray-500 font-sans mb-8">Discover our premium organic herbs, seeds, and botanicals.</p>
          <Link
            href="/products"
            className="inline-block bg-[#2c5530] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#1e3a22] transition-all shadow-lg font-sans"
          >
            Shop All Products
          </Link>
        </div>

        {/* Suggestions even when empty */}
        <div className="w-full max-w-5xl mt-20 px-4">
          <div className="text-center mb-8">
            <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-1 font-sans">Featured Picks</div>
            <h2 className="text-2xl font-bold text-[#1e3a22]">Our Best Sellers</h2>
          </div>
          <SuggestionGrid products={products.slice(0, 4)} onAdd={handleAddSuggestion} addedIds={addedIds} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8faf8] to-white pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pt-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a22]">Your Cart</h1>
          <span className="bg-[#2c5530] text-white text-xs font-bold px-2.5 py-1 rounded-full font-sans">{count} item{count !== 1 ? "s" : ""}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ─── Cart Items ─── */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 items-start hover:shadow-md transition-shadow"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-[#f8faf8] flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain p-1.5"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[#c9a227] text-[10px] font-semibold uppercase tracking-wider font-sans">{product.category}</span>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-bold text-[#1e3a22] text-sm md:text-base leading-snug hover:text-[#2c5530] transition-colors">{product.name}</h3>
                      </Link>
                      {product.weight && (
                        <span className="text-gray-400 text-xs font-sans">{product.weight}</span>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 p-1"
                      aria-label="Remove"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty controls */}
                    <div className="flex items-center gap-1 bg-[#f8faf8] rounded-full border border-gray-200 px-1">
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#2c5530] font-bold text-lg hover:bg-[#e8f0e8] rounded-full transition-colors"
                      >−</button>
                      <span className="w-7 text-center text-sm font-bold text-[#1e3a22] font-sans">{quantity}</span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#2c5530] font-bold text-lg hover:bg-[#e8f0e8] rounded-full transition-colors"
                      >+</button>
                    </div>
                    <span className="font-black text-[#2c5530] text-base md:text-lg">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue shopping */}
            <Link href="/products" className="inline-flex items-center gap-2 text-[#2c5530] text-sm font-semibold hover:text-[#1e3a22] transition-colors font-sans mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* ─── Order Summary ─── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <h2 className="font-bold text-[#1e3a22] text-lg mb-4">Order Summary</h2>

              <div className="space-y-2.5 text-sm font-sans">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({count} item{count !== 1 ? "s" : ""})</span>
                  <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0
                    ? <span className="text-[#2c5530] font-semibold">FREE</span>
                    : <span className="font-medium text-gray-800">${shipping.toFixed(2)}</span>
                  }
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-[#c9a227] font-sans">
                    Add ${(35 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t border-gray-100 pt-2.5 flex justify-between font-black text-[#1e3a22] text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {items.map((item) => (
                  <button
                    key={item.product.id}
                    onClick={() => handleCheckout(item)}
                    disabled={checkoutLoading}
                    className="w-full bg-[#2c5530] text-white py-3.5 rounded-full font-bold text-sm hover:bg-[#1e3a22] transition-all shadow-md font-sans disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {checkoutLoading ? (
                      <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                    ) : (
                      <>🔒 Checkout — {item.product.name.split(" ").slice(0, 3).join(" ")} ×{item.quantity}</>
                    )}
                  </button>
                ))}
              </div>
              {checkoutError && <p className="text-red-500 text-xs font-sans mt-2 text-center">{checkoutError}</p>}

              {/* Trust badges */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[["🔒", "Secure"], ["↩️", "Easy Returns"], ["🌿", "Organic"]].map(([icon, label]) => (
                    <div key={label} className="text-center">
                      <div className="text-xl mb-0.5">{icon}</div>
                      <div className="text-[10px] text-gray-400 font-sans">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Suggestions ─── */}
        {suggestions.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="text-[#c9a227] text-xs tracking-widest uppercase font-semibold mb-1 font-sans">Customers Also Love</div>
                <h2 className="text-2xl font-bold text-[#1e3a22]">You Might Also Like</h2>
              </div>
              <Link href="/products" className="text-[#2c5530] text-sm font-semibold hover:text-[#1e3a22] font-sans hidden sm:block">View All →</Link>
            </div>
            <SuggestionGrid products={suggestions} onAdd={handleAddSuggestion} addedIds={addedIds} />
          </div>
        )}
      </div>
    </div>
  );
}

function SuggestionGrid({
  products: prods,
  onAdd,
  addedIds,
}: {
  products: typeof import("@/data/products").products;
  onAdd: (p: typeof import("@/data/products").products[0]) => void;
  addedIds: string[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {prods.map((product) => {
        const added = addedIds.includes(product.id);
        return (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <Link href={`/products/${product.id}`}>
              <div className="aspect-square bg-[#f8faf8] flex items-center justify-center p-3 relative overflow-hidden">
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-[#c9a227] text-[#1e3a22] text-[9px] font-bold px-2 py-0.5 rounded-full font-sans z-10">
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>
            <div className="p-3 flex flex-col flex-1">
              <span className="text-[#c9a227] text-[9px] font-semibold uppercase tracking-wider font-sans mb-0.5">{product.category}</span>
              <Link href={`/products/${product.id}`}>
                <h3 className="font-bold text-[#1e3a22] text-xs leading-snug mb-2 line-clamp-2 hover:text-[#2c5530] transition-colors">{product.name}</h3>
              </Link>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-black text-[#2c5530] text-sm">${product.price.toFixed(2)}</span>
                <button
                  onClick={() => onAdd(product)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all font-sans ${
                    added
                      ? "bg-[#2c5530] text-white scale-95"
                      : "bg-[#f0f7f0] text-[#2c5530] hover:bg-[#2c5530] hover:text-white"
                  }`}
                >
                  {added ? "✓ Added" : "+ Add"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
