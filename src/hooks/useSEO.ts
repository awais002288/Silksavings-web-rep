import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const parts = selector.match(/\[([^=]+)="([^"]+)"\]/);
    if (parts) el.setAttribute(parts[1], parts[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function useSEO({ title, description, keywords, image, canonical, noindex }: SEOProps) {
  useEffect(() => {
    document.title = title;

    // robots meta tag
    const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';
    setMeta('meta[name="robots"]', 'content', robotsContent);

    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[name="twitter:description"]', 'content', description);
    }

    if (keywords) {
      setMeta('meta[name="keywords"]', 'content', keywords);
    }

    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[property="og:site_name"]', 'content', 'Silk Savings®');
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');

    if (image) {
      setMeta('meta[property="og:image"]', 'content', image);
      setMeta('meta[name="twitter:image"]', 'content', image);
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;

      setMeta('meta[property="og:url"]', 'content', canonical);
    }
  }, [title, description, keywords, image, canonical]);
}
