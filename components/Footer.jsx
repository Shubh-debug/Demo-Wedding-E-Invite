"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import siteConfig from "@/site.config";
import Reveal from "./Reveal";
import { Flourish } from "./ornaments/Motifs";

export default function Footer() {
  const { couple } = siteConfig;
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.75;
      setShowBackToTop(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    console.log(
      "%c Crafted for Aarav & Ananya's royal celebration %c #AarAnanya ✦ Udaipur 2026 ",
      "background: #121D38; color: #FBF7EE; font-size: 13px; font-weight: bold; border: 1px solid #C5A059; padding: 6px 10px; border-radius: 4px;",
      "background: #C5A059; color: #0B1325; font-size: 13px; font-weight: bold; padding: 6px 10px; border-radius: 4px;"
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative w-full overflow-hidden pb-14 pt-16 text-center select-none"
      aria-label="Wedding Footer"
    >
      <div className="relative z-10 mx-auto max-w-xl px-4">
        <Reveal reset={true}>
          <div className="flex flex-col items-center">
            {/* Sacred Gathjoda Knot */}
            <div className="relative mb-2 flex items-center justify-center">
              <div
                className="pointer-events-none absolute h-24 w-24 rounded-full bg-[#D4AF37]/10 blur-xl"
                aria-hidden="true"
              />
              <div className="relative h-20 w-24 drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] sm:h-24 sm:w-28">
                <Image
                  src="/images/Gathjoda.png"
                  alt="Sacred Gathbandhan"
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Couple Display Name */}
            <h3
              className="mt-2 text-lg font-light uppercase tracking-[0.28em] text-[#D4AF37] sm:text-xl md:text-2xl"
              style={{
                fontFamily: "'Cinzel', serif",
                textShadow: "0 0 14px rgba(212, 175, 55, 0.28)",
              }}
            >
              {couple?.displayName || "AARAV & ANANYA"}
            </h3>

            {/* Wedding Hashtag Badge */}
            <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#C5A059]/25 bg-[#FBF7EE]/5 px-3 py-0.5 text-[11px] font-medium tracking-widest text-[#F3E2B8]/90 backdrop-blur-xs">
              <span className="text-[9px] text-[#C5A059]">✦</span>
              <span>#AarAnanya</span>
              <span className="text-[9px] text-[#C5A059]">✦</span>
            </div>

            {/* Gilded Center Divider */}
            <Flourish className="mx-auto my-3.5 w-36 text-gold/75 sm:w-44" />

            {/* Date & Destination Details */}
            <p className="relative z-10 font-serif text-[11px] font-medium tracking-[0.25em] text-[#C5A059]/90 uppercase sm:text-xs">
              28 – 30 . 11 . 2026 &nbsp;•&nbsp; UDAIPUR, RAJASTHAN
            </p>

            {/* Refined Colophon Line */}
            <p className="mt-6 font-serif text-[12px] italic tracking-wider text-[#FBF7EE]/55">
              Crafted with love by Shubham❤️{" "}
              • A love that lasts forever♾️
            </p>
          </div>
        </Reveal>
      </div>

      {/* Floating "Back to Top" Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to Beginning"
        className={`group fixed bottom-5 right-5 z-30 inline-flex items-center gap-1.5 rounded-full border border-[#C5A059]/40 bg-[#0B1325]/90 px-3.5 py-2 shadow-xl backdrop-blur-md transition-all duration-500 sm:bottom-7 sm:right-7 ${
          showBackToTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        } hover:border-[#C5A059] hover:bg-[#121D38] active:scale-95`}
      >
        <span className="font-serif text-[10px] font-semibold tracking-widest text-[#C5A059] uppercase">
          Back to Top
        </span>
      </button>
    </footer>
  );
}