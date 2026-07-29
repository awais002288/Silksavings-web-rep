import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

export default function Returns() {
  useSEO({
    title: "Return Policy | Silk Savings® — Organic Herbs & Seeds",
    description: "Silk Savings® 30-day return policy for USDA Organic herbs, dried flowers & seeds. Easy returns and full refunds. Your satisfaction guaranteed.",
    keywords: "return policy, organic herbs return, Silk Savings refund, USDA organic store returns",
    canonical: "https://www.silksavings.shop/returns",
  });
  return (
    <div className="min-h-screen">
      <div className="hero-gradient pt-28 pb-16 px-4 text-center">
        <div className="text-[#c9a227] text-sm tracking-widest uppercase font-semibold mb-2">Customer Care</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Return Policy</h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Your satisfaction is our priority. Here's everything you need to know about returns, refunds, and exchanges.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20">
        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: "📅",
              title: "30-Day Returns",
              desc: "Return eligible items within 30 days of delivery for a full refund.",
              color: "bg-green-50 border-green-200",
              iconBg: "bg-green-100",
            },
            {
              icon: "💳",
              title: "Full Refunds",
              desc: "Refunds are issued to your original payment method within 5-7 business days.",
              color: "bg-blue-50 border-blue-200",
              iconBg: "bg-blue-100",
            },
            {
              icon: "📧",
              title: "Easy Process",
              desc: "Email us to initiate a return. No hassle, no complicated forms.",
              color: "bg-amber-50 border-amber-200",
              iconBg: "bg-amber-100",
            },
          ].map((card) => (
            <div key={card.title} className={`${card.color} border rounded-2xl p-6 text-center`}>
              <div className={`${card.iconBg} w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}>
                {card.icon}
              </div>
              <h3 className="font-bold text-[#1e3a22] text-lg mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
          <div className="space-y-10">

            {/* Eligibility */}
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a22] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#2c5530] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                Return Eligibility
              </h2>
              <div className="pl-11">
                <p className="text-gray-600 mb-4 leading-relaxed">To be eligible for a return, your item must meet the following conditions:</p>
                <ul className="space-y-2">
                  {[
                    "Item must be returned within 30 days of the delivery date",
                    "Item must be in its original, unopened condition with the seal intact",
                    "Item must be in its original packaging",
                    "Proof of purchase (order number or receipt) is required",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="text-[#2c5530] font-bold mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-700 text-sm font-medium mb-2">Non-Returnable Items:</p>
                  <ul className="space-y-1 text-red-600 text-sm">
                    <li>• Opened or partially used products (for health and safety reasons)</li>
                    <li>• Items damaged through misuse or improper storage</li>
                    <li>• Items returned after 30 days from delivery</li>
                    <li>• Sale or clearance items (unless defective)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="section-divider" />

            {/* How to Return */}
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a22] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#2c5530] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                How to Initiate a Return
              </h2>
              <div className="pl-11">
                <div className="space-y-4">
                  {[
                    {
                      step: "Step 1",
                      title: "Contact Us by Email",
                      desc: 'Email us at support@leadscollab.uk with the subject line "Return Request – [Your Order Number]". Include your order number, the item(s) you wish to return, and the reason for return.',
                    },
                    {
                      step: "Step 2",
                      title: "Receive Return Authorization",
                      desc: "We will review your request and respond within 1-2 business days with a Return Authorization (RA) number and return instructions.",
                    },
                    {
                      step: "Step 3",
                      title: "Ship Your Return",
                      desc: "Securely package your item and ship it to our returns address. We recommend using a trackable shipping method. Return shipping costs are the responsibility of the customer unless the return is due to our error or a defective product.",
                    },
                    {
                      step: "Step 4",
                      title: "Receive Your Refund",
                      desc: "Once we receive and inspect your return, we will process your refund within 3-5 business days. Refunds are applied to your original payment method.",
                    },
                  ].map((s) => (
                    <div key={s.step} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <span className="inline-block bg-[#e8f5e8] text-[#2c5530] text-xs font-bold px-2.5 py-1 rounded-full">{s.step}</span>
                      </div>
                      <div>
                        <div className="font-bold text-[#1e3a22] mb-1">{s.title}</div>
                        <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="section-divider" />

            {/* Refunds */}
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a22] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#2c5530] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                Refunds
              </h2>
              <div className="pl-11 space-y-3 text-gray-600 text-sm leading-relaxed">
                <p>Once your return is received and inspected, we will send you an email notification confirming receipt and the approval or rejection of your refund.</p>
                <p>If approved, your refund will be processed and automatically applied to your original method of payment within <strong>5-7 business days</strong>. Please note that your bank or credit card company may take additional time to post the refund.</p>
                <p>If you haven't received your refund within 10 business days, please first check with your bank. If you still have not received it, contact us at support@leadscollab.uk.</p>
              </div>
            </div>

            <div className="section-divider" />

            {/* Damaged/Defective */}
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a22] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#2c5530] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                Damaged or Defective Items
              </h2>
              <div className="pl-11">
                <div className="bg-[#e8f5e8] border border-[#b8d8b8] rounded-2xl p-5">
                  <p className="text-[#1e3a22] text-sm leading-relaxed mb-3">
                    If you receive a damaged, defective, or incorrect item, we sincerely apologize. Please contact us within <strong>7 days</strong> of receiving your order with:
                  </p>
                  <ul className="space-y-1 text-[#2c5530] text-sm">
                    <li>• Your order number</li>
                    <li>• A description of the damage or defect</li>
                    <li>• Clear photos of the damaged/defective item and packaging</li>
                  </ul>
                  <p className="text-[#1e3a22] text-sm mt-3">
                    We will cover return shipping costs and send a replacement or issue a full refund at no additional charge.
                  </p>
                </div>
              </div>
            </div>

            <div className="section-divider" />

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-[#1e3a22] mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-[#2c5530] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                Contact Us About a Return
              </h2>
              <div className="pl-11">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: "✉", label: "Email", value: "support@leadscollab.uk", href: "mailto:support@leadscollab.uk?subject=Return%20Request" },
                    { icon: "📞", label: "Phone", value: "307-243-8254", href: "tel:3072438254" },
                    { icon: "📍", label: "Address", value: "30 N Gould St, Sheridan, WY 82801", href: null },
                  ].map((c) => (
                    <div key={c.label} className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-2xl mb-2">{c.icon}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-[#2c5530] font-semibold text-sm hover:text-[#c9a227] transition-colors">{c.value}</a>
                      ) : (
                        <span className="text-gray-600 text-sm">{c.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm mb-6">
            leadscollaborate LLC — Silk Savings® — Sheridan, WY
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#2c5530] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1e3a22] transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
