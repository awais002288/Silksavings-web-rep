import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

interface Message {
  from: "bot" | "user";
  text: string;
  buttons?: { label: string; value: string }[];
  time: string;
}

type LeadStep = "idle" | "ask_name" | "ask_contact" | "done";

const now = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// ── Product knowledge base ─────────────────────────────────────────────────
const KB: { keywords: string[]; reply: string; link?: string }[] = [
  {
    keywords: ["calendula", "flower", "flowers"],
    reply:
      "🌼 *Organic Dried Calendula Flowers* — $19.99\nBenefits: skin soothing, anti-inflammatory, rich in antioxidants. Great for teas, salves & skincare. USDA Organic & Non-GMO.\n👉 Want to add it to your cart?",
    link: "/products/dried-calendula-flowers",
  },
  {
    keywords: ["apricot", "kernels", "b17", "amygdalin"],
    reply:
      "🍑 *Organic Bitter Apricot Seeds*\n• 8 oz — $17.99\n• 1 lb value pack — $29.99\nRaw, unprocessed, USDA Organic. Popular in traditional wellness routines. Non-GMO certified.\n👉 Which size works for you?",
    link: "/products/bitter-apricot-seeds-8oz",
  },
  {
    keywords: ["rose", "petals", "rosewater"],
    reply:
      "🌹 *Dried Rose Petals* — $14.99\nBenefits: mood-lifting aroma, antioxidant-rich, great for teas, culinary use & DIY skincare. 100% natural, no additives.\n👉 Add to cart?",
    link: "/products/dried-rose-petals",
  },
  {
    keywords: ["yarrow", "achillea"],
    reply:
      "🌿 *Dried Yarrow Herb* — $19.99\nBenefits: digestive support, traditional wound care, immune health. USDA Organic, Non-GMO & Vegan.\n👉 Interested in this one?",
    link: "/products/dried-yarrow-herb",
  },
  {
    keywords: ["lemongrass", "lemon grass", "lemon"],
    reply:
      "🍋 *Organic Dried Lemon Grass* — $16.99\nBenefits: calming properties, digestive support, refreshing citrus aroma. Perfect for teas & cooking. USDA Organic.\n👉 Would you like to order?",
    link: "/products/dried-lemon-grass",
  },
  {
    keywords: ["rue", "ruta"],
    reply:
      "🌱 *Dried Rue Herb* — $17.99\nA traditional botanical used in herbal practices. USDA Organic, Non-GMO. Ideal for collectors and herbal enthusiasts.\n👉 Add to your order?",
    link: "/products/dried-rue-herb",
  },
  {
    keywords: ["juniper", "berries", "gin"],
    reply:
      "🫐 *Dried Juniper Berries* — $18.99\nBenefits: digestive & urinary support, antioxidant-rich. Used in cooking, teas & natural remedies. USDA Organic.\n👉 Shall I help you add it?",
    link: "/products/dried-juniper-berries",
  },
  {
    keywords: ["sea buckthorn", "buckthorn", "seabuckthorn"],
    reply:
      "🧡 *Wild Sea Buckthorn Berries* — $22.99\nOne of nature's most nutrient-dense foods! Rich in vitamins C, A, E & omega fatty acids. Wild-harvested, USDA Organic.\n👉 Want to try it?",
    link: "/products/wild-sea-buckthorn",
  },
  {
    keywords: ["senna", "laxative", "digestive", "constipation"],
    reply:
      "🍃 *Dried Senna Leaves* — $16.99\nNaturally supports digestive health. Gentle overnight action. USDA Organic, Vegan, Gluten-Free, Additives-Free.\n👉 Would you like to order?",
    link: "/products/dried-senna-leaves",
  },
  {
    keywords: ["shilajit", "resin", "fulvic", "mineral"],
    reply:
      "⚫ *Sun Dried Shilajit Resin* — $49.99\nOur premium product! Packed with fulvic acid & 85+ minerals. Supports energy, immunity & vitality. USDA Organic.\n👉 Want to know more or buy?",
    link: "/products/shilajit-resin",
  },
  {
    keywords: ["shipping", "delivery", "ship", "arrive", "how long"],
    reply:
      "📦 *Shipping Info*\nWe ship worldwide! Standard delivery:\n• USA: 3–7 business days\n• International: 7–21 business days\nFree shipping on qualifying orders. Tracking info sent by email once shipped.",
  },
  {
    keywords: ["return", "refund", "exchange", "money back"],
    reply:
      "✅ *Returns & Refunds*\nWe offer a 30-day return policy. If you're not happy, we'll make it right — full refund or exchange, no questions asked.\n📧 Email: support@leadscollab.uk",
  },
  {
    keywords: ["organic", "usda", "certified", "certification", "non-gmo", "gmo"],
    reply:
      "🌿 *Our Certifications*\n✓ USDA Organic certified\n✓ Non-GMO verified\n✓ Lab-tested for purity\n✓ Zero additives or preservatives\n✓ 100% Vegan\nAll products meet the highest organic standards.",
  },
  {
    keywords: ["price", "cost", "cheap", "expensive", "how much"],
    reply:
      "💰 *Our Prices*\nAll products $14.99–$49.99:\n• Calendula Flowers — $19.99\n• Apricot Seeds 8oz — $17.99\n• Apricot Seeds 1lb — $29.99\n• Rose Petals — $14.99\n• Shilajit Resin — $49.99\n• + 6 more products!\n\nAll USDA Organic & lab-tested.",
    link: "/products",
  },
  {
    keywords: ["payment", "pay", "card", "visa", "paypal", "checkout"],
    reply:
      "💳 *Payment*\nWe accept all major credit/debit cards (Visa, Mastercard, Amex) via our secure Stripe checkout. 100% safe & encrypted.",
  },
  {
    keywords: ["contact", "phone", "call", "reach", "support", "help"],
    reply:
      "📞 *Contact Us*\n• Phone: 307-243-8254\n• Email: support@leadscollab.uk\n• Hours: Mon–Fri, 9AM–5PM MST\n\nOr leave your WhatsApp below and we'll reach out to you! 👇",
  },
  {
    keywords: ["wholesale", "bulk", "resell", "distributor", "large order"],
    reply:
      "🏪 *Wholesale Inquiries*\nWe'd love to work with you! For bulk/wholesale pricing, please contact:\n📧 support@leadscollab.uk\n📞 307-243-8254\nMention you're interested in wholesale and we'll get back to you within 24 hours.",
  },
  {
    keywords: ["popular", "best seller", "bestseller", "recommend", "best", "top"],
    reply:
      "⭐ *Most Popular Products*\n1. 🌼 Calendula Flowers — $19.99\n2. ⚫ Shilajit Resin — $49.99\n3. 🍑 Apricot Seeds — $17.99\n4. 🧡 Sea Buckthorn — $22.99\n\nAll USDA Organic & best sellers with 5-star reviews!",
    link: "/products",
  },
  {
    keywords: ["benefit", "health", "wellness", "good for", "what does", "why"],
    reply:
      "💚 *Why Choose Silk Savings?*\n✓ USDA Organic — highest purity\n✓ Non-GMO & lab-tested\n✓ Zero additives or fillers\n✓ Ethically sourced worldwide\n✓ Hundreds of happy customers\n\nWhat are you looking to improve — energy, digestion, skin, or immunity?",
  },
  {
    keywords: ["track", "order status", "where is", "tracking"],
    reply:
      "🔍 *Track Your Order*\nOnce your order ships, you'll receive a tracking email. If you haven't received it:\n📧 Email: support@leadscollab.uk\n📞 Phone: 307-243-8254\nHave your order number ready!",
  },
  {
    keywords: ["tea", "brew", "steep", "how to use", "use", "usage"],
    reply:
      "☕ *How To Use Our Herbs*\n1. Measure 1 tsp per 8oz of water\n2. Heat water to 195–205°F\n3. Steep 5–10 minutes covered\n4. Strain and enjoy!\n\nYou can also add honey or lemon. Which herb are you brewing?",
  },
  {
    keywords: ["vegan", "gluten", "allergen", "dairy"],
    reply:
      "✅ All Silk Savings products are:\n✓ 100% Vegan\n✓ Gluten-Free\n✓ Dairy-Free\n✓ No artificial additives\n✓ USDA Organic & Non-GMO",
  },
];

const FALLBACKS = [
  "I'm not sure about that, but I'd love to help! Could you rephrase, or choose one of the options below? 👇",
  "Great question! Let me connect you with our team — they can answer that in detail. Can I get your WhatsApp?",
  "I want to make sure you get the right answer 😊 Try asking about a specific product, shipping, or returns!",
];
let fallbackIdx = 0;

function getBotReply(input: string): { text: string; link?: string } {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return { text: entry.reply, link: entry.link };
    }
  }
  const reply = FALLBACKS[fallbackIdx % FALLBACKS.length];
  fallbackIdx++;
  return { text: reply };
}

// ── Component ──────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [leadStep, setLeadStep] = useState<LeadStep>("idle");
  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadInterest, setLeadInterest] = useState("");
  const [leadSent, setLeadSent] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-greeting after 2 seconds
  useEffect(() => {
    const t = setTimeout(() => {
      if (!greeted) {
        setGreeted(true);
        setPulse(true);
        setUnread(1);
        setMessages([
          {
            from: "bot",
            text: "Hi 👋 Welcome to Silk Savings!\nHow can I help you today? Are you looking for product info, benefits, or recommendations?",
            buttons: [
              { label: "🛍️ View Products", value: "view products" },
              { label: "❓ Ask a Question", value: "ask question" },
              { label: "💡 Product Benefits", value: "product benefits" },
              { label: "📦 Order Help", value: "order help" },
            ],
            time: now(),
          },
        ]);
      }
    }, 2000);
    return () => clearTimeout(t);
  }, [greeted]);

  // Stop pulse after 6 seconds
  useEffect(() => {
    if (pulse) {
      const t = setTimeout(() => setPulse(false), 6000);
      return () => clearTimeout(t);
    }
  }, [pulse]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const addBotMessage = (text: string, buttons?: Message["buttons"], delay = 500) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "bot", text, buttons, time: now() }]);
        resolve();
      }, delay);
    });
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const userText = text.trim();
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { from: "user", text: userText, time: now() }]);

    // Lead capture flow
    if (leadStep === "ask_name") {
      setLeadName(userText);
      setLeadStep("ask_contact");
      await addBotMessage(
        `Nice to meet you, ${userText.split(" ")[0]}! 😊\nWhat's your WhatsApp number or email so we can reach you faster?`
      );
      return;
    }

    if (leadStep === "ask_contact") {
      setLeadContact(userText);
      setLeadStep("done");

      // Send lead to backend
      try {
        await fetch("/api/chat-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: leadName, contact: userText, interest: leadInterest }),
        });
        setLeadSent(true);
      } catch (_) {}

      await addBotMessage(
        `✅ Got it, ${leadName.split(" ")[0]}! Our team will reach out to you shortly.\n\nIn the meantime, feel free to browse our products or ask me anything else! 🌿`,
        [{ label: "🛍️ Browse Products", value: "view products" }]
      );
      return;
    }

    // Quick button actions
    const lower = userText.toLowerCase();

    if (lower.includes("view products") || lower.includes("browse")) {
      await addBotMessage(
        "🌿 *Our Product Range*\nWe carry 11 premium organic products:\n\n🌼 Calendula Flowers — $19.99\n🍑 Apricot Seeds — from $17.99\n🌹 Rose Petals — $14.99\n🌿 Yarrow Herb — $19.99\n🍋 Lemon Grass — $16.99\n🌱 Rue Herb — $17.99\n🫐 Juniper Berries — $18.99\n🧡 Sea Buckthorn — $22.99\n🍃 Senna Leaves — $16.99\n⚫ Shilajit Resin — $49.99\n\nAll USDA Organic & Non-GMO ✓",
        [{ label: "🛍️ Shop Now", value: "shop" }]
      );
      return;
    }

    if (lower.includes("ask question")) {
      await addBotMessage(
        "Sure! Ask me anything about our products, shipping, returns, or certifications. I'm here to help! 😊\n\nOr pick a topic:",
        [
          { label: "📦 Shipping Info", value: "shipping" },
          { label: "↩️ Returns Policy", value: "return policy" },
          { label: "🌿 Organic Certs", value: "organic certification" },
          { label: "💰 Pricing", value: "price" },
        ]
      );
      return;
    }

    if (lower.includes("product benefits") || lower.includes("benefits")) {
      await addBotMessage(
        "💚 *Why Our Products?*\n✓ USDA Organic — purest quality\n✓ Non-GMO & lab-tested\n✓ Zero additives or fillers\n✓ Wild-harvested & ethically sourced\n✓ Hundreds of 5-star reviews\n\nWhich product's benefits would you like to know about?",
        [
          { label: "⚫ Shilajit Resin", value: "shilajit" },
          { label: "🍑 Apricot Seeds", value: "apricot seeds" },
          { label: "🌼 Calendula", value: "calendula" },
          { label: "🧡 Sea Buckthorn", value: "sea buckthorn" },
        ]
      );
      return;
    }

    if (lower.includes("order help") || lower.includes("order")) {
      await addBotMessage(
        "📦 *Order Help*\nI can help with:\n• Tracking your order\n• Returns & refunds\n• Payment questions\n• Order status\n\nFor faster support, share your order number with us:",
        [
          { label: "🔍 Track Order", value: "track order" },
          { label: "↩️ Returns", value: "return policy" },
          { label: "📞 Contact Us", value: "contact" },
        ]
      );
      return;
    }

    if (lower === "shop" || lower.includes("shop now")) {
      await addBotMessage("🛍️ Head to our shop — all products are in stock and ready to ship! ✈️");
      return;
    }

    // General keyword matching
    const { text: botText, link } = getBotReply(userText);
    const buttons: Message["buttons"] = [];

    if (link) {
      buttons.push({ label: "👉 View Product", value: `goto:${link}` });
    }

    if (!leadSent && leadStep === "idle" && Math.random() < 0.4) {
      buttons.push({ label: "📩 Get Personal Help", value: "lead_capture" });
    }

    if (!lower.includes("view products")) {
      buttons.push({ label: "🛍️ All Products", value: "view products" });
    }

    await addBotMessage(botText, buttons.length ? buttons : undefined);
  };

  const handleButton = (value: string) => {
    if (value.startsWith("goto:")) {
      window.location.href = value.replace("goto:", "");
      return;
    }
    if (value === "lead_capture") {
      setLeadStep("ask_name");
      setLeadInterest("general inquiry");
      setMessages((prev) => [
        ...prev,
        { from: "user", text: "📩 Get Personal Help", time: now() },
      ]);
      addBotMessage("Great! 👍 Can I get your name so I can help you better?");
      return;
    }
    handleSend(value);
  };

  const renderText = (text: string) =>
    text.split("\n").map((line, i) => {
      const parts = line.split(/\*([^*]+)\*/g);
      return (
        <span key={i} className="block">
          {parts.map((p, j) =>
            j % 2 === 1 ? <strong key={j}>{p}</strong> : p
          )}
        </span>
      );
    });

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#2c5530] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-[#1e3a22] hover:scale-110 ${
          pulse ? "animate-bounce" : ""
        }`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
          </svg>
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c9a227] text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[340px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          style={{ height: "480px" }}>

          {/* Header */}
          <div className="bg-[#1e3a22] px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#c9a227] flex items-center justify-center text-sm font-bold text-[#1e3a22]">SS</div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#1e3a22]" />
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold text-sm leading-tight">Silk Savings Support</div>
              <div className="text-green-300 text-xs">Online — replies instantly</div>
            </div>
            <Link href="/contact" className="text-white/60 hover:text-[#c9a227] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#f9f7f2] px-3 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 text-xs mt-10">
                Chat is starting…
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-[#2c5530] text-white rounded-br-sm"
                      : "bg-white text-gray-800 shadow-sm rounded-bl-sm border border-gray-100"
                  }`}
                >
                  {renderText(msg.text)}
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 px-1">{msg.time}</span>
                {msg.buttons && msg.from === "bot" && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5 max-w-[85%]">
                    {msg.buttons.map((btn) => (
                      <button
                        key={btn.value}
                        onClick={() => handleButton(btn.value)}
                        className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#2c5530] text-[#2c5530] font-medium hover:bg-[#e8f5e8] transition-colors shadow-sm"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-100 px-3 py-2 flex gap-2 items-center flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder={
                leadStep === "ask_name"
                  ? "Your name…"
                  : leadStep === "ask_contact"
                  ? "WhatsApp or email…"
                  : "Type a message…"
              }
              className="flex-1 text-sm bg-[#f9f7f2] border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-[#2c5530] transition-colors"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-[#2c5530] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#1e3a22] transition-colors flex-shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className="bg-white px-3 pb-2 flex-shrink-0">
            <p className="text-[10px] text-gray-400 text-center">
              Silk Savings® · <a href="mailto:support@leadscollab.uk" className="hover:text-[#2c5530]">support@leadscollab.uk</a> · 307-243-8254
            </p>
          </div>
        </div>
      )}
    </>
  );
}
