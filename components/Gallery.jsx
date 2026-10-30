import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import siteConfig from "@/site.config";
import Reveal from "./Reveal";
import { Flourish } from "./ornaments/Motifs";

gsap.registerPlugin(ScrollTrigger);

// Clean, subtle alternating tilts to avoid excessive protruding edges
const CARD_TILTS = [-1.8, 2.2, -1.5, 1.8, -2.0];

export default function Gallery() {
  const { gallery } = siteConfig;
  const photos = gallery.photos || [];

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const veilsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      // 1. Initial State
      cards.forEach((card, i) => {
        gsap.set(card, {
          rotation: CARD_TILTS[i % CARD_TILTS.length],
          transformOrigin: "center center",
          y: i === 0 ? 0 : window.innerHeight * 0.85,
          scale: 1,
          opacity: i === 0 ? 1 : 0.9,
          force3D: true,
        });

        if (veilsRef.current[i]) {
          gsap.set(veilsRef.current[i], { opacity: 0 });
        }
      });

      // 2. Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${cards.length * 900}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) {
          tl.to({}, { duration: 0.4 });
          return;
        }

        const prevCard = cards[i - 1];
        const prevVeil = veilsRef.current[i - 1];

        // Animate incoming card onto the stack
        tl.to(
          card,
          {
            y: 0,
            opacity: 1,
            rotation: CARD_TILTS[i % CARD_TILTS.length],
            duration: 1,
            ease: "power2.out",
          },
          `step-${i}`
        );

        // Subtly push back and dim previous card so it doesn't distract
        if (prevCard) {
          tl.to(
            prevCard,
            {
              scale: 0.94,
              y: -8,
              duration: 1,
              ease: "power2.out",
            },
            `step-${i}`
          );
        }

        if (prevVeil) {
          tl.to(
            prevVeil,
            {
              opacity: 0.45, // Deeper veil keeps focus on the active card
              duration: 1,
              ease: "power2.out",
            },
            `step-${i}`
          );
        }

        // Rest period to appreciate current photo and caption
        tl.to({}, { duration: 0.6 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [photos]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center py-10 select-none"
      id="gallery"
      aria-labelledby="gallery-heading"
    >
      <div className="flex w-full max-w-xl flex-col items-center px-4">
        {/* Section Header */}
        <Reveal className="mb-6 text-center sm:mb-8">
          <span className="eyebrow">{gallery.eyebrow}</span>
          <h2
            id="gallery-heading"
            className="mt-3 font-serif text-2xl font-light uppercase tracking-[0.22em] leading-[1.25] text-[#FBF7EE] sm:text-3xl md:text-4xl"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#FBF7EE",
              textShadow: "0 2px 14px rgba(197, 160, 89, 0.22)",
            }}
          >
            {gallery.heading}
          </h2>
          <Flourish className="mx-auto mt-4 w-36 text-gold/80 sm:w-44" />
        </Reveal>

        {/* ── Polaroid Deck Stage ── */}
        <div className="relative mb-4 flex h-[440px] w-[290px] items-center justify-center sm:h-[500px] sm:w-[360px]">
          {photos.map((photo, i) => (
            <figure
              key={photo.src + i}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ zIndex: 10 + i }}
              className="paper absolute inset-x-0 top-0 flex flex-col p-3 pb-5 sm:p-4 sm:pb-6 will-change-transform"
            >
              {/* Dimmer Overlay for Underneath Cards */}
              <div
                ref={(el) => (veilsRef.current[i] = el)}
                className="pointer-events-none absolute inset-0 z-30 rounded-sm bg-[#060A14] opacity-0 transition-opacity"
                aria-hidden="true"
              />

              {/* Gilded Inner Accent Frame */}
              <div
                className="pointer-events-none absolute inset-2 z-10 rounded-[2px] border border-gold/30"
                aria-hidden="true"
              />

              {/* Photo Area (3:4 ratio fits portraits cleanly) */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-[#EEE4D2] ring-1 ring-black/5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.12)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt || ""}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover select-none pointer-events-none"
                />
              </div>

              {/* Polaroid Caption */}
              <figcaption className="relative z-20 mt-3 flex flex-col items-center justify-center text-center px-2">
                <span className="font-serif text-[14px] font-medium tracking-wide text-maroon italic sm:text-[16px] leading-snug">
                  &ldquo;{photo.alt}&rdquo;
                </span>
                <div className="mt-1.5 flex items-center justify-center gap-2 text-gold/60">
                  <span className="h-px w-5 bg-gradient-to-r from-transparent to-gold/50" />
                  <span className="text-[7px]">✦</span>
                  <span className="h-px w-5 bg-gradient-to-l from-transparent to-gold/50" />
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}