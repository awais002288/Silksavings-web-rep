import { useSEO } from "@/hooks/useSEO";

export default function Privacy() {
  useSEO({
    title: "Privacy Policy | Silk Savings® — Organic Herbs & Seeds",
    description: "Silk Savings® privacy policy. Learn how we protect your data when you shop USDA Organic herbs, dried flowers & seeds. Your privacy matters.",
    keywords: "Silk Savings privacy, organic herbs store privacy policy, USDA organic shop data policy",
    canonical: "https://www.silksavings.shop/privacy",
  });
  return (
    <div className="min-h-screen">
      <div className="hero-gradient pt-28 pb-16 px-4 text-center">
        <div className="text-[#c9a227] text-sm tracking-widest uppercase font-semibold mb-2">Legal</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-white/70 text-lg">Last updated: January 1, 2025</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border border-gray-100">
          <div className="prose max-w-none text-gray-600 leading-relaxed space-y-8">

            <div className="bg-[#e8f5e8] border border-[#b8d8b8] rounded-2xl p-5 mb-8">
              <p className="text-[#1e3a22] text-sm font-medium">
                This Privacy Policy applies to <strong>leadscollaborate LLC</strong>, operating under the trademark <strong>Silk Savings®</strong>, located at 30 N Gould St, Sheridan, WY 82801, USA.
              </p>
            </div>

            {[
              {
                title: "1. Information We Collect",
                content: `We collect information you provide directly to us, such as when you:
• Create an account or place an order
• Contact us for customer support
• Subscribe to our email newsletter
• Fill out a contact form on our website

This may include: your name, email address, mailing address, phone number, payment information, and order history.

We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages visited.`,
              },
              {
                title: "2. How We Use Your Information",
                content: `We use the information we collect to:
• Process and fulfill your orders
• Send you order confirmations and shipping updates
• Respond to your comments, questions, and customer service requests
• Send marketing communications (with your consent)
• Analyze usage trends and improve our website and services
• Comply with legal obligations
• Prevent fraud and protect the security of our platform`,
              },
              {
                title: "3. Sharing Your Information",
                content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• Service providers who assist us in operating our website and conducting our business (e.g., payment processors, shipping carriers), subject to confidentiality agreements
• Law enforcement or government agencies when required by law
• Business partners with your consent

All third-party service providers are required to maintain the confidentiality and security of your information.`,
              },
              {
                title: "4. Cookies and Tracking Technologies",
                content: `We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors are coming from.

You can control cookies through your browser settings. However, disabling cookies may affect the functionality of certain parts of our website.`,
              },
              {
                title: "5. Data Security",
                content: `We take the security of your personal information seriously and implement industry-standard security measures to protect it from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
              },
              {
                title: "6. Your Rights",
                content: `You have the right to:
• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your information (subject to certain exceptions)
• Opt out of marketing communications at any time
• Lodge a complaint with a supervisory authority

To exercise any of these rights, please contact us at support@leadscollab.uk.`,
              },
              {
                title: "7. Children's Privacy",
                content: `Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.`,
              },
              {
                title: "8. Third-Party Links",
                content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
              },
              {
                title: "9. Changes to This Policy",
                content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website or sending you an email. Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
              },
              {
                title: "10. Contact Us",
                content: `If you have any questions or concerns about this Privacy Policy, please contact us:

leadscollaborate LLC
30 N Gould St, Sheridan, WY 82801, USA
Phone: 307-243-8254
Email: support@leadscollab.uk`,
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-[#1e3a22] mb-3">{section.title}</h2>
                <div className="whitespace-pre-line text-gray-600 text-sm leading-relaxed">{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
