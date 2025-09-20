// src/lib/gtag.ts
export const GA_MEASUREMENT_ID = "G-NPRC8MPNYD";

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};
