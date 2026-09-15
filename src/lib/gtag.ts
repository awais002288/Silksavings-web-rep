declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Fires the Google Ads conversion tracking event.
 * Conversion ID: AW-18223386571 / ru1jCLqugfUcEMufy_FD
 */
export function trackGoogleAdsConversion() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-18223386571/ru1jCLqugfUcEMufy_FD",
    });
  }
}
