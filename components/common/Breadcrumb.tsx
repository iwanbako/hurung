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
      className="relative bg-black border-b border-zinc-800 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-3"
      >
        <ol
          className="flex items-center flex-wrap gap-1.5 text-[10px] sm:text-xs text-zinc-400"
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
                    className="hover:text-white transition-colors font-medium text-zinc-300"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? "text-white font-bold"
                        : "text-zinc-300 font-medium"
                    }
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                )}

                <meta itemProp="position" content={String(idx + 1)} />

                {!isLast && (
                  <span className="text-zinc-600 px-0.5" aria-hidden="true">
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