import type { FaqItem } from "@/types";

export interface ProvinsiPoint {
  title: string;
  description: string;
}

export interface ProvinsiContent {
  nama: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  whyUs: {
    title: string;
    subtitle: string;
    points: ProvinsiPoint[];
  };
  problemSolution: {
    title: string;
    subtitle: string;
    problems: string[];
    solutions: string[];
  };
  portfolio: {
    title: string;
    subtitle: string;
  };
  testimonial: {
    title: string;
    subtitle: string;
  };
  pricingNote?: string;
  faqs: FaqItem[];
  finalCta: {
    title: string;
    subtitle: string;
  };
}