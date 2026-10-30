 "use client";

import { useEffect, useRef } from "react";
import siteConfig from "@/site.config";
import { Flourish } from "./ornaments/Motifs";

function Lines({ text, className = "" }) {
  return text.split("\n").map((line, i) => (
    <span key={i} className={`block ${className}`}>
      {line}
    </span>
  ));
}

export default function Hero() {
  const { couple, hero } = siteConfig;
  const autoScrollTimerRef = useRef(null);
  const autoScrollCancelledRef = useRef(false);

  useEffect(() => {
    const cancelAutoScroll = () => {
      autoScrollCancelledRef.current = true;
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
    };

    const startAutoScroll = () => {
      if (autoScrollCancelledRef.current) return;

      autoScrollTimerRef.current = setTimeout(() => {
        if (autoScrollCancelledRef.current) return;
        document.getElementById("scratch")?.scrollIntoView({ behavior: "smooth" });
        autoScrollTimerRef.current = null;
      }, 7000);
    };

    window.addEventListener("wedding:hero-ready", startAutoScroll);
    window.addEventListener("wheel", cancelAutoScroll, { passive: true });
    window.addEventListener("touchstart", cancelAutoScroll, { passive: true });
    window.addEventListener("scroll", cancelAutoScroll, { passive: true });

    return () => {
      window.removeEventListener("wedding:hero-ready", startAutoScroll);
      window.removeEventListener("wheel", cancelAutoScroll);
      window.removeEventListener("touchstart", cancelAutoScroll);
      window.removeEventListener("scroll", cancelAutoScroll);
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
    };
  }, []);

  return (
    <header className="relative z-10 px-2.5 pb-6 pt-3 sm:px-6 sm:pb-10 sm:pt-5">
      {/* Main invitation card: relative container without overflow-hidden */}
      <div className="paper gold-frame relative mx-auto max-w-3xl rounded-sm px-4 pb-6 pt-8 sm:px-12 sm:pb-10 sm:pt-12 md:px-16 md:pb-12 md:pt-14">

        {/* ── Top-Left Floral Bouquet Accent (Inward Anchoring) ── */}
        <img
          src="/images/Left.png"
          alt=""
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            w-[88%]
            max-w-full
            select-none
            object-contain
            object-left-top
            drop-shadow-[0_6px_16px_rgba(6,10,20,0.18)]
            sm:left-1
            sm:top-1
            sm:w-[78%]
            md:left-1.5
            md:top-1.5
            md:w-[74%]
            md:max-w-[760px]
          "
          loading="eager"
        />

        {/* ── Top-Right Floral Bouquet Accent (Inward Anchoring) ── */}
        <img
        src="/images/Right.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-10
          w-[88%]
          max-w-full
          select-none
          object-contain
          object-right-top
          drop-shadow-[0_6px_16px_rgba(6,10,20,0.18)]
          sm:right-1
          sm:top-1
          sm:w-[78%]
          md:right-1.5
          md:top-1.5
          md:w-[74%]
          md:max-w-[760px]
        "
        loading="eager"
      />

        {/* ── Central Content ── */}
        <div className="relative z-20 mx-auto max-w-xl text-center">

          {/* 1. Auspicious Ganesh Ji Emblem */}
          <div className="mx-auto flex flex-col items-center">
            <div className="relative flex items-center justify-center rounded-full border border-gold/45 bg-[#FBF7EE] p-1 shadow-[0_4px_14px_rgba(6,10,20,0.12)] sm:p-1.5">
              <div
                className="pointer-events-none absolute inset-0.5 rounded-full border border-gold/25 sm:inset-1"
                aria-hidden="true"
              />
              <img
                src="/images/Ganesh-lotus 1.png"
                alt="Lord Ganesha"
                className="relative z-10 h-16 w-16 rounded-full object-contain sm:h-22 sm:w-22 md:h-24 md:w-24"
                loading="eager"
              />
            </div>
          </div>

          {/* 2. Mangal Inscription */}
          <p
            lang="hi"
            className="mt-3 font-serif text-[18px] font-bold leading-tight tracking-normal text-[#C5A059] sm:mt-3.5 sm:text-2xl"
          >
            {hero.mangalText}
          </p>

          {/* 3. Ganesh Shlok */}
          <p
            lang="hi"
            className="mx-auto mt-2 max-w-md font-serif text-[11px] leading-relaxed tracking-normal text-[#C5A059] sm:text-[13px] md:text-[13.5px]"
          >
            <Lines text={hero.shlok} />
          </p>

          {/* 4. Elder Blessings */}
          <p className="mx-auto mt-3 max-w-lg font-serif text-[10px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#8C6D37] sm:mt-4 sm:text-[11.5px] sm:tracking-[0.20em]">
            <Lines text={hero.blessing} />
          </p>

          <Flourish className="mx-auto mt-2.5 w-24 text-gold/75 sm:mt-3.5 sm:w-36 md:w-40" />

          {/* 5. Formal Invitation Verse */}
          <p className="mx-auto mt-3 max-w-lg font-serif text-[10px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-maroon-deep sm:mt-4 sm:text-xs sm:tracking-[0.22em]">
            <Lines text={hero.inviteLine} />
          </p>

          {/* 6. Couple's Names & Lineage */}
          <div className="mt-4 sm:mt-6">
            <h1 className="sr-only">
              {couple.partner1} {hero.joiner} {couple.partner2}
            </h1>

            {/* Groom */}
            <div className="flex flex-col items-center">
              <p
                aria-hidden="true"
                className="font-display text-[38px] font-normal uppercase leading-none tracking-[0.08em] text-[#121D38] drop-shadow-sm sm:text-[60px] sm:tracking-[0.14em] md:text-[66px]"
              >
                {couple.partner1}
              </p>

              {/* Groom's Lineage Hierarchy */}
              <div className="mt-2 flex flex-col items-center gap-0.5 font-serif uppercase leading-relaxed tracking-[0.14em] sm:tracking-[0.16em]">
                <p className="text-[10.5px] font-medium text-[#2D3748] sm:text-xs">
                  S/O Smt. Sunita &amp; Shri Vikram Singhania
                </p>
                <p className="text-[10.5px] font-medium text-[#334155] sm:text-xs">
                  G/S/O Smt. Kamini &amp; Shri Harish Singhania
                </p>
                {/* <p className="text-[10.5px] font-medium text-[#2D3748] sm:text-xs">
                  Brother of ********* 
                </p> */}
              </div>
            </div>

            {/* Elegant "and" Divider */}
            <div
              className="my-2.5 flex items-center justify-center gap-3 sm:my-3.5 sm:gap-4"
              aria-hidden="true"
            >
              <span className="h-px max-w-[50px] flex-1 bg-gradient-to-r from-transparent via-gold-rule to-gold-rule sm:max-w-[80px]" />
              <span className="font-serif text-xl italic text-gold-deep sm:text-3xl">
                {hero.joiner}
              </span>
              <span className="h-px max-w-[50px] flex-1 bg-gradient-to-l from-transparent via-gold-rule to-gold-rule sm:max-w-[80px]" />
            </div>

            {/* Bride */}
            <div className="flex flex-col items-center">
              <p
                aria-hidden="true"
                className="font-display text-[38px] font-normal uppercase leading-none tracking-[0.08em] text-[#121D38] drop-shadow-sm sm:text-[60px] sm:tracking-[0.14em] md:text-[66px]"
              >
                {couple.partner2}
              </p>

              {/* Bride's Lineage Hierarchy */}
              <div className="mt-2 flex flex-col items-center gap-0.5 font-serif uppercase leading-relaxed tracking-[0.14em] sm:tracking-[0.16em]">
                <p className="text-[10.5px] font-medium text-[#2D3748] sm:text-xs">
                  D/O Smt. Radhika &amp; Shri Rajeshwari Mittal
                </p>
                <p className="text-[10.5px] font-medium text-[#334155] sm:text-xs">
                  G/D/O Smt. Meera &amp; Shri Mohan Mittal
                </p>
                {/* <p className="text-[10.5px] font-medium text-[#2D3748] sm:text-xs">
                  Sister of ****
                </p> */}
              </div>
            </div>

          </div>

          {/* 7. Traditional Calligraphic Couplet */}
          <div className="mx-auto my-3.5 max-w-sm text-center sm:my-5">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/70 sm:w-10" />
              <span className="text-[8px] text-gold-ink sm:text-[9px]">✦</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/70 sm:w-10" />
            </div>

            <p className="mx-auto my-1.5 px-3 font-serif text-[11.5px] italic leading-relaxed tracking-wide text-ink-soft sm:my-2 sm:text-[13px]">
              &ldquo;{hero.sacredVerse}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/70 sm:w-10" />
              <span className="text-[8px] text-gold-ink sm:text-[9px]">✦</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/70 sm:w-10" />
            </div>
          </div>

          {/* 8. Unified Royal Tableau (Elephants + Kalash on Shared Baseline) */}
          <div className="relative mt-2 flex items-end justify-between px-0 sm:mt-4 sm:justify-center sm:gap-6 md:gap-10">
            
            {/* Left Elephant */}
            <div className="pointer-events-none flex flex-col items-center">
              <img
                src="/images/Left Elephant.png"
                alt=""
                className="h-20 w-auto object-contain drop-shadow-[0_4px_12px_rgba(70,30,15,0.12)] sm:h-28 md:h-36"
                aria-hidden="true"
              />
              <div
                className="-mt-2.5 h-2 w-16 rounded-[50%] bg-[#0B1325]/25 blur-[3px] sm:-mt-3.5 sm:h-3 sm:w-24 md:w-32"
                aria-hidden="true"
              />
            </div>

            {/* Center Grounded Kalash */}
            <div className="relative z-10 mx-1 flex flex-col items-center sm:mx-0">
              <img
                src="/images/Kalash.png"
                alt="Auspicious Kalash"
                className="relative z-10 h-28 w-auto object-contain sm:h-36 md:h-44"
                loading="lazy"
              />
              <div
                className="pointer-events-none -mt-3.5 h-3 w-20 rounded-[50%] bg-[#060A14]/40 blur-[3px] sm:-mt-4 sm:h-3.5 sm:w-28 md:w-36"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none -mt-2 h-4 w-28 rounded-[50%] bg-[#0B1325]/20 blur-[6px] sm:h-5 sm:w-36 md:w-44"
                aria-hidden="true"
              />
            </div>

            {/* Right Elephant */}
            <div className="pointer-events-none flex flex-col items-center">
              <img
                src="/images/Right Elephant.png"
                alt=""
                className="h-20 w-auto object-contain drop-shadow-[0_4px_12px_rgba(70,30,15,0.12)] sm:h-28 md:h-36"
                aria-hidden="true"
              />
              <div
                className="-mt-2.5 h-2 w-16 rounded-[50%] bg-[#5A230B]/25 blur-[3px] sm:-mt-3.5 sm:h-3 sm:w-24 md:w-32"
                aria-hidden="true"
              />
            </div>

          </div>

          {/* Auspicious Teaser Line */}
          <p className="mt-3.5 px-2 font-serif text-[9.5px] font-bold uppercase leading-relaxed tracking-[0.18em] text-gold-ink sm:mt-4 sm:text-[11px] sm:tracking-[0.24em]">
            {hero.teaserLabel}
          </p>

        </div>

        {/* 9. Minimalist Royal Scroll Cue */}
        <div className="relative z-20 mt-4 flex flex-col items-center pb-1 text-gold-ink sm:mt-6">
          <span className="px-2 text-center font-serif text-[8.5px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-maroon/80 sm:text-[10px] sm:tracking-[0.22em]">
            {hero.scrollLabel}
          </span>

          <span
            className="mt-1 inline-block animate-[hero-scroll_1.8s_ease-in-out_infinite] text-xs font-bold text-gold-ink motion-reduce:animate-none sm:text-sm"
            aria-hidden="true"
          >
            ↓
          </span>
        </div>

      </div>
    </header>
  );
}