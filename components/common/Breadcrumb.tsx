import React from "react";
import Link from "next/link";

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
      className="relative bg-white border-b border-slate-200 overflow-hidden shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <ol
          className="flex items-center flex-wrap gap-1.5 text-[10px] sm:text-xs text-slate-500"
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
                    className="hover:text-red-600 transition-colors font-medium text-slate-600"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? "text-slate-900 font-bold"
                        : "text-slate-600 font-medium"
                    }
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                )}

                <meta itemProp="position" content={String(idx + 1)} />

                {!isLast && (
                  <span className="text-slate-400 px-0.5" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};