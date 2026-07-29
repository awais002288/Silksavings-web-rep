import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";

type FormState = { name: string; email: string; subject: string; message: string };
const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  useSEO({
    title: "Contact Us | Silk Savings® — Organic Herbs, Dried Flowers & Seeds",
    description: "Contact Silk Savings® for questions about USDA Organic herbs, dried flowers & seeds. Order help, wholesale inquiries — we reply within 24–48 hours.",
    keywords: "contact Silk Savings, organic herbs support, USDA organic store contact, buy organic herbs help",
    canonical: "https://www.silksavings.shop/contact",
  });
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      setForm(EMPTY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="hero-gradient pt-28 pb-16 px-4 text-center">
        <div className="text-[#c9a227] text-sm tracking-widest uppercase font-semibold mb-2">Get in Touch</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto">
          Questions, feedback, or wholesale inquiries — we'd love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-[#1e3a22] mb-8">We're Here to Help</h2>
            <div className="space-y-6">
              {[
                {
                  icon: "📍",
                  title: "Our Address",
                  lines: ["30 N Gould St", "Sheridan, WY 82801", "United States"],
                },
                {
                  icon: "📞",
                  title: "Phone",
                  lines: ["307-243-8254"],
                  href: "tel:3072438254",
                },
                {
                  icon: "✉",
                  title: "Email",
                  lines: ["support@leadscollab.uk"],
                  href: "mailto:support@leadscollab.uk",
                },
                {
                  icon: "🕐",
                  title: "Business Hours",
                  lines: ["Monday – Friday: 9:00 AM – 5:00 PM MST"],
                },
              ].map((info) => (
                <div key={info.title} className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#e8f5e8] flex items-center justify-center text-xl flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[#1e3a22] mb-1">{info.title}</div>
                    {info.href ? (
                      <a href={info.href} className="text-[#2c5530] hover:text-[#c9a227] transition-colors text-sm">
                        {info.lines[0]}
                      </a>
                    ) : (
                      info.lines.map((l, i) => (
                        <div key={i} className="text-gray-500 text-sm">{l}</div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-[#1e3a22] rounded-2xl text-white">
              <h3 className="font-bold text-[#c9a227] mb-3">Return & Refund Questions?</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                For issues with your order, returns, or refunds, please email us with your order number and we'll respond within 24-48 business hours.
              </p>
              <a
                href="mailto:support@leadscollab.uk?subject=Order%20Return%20Request"
                className="inline-block bg-[#c9a227] text-[#1e3a22] px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#e0b730] transition-colors"
              >
                Email for Returns
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="text-6xl mb-6">✅</div>
                <h3 className="text-2xl font-bold text-[#1e3a22] mb-3">Message Sent!</h3>
                <p className="text-gray-500 mb-2">Thank you for reaching out. We'll get back to you within 24-48 business hours.</p>
                <p className="text-gray-400 text-sm mb-6">A confirmation email has been sent to your inbox.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[#2c5530] font-semibold border-b-2 border-[#c9a227] pb-0.5 hover:text-[#c9a227] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[#1e3a22] mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2c5530] transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2c5530] transition-colors"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2c5530] transition-colors bg-white"
                    >
                      <option value="">Select a subject...</option>
                      <option>General Inquiry</option>
                      <option>Order Status</option>
                      <option>Return or Refund</option>
                      <option>Product Question</option>
                      <option>Wholesale Inquiry</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2c5530] transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2c5530] text-white py-4 rounded-full font-bold hover:bg-[#1e3a22] transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
