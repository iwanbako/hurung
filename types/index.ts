export interface NavLink {
  href: string;
  label: string;
}

export interface PricingPackage {
  name: string;
  target: string;
  priceNormal: string;
  pricePromo: string;
  diskon: string;
  periode: string;
  popular: boolean;
  badge: string | null;
  features: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  text: string;
  initial?: string;
}