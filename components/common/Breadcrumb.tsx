// components/common/Breadcrumb.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-[#00224f] border-b border-[#0066f5]"
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-3"
      >
        <ol
          className="flex items-center flex-wrap gap-1.5 text-[10px] sm:text-xs text-blue-200"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <li
                key={idx}
                className="flex items-center gap-1.5"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-[#FEBB02] transition-colors font-medium"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? "text-[#FEBB02] font-bold"
                        : "text-blue-200 font-medium"
                    }
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                )}

                <meta itemProp="position" content={String(idx + 1)} />

                {!isLast && (
                  <span className="text-blue-400/60" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </motion.div>
    </nav>
  );
};