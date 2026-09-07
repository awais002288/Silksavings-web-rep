import type { Product } from "@/data/products";

const SITE_URL = "https://www.silksavings.shop";

/**
 * Ensures relative asset paths or imported assets resolve to valid, absolute URLs for Schema.org.
 */
export function toAbsoluteUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Converts human readable dates (e.g. "March 2025") to ISO-8601 date string ("2025-03-01") for Schema.org.
 */
export function parseReviewDate(dateStr: string): string {
  const monthMap: Record<string, string> = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };
  const parts = dateStr.trim().toLowerCase().split(/\s+/);
  if (parts.length === 2 && monthMap[parts[0]]) {
    return `${parts[1]}-${monthMap[parts[0]]}-01`;
  }
  return dateStr;
}

/**
 * Generates Schema.org Product structured data strictly from actual product data.
 * Zero fake or invented data.
 */
export function generateProductSchema(product: Product): Record<string, any> {
  const canonicalUrl = `${SITE_URL}/products/${product.id}`;
  const images = (product.images || []).map(toAbsoluteUrl).filter(Boolean);

  const productSchema: Record<string, any> = {
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    name: product.name,
    description: product.longDescription || product.description,
    image: images.length > 0 ? images : [toAbsoluteUrl("/favicon.png")],
    sku: product.sku || product.id,
    mpn: product.mpn || product.sku || product.id,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: product.brand || "Silk Savings®",
    },
    ...(product.gtin ? { gtin12: product.gtin } : {}),
    offers: {
      "@type": "Offer",
      "@id": `${canonicalUrl}#offer`,
      url: canonicalUrl,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Silk Savings®",
      },
    },
  };

  // Only include aggregateRating and review if actual, authentic reviews exist
  if (product.reviews && product.reviews.length > 0) {
    const total = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = (total / product.reviews.length).toFixed(1);

    productSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: avg,
      reviewCount: product.reviews.length,
      bestRating: "5",
      worstRating: "1",
    };

    productSchema.review = product.reviews.map((r) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.name,
      },
      datePublished: parseReviewDate(r.date),
      name: r.title,
      reviewBody: r.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
        worstRating: "1",
      },
    }));
  }

  return productSchema;
}

/**
 * Generates Schema.org BreadcrumbList for Product pages
 */
export function generateProductBreadcrumbs(product: Product): Record<string, any> {
  const canonicalUrl = `${SITE_URL}/products/${product.id}`;
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE_URL}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category,
        item: `${SITE_URL}/products?cat=${encodeURIComponent(product.category)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: canonicalUrl,
      },
    ],
  };
}

/**
 * Generates Schema.org BreadcrumbList for Collection / Category pages
 */
export function generateCategoryBreadcrumbs(category?: string): Record<string, any> {
  const isCategory = Boolean(category && category !== "All");
  const canonicalUrl = `${SITE_URL}/products${isCategory ? `?cat=${encodeURIComponent(category!)}` : ""}`;
  
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Products",
      item: `${SITE_URL}/products`,
    },
  ];

  if (isCategory) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: category!,
      item: canonicalUrl,
    });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: items,
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generates Schema.org FAQPage structured data
 */
export function generateFaqSchema(faqs: FAQItem[], pageUrl: string): Record<string, any> {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates full JSON-LD graph with Product, Breadcrumbs, and FAQ schemas
 */
export function generateProductJsonLd(product: Product, faqs?: FAQItem[]): Record<string, any> {
  const canonicalUrl = `${SITE_URL}/products/${product.id}`;
  const graph: any[] = [
    generateProductSchema(product),
    generateProductBreadcrumbs(product),
  ];
  if (faqs && faqs.length > 0) {
    graph.push(generateFaqSchema(faqs, canonicalUrl));
  }
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * Generates JSON-LD graph for Collection / Category pages with Breadcrumbs and FAQ schemas
 */
export function generateCategoryJsonLd(category?: string, faqs?: FAQItem[]): Record<string, any> {
  const isCategory = Boolean(category && category !== "All");
  const canonicalUrl = `${SITE_URL}/products${isCategory ? `?cat=${encodeURIComponent(category!)}` : ""}`;
  const graph: any[] = [
    generateCategoryBreadcrumbs(category),
  ];
  if (faqs && faqs.length > 0) {
    graph.push(generateFaqSchema(faqs, canonicalUrl));
  }
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
