"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Disable Safari auto scroll restore
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // 2. Reset overflow yang mungkin tertinggal dari mobile menu atau modal
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.documentElement.style.overflow = "";

    // 3. Force instant scroll (override smooth behavior sementara)
    const originalBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    const resetScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // 4. Jalankan di frame berikutnya setelah DOM selesai di-update
    requestAnimationFrame(() => {
      resetScroll();
      document.documentElement.style.scrollBehavior = originalBehavior;
      
      // 5. Fallback ekstra khusus untuk mobile Safari
      setTimeout(resetScroll, 0);
    });
  }, [pathname]);

  return null;
}