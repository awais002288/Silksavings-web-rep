import { useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";
import { trackGoogleAdsConversion } from "@/lib/gtag";

export default function ThankYou() {
  useSEO({
    title: "Thank You for Your Order | Silk Savings®",
    description: "Thank you for choosing Silk Savings®. Your USDA Organic botanicals order has been received.",
    canonical: "https://www.silksavings.shop/thank-you",
    noindex: true,
  });

  useEffect(() => {
    trackGoogleAdsConversion();
  }, []);

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#f8faf8] to-white flex flex-col items-center justify-center px-4 pt-32 pb-16">
      <div className="max-w-lg w-full bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-10 text-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
          ✓
        </div>

        <span className="text-[#c9a227] text-xs uppercase tracking-widest font-semibold font-sans">
          Order Confirmed
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a22] mt-2 mb-3">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed mb-8">
          We have received your order. Our team is preparing your pure, USDA Certified Organic botanicals with the highest standard of care.
        </p>

        <div className="bg-[#fcfaf6] border border-[#e8ded0] rounded-2xl p-5 mb-8 text-left space-y-3 font-sans text-sm">
          <div className="flex items-start gap-3">
            <span className="text-lg">📧</span>
            <div>
              <p className="font-semibold text-[#1e3a22]">Email Confirmation</p>
              <p className="text-gray-500 text-xs">
                A confirmation email with your order details has been sent to your inbox.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 pt-2 border-t border-[#f0e8dc]">
            <span className="text-lg">📦</span>
            <div>
              <p className="font-semibold text-[#1e3a22]">Tracked Shipping</p>
              <p className="text-gray-500 text-xs">
                You will receive another update with tracking info as soon as your package ships.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 pt-2 border-t border-[#f0e8dc]">
            <span className="text-lg">💬</span>
            <div>
              <p className="font-semibold text-[#1e3a22]">Need Help?</p>
              <p className="text-gray-500 text-xs">
                Contact us anytime at{" "}
                <a href="mailto:support@leadscollab.uk" className="text-[#2c5530] underline font-medium">
                  support@leadscollab.uk
                </a>{" "}
                or call +1-307-243-8254.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center font-sans">
          <Link
            href="/products"
            className="w-full sm:w-auto bg-[#2c5530] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#1e3a22] transition-all shadow-md text-center"
          >
            Explore More Products
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto border border-gray-300 text-gray-700 px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
