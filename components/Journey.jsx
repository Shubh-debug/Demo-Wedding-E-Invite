"use client";

import { useState, useRef, useEffect } from "react";
import siteConfig from "@/site.config";
import Reveal from "./Reveal";
import { Flourish } from "./ornaments/Motifs";

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI"];
const SWIPE_THRESHOLD = 50;

export default function Journey({ onUnlock, isUnlocked }) {
  const { journey } = siteConfig;
  const milestones = journey?.milestones || journey?.chapters || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(Boolean(isUnlocked));
  const visitedRef = useRef(new Set([0]));

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [animatingDir, setAnimatingDir] = useState(null); // 'next' | 'prev' | null

  const startXRef = useRef(0);
  const isPointerDownRef = useRef(false);

  useEffect(() => {
    if (isUnlocked) setUnlocked(true);
  }, [isUnlocked]);

  const checkCompletion = (newIndex) => {
    visitedRef.current.add(newIndex);
    if (!unlocked) {
      if (newIndex === milestones.length - 1 || visitedRef.current.size >= milestones.length) {
        setUnlocked(true);
        if (typeof onUnlock === "function") {
          onUnlock();
        }
      }
    }
  };

  const handlePointerDown = (e) => {
    if (animatingDir) return;
    isPointerDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current || animatingDir) return;
    const currentX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    setDragX(currentX - startXRef.current);
  };

  const handlePointerUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    if (Math.abs(dragX) > SWIPE_THRESHOLD) {
      // Swiping Left-to-Right (dragX > 0) -> Next Chapter
      // Swiping Right-to-Left (dragX < 0) -> Previous Chapter
      const dir = dragX > 0 ? "next" : "prev";
      triggerSlide(dir);
    } else {
      setDragX(0);
    }
  };

  const triggerSlide = (dir) => {
    setAnimatingDir(dir);
    setDragX(0);

    setTimeout(() => {
      let nextIndex;
      if (dir === "next") {
        nextIndex = (currentIndex + 1) % milestones.length;
      } else {
        nextIndex = (currentIndex - 1 + milestones.length) % milestones.length;
      }
      setCurrentIndex(nextIndex);
      checkCompletion(nextIndex);
      setAnimatingDir(null);
    }, 280);
  };

  const scrollToCelebrations = () => {
    const el = document.getElementById("celebrations-container");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="section relative py-16 sm:py-20 select-none"
      id="story"
      aria-labelledby="story-heading"
    >
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-96 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C5A059]/[0.035] blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="container-card max-w-xl">
        {/* Section Header */}
        <Reveal className="mb-8 text-center">
          <span className="eyebrow tracking-widest text-[#B88A33]">
            {journey.eyebrow || "OUR STORY"}
          </span>
          <h2
            id="story-heading"
            className="mt-3 font-serif text-2xl font-light uppercase tracking-[0.22em] leading-[1.25] text-[#FBF7EE] sm:text-3xl md:text-4xl"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#FBF7EE",
              textShadow: "0 2px 14px rgba(197, 160, 89, 0.22)",
            }}
          >
            {journey.heading}
          </h2>
          <Flourish className="mx-auto mt-4 w-36 text-gold/80 sm:w-44" />
          {journey.subtitle && (
            <p className="mx-auto mt-4 max-w-md font-serif text-xs italic tracking-wide text-[#FBF7EE]/80 sm:text-sm">
              &ldquo;{journey.subtitle}&rdquo;
            </p>
          )}
        </Reveal>

        {/* ── 3D Gesture Card Deck Stage ── */}
        <div className="relative mx-auto mt-4 flex w-full flex-col items-center perspective-1000">
          <div
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            className={`relative h-[330px] w-full max-w-[430px] select-none px-3 sm:h-[340px] sm:px-0 ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ touchAction: "pan-y" }}
          >
            {milestones.map((m, idx) => {
              const offset = (idx - currentIndex + milestones.length) % milestones.length;

              let zIndex = 30 - offset * 10;
              let scale = 1 - offset * 0.05;
              let translateY = offset * 10;
              let rotate = offset === 1 ? 2.5 : offset === 2 ? -2.5 : 0;
              let opacity = offset > 2 ? 0 : 1;
              let transform = `translate3d(0, ${translateY}px, -${offset * 20}px) scale(${scale}) rotate(${rotate}deg)`;

              if (offset === 0) {
                if (isDragging) {
                  const dynamicRotate = (dragX / 22).toFixed(2);
                  transform = `translate3d(${dragX}px, 0, 30px) rotate(${dynamicRotate}deg)`;
                } else if (animatingDir === "next") {
                  transform = `translate3d(115%, 0, 35px) rotate(12deg)`;
                  opacity = 0;
                  zIndex = 40;
                } else if (animatingDir === "prev") {
                  transform = `translate3d(-115%, 0, 35px) rotate(-12deg)`;
                  opacity = 0;
                  zIndex = 40;
                }
              }

              return (
                <div
                  key={m.year + m.title}
                  style={{ zIndex, opacity, transform }}
                  className={`paper absolute inset-0 flex flex-col justify-between rounded-sm p-6 text-center shadow-card will-change-transform ${
                    isDragging && offset === 0
                      ? "transition-none"
                      : "transition-all duration-[280ms] ease-out"
                  } sm:p-8 ${offset > 2 ? "pointer-events-none hidden" : ""}`}
                >
                  <div className="pointer-events-none absolute inset-2 rounded-[2px] border border-gold/40" aria-hidden="true" />
                  <div className="pointer-events-none absolute inset-3 rounded-[2px] border border-gold/20" aria-hidden="true" />

                  {/* Wax Seal Badge */}
                  <div className="absolute -top-3.5 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#121D38] via-[#1B2A4E] to-[#0B1325] shadow-[0_3px_8px_rgba(6,10,20,0.5)] border border-[#C5A059]/60">
                    <span className="font-serif text-xs font-bold tracking-widest text-[#FBF7EE]">
                      {ROMAN_NUMERALS[idx] || idx + 1}
                    </span>
                  </div>

                  <div className="pt-2">
                    <p className="font-serif text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8C6D37] sm:text-[12px]">
                      {m.year}
                    </p>

                    <h3 className="mt-2 font-display text-xl uppercase tracking-[0.12em] text-maroon sm:text-2xl">
                      {m.title}
                    </h3>

                    <div className="mx-auto my-3 flex items-center justify-center gap-2">
                      <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
                      <span className="text-[8px] text-gold-ink">✦</span>
                      <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
                    </div>

                    <p className="mx-auto max-w-xs font-serif text-[13.5px] leading-relaxed text-ink-soft sm:max-w-sm sm:text-[14.5px]">
                      {m.text || m.description}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-gold/20 pt-2">
                    <span className="font-serif text-[9.5px] font-semibold uppercase tracking-[0.2em] text-maroon/75">
                      {idx === milestones.length - 1
                        ? "✦ Chapter Completed ✦"
                        : "Slide right to reveal next chapter →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => !animatingDir && triggerSlide("prev")}
              aria-label="Previous Chapter"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-[#FBF7EE] text-xs font-bold text-maroon shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              ←
            </button>

            <div className="flex items-center gap-3">
              {milestones.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (animatingDir) return;
                    setCurrentIndex(i);
                    checkCompletion(i);
                  }}
                  aria-label={`Go to chapter ${i + 1}`}
                >
                  <span
                    className={`block text-[10px] transition-all duration-200 ${
                      i === currentIndex
                        ? "scale-125 text-maroon font-bold"
                        : "text-gold/40 hover:text-gold"
                    }`}
                  >
                    ✦
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => !animatingDir && triggerSlide("next")}
              aria-label="Next Chapter"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 bg-[#FBF7EE] text-xs font-bold text-maroon shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              →
            </button>
          </div>

          {/* Royal Unlock Banner */}
          <div className="mt-7 flex w-full flex-col items-center px-4">
            {unlocked ? (
              <button
                type="button"
                onClick={scrollToCelebrations}
                className="group flex flex-col items-center transition-transform duration-300 hover:scale-[1.02]"
              >
                {/* Pill Badge */}
                <div className="flex items-center gap-2 rounded-full border border-gold/60 bg-[#0B1325]/85 px-4 py-1.5 shadow-card backdrop-blur-sm">
                  <span className="text-[11px] text-gold">✨</span>
                  <span className="font-serif text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#FBF7EE]">
                    Our Story Complete &bull; Festivities Unlocked
                  </span>
                  <span className="text-[11px] text-gold">✨</span>
                </div>

                {/* Expanded clearance so jump animation doesn't crowd badge */}
                <div className="mt-6 flex flex-col items-center gap-2 animate-bounce text-gold/80 sm:mt-7">
                  <span className="font-serif text-[10px] uppercase tracking-[0.22em] text-[#D4AF37]">
                    Scroll down to explore
                  </span>
                  <span className="text-xs font-bold text-gold">↓</span>
                </div>
              </button>
            ) : (
              <div className="flex items-center gap-2 rounded-full border border-gold/30 bg-[#1F0508]/70 px-4 py-1.5 shadow-inner backdrop-blur-sm">
                <span className="text-[12px] opacity-75">🔒</span>
                <span className="font-serif text-[10.5px] uppercase tracking-widest text-gold/75">
                  Swipe through all chapters to unlock ceremonies ({visitedRef.current.size}/{milestones.length})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}