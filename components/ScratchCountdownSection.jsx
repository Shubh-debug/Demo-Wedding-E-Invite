"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import siteConfig from "@/site.config";
import Reveal from "./Reveal";
import fireConfetti from "./confetti";
import { Flourish } from "./ornaments/Motifs";

function remaining(targetMs) {
  const diff = targetMs - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

export default function ScratchCountdownSection({ onUnlock, isUnlocked }) {
  const { scratch, countdown, event } = siteConfig;

  const [cleared, setCleared] = useState(isUnlocked);
  const [time, setTime] = useState(null);
  const [mounted, setMounted] = useState(false);

  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const headerRef = useRef(null);
  const dateCardRef = useRef(null);
  const countdownWrapRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const drawing = useRef(false);
  const scratchedOnce = useRef(false);
  const lastPointRef = useRef(null);

  // Countdown timer logic
  useEffect(() => {
    const target = new Date(event.startISO).getTime();
    setTime(remaining(target));
    setMounted(true);
    const id = setInterval(() => setTime(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [event.startISO]);

  // Luxury Scratch Canvas: Embossed Antique Gold + Diamond Jaali Pattern
  useEffect(() => {
    if (cleared) return;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = stage.getBoundingClientRect();
      if (!width || !height) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Base Rich Gold Foil Gradient
      const goldGrad = ctx.createLinearGradient(0, 0, width, height);
      goldGrad.addColorStop(0.0, "#9E782F");
      goldGrad.addColorStop(0.18, "#D8B868");
      goldGrad.addColorStop(0.38, "#F7E8C6");
      goldGrad.addColorStop(0.58, "#C59B3F");
      goldGrad.addColorStop(0.82, "#E6CB87");
      goldGrad.addColorStop(1.0, "#8C6824");
      ctx.fillStyle = goldGrad;
      ctx.fillRect(0, 0, width, height);

      // Delicate Royal Jaali / Lattice Motif Overlay
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = 1;
      const step = Math.max(16, Math.round(width / 24));
      for (let x = -height; x < width + height; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x + height, 0);
        ctx.stroke();
      }
      ctx.restore();

      // Soft Specular Sheen across the foil
      const sheen = ctx.createLinearGradient(0, 0, width, height);
      sheen.addColorStop(0.3, "rgba(255, 255, 255, 0)");
      sheen.addColorStop(0.48, "rgba(255, 255, 255, 0.38)");
      sheen.addColorStop(0.66, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, width, height);

      // Proportional Inset Dashed Border
      const insetX = Math.round(width * 0.05);
      const insetY = Math.round(height * 0.065);
      ctx.save();
      ctx.strokeStyle = "rgba(110, 25, 30, 0.42)";
      ctx.lineWidth = 1.4;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(insetX, insetY, width - insetX * 2, height - insetY * 2);
      ctx.restore();

      // Responsive CTA Text
      const fontSize = Math.max(11, Math.min(14.5, Math.round(width * 0.038)));
      ctx.save();
      ctx.font = `600 ${fontSize}px "Cinzel", "Cormorant Garamond", Georgia, serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "0.18em";
      ctx.fillStyle = "#121D38";
      ctx.shadowColor = "rgba(255, 245, 220, 0.45)";
      ctx.shadowOffsetY = 1;
      ctx.fillText("✦  SCRATCH TO REVEAL THE DATE  ✦", width / 2, height / 2);
      ctx.restore();
    };

    paint();
    const ro = new ResizeObserver(() => {
      if (!scratchedOnce.current) paint();
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, [scratch.coverText, cleared]);

  // Continuous Smooth Brush Erase
  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = canvas.width / rect.width;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const currentX = (clientX - rect.left) * dpr;
    const currentY = (clientY - rect.top) * dpr;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 36 * dpr;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(currentX, currentY, 18 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    lastPointRef.current = { x: currentX, y: currentY };
    scratchedOnce.current = true;
  };

  const celebrate = useCallback(() => {
    if (cleared) return;
    setCleared(true);
    if (typeof onUnlock === "function") {
      onUnlock();
    }

    fireConfetti();

    const tl = gsap.timeline();

    if (canvasRef.current) {
      tl.to(canvasRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (headerRef.current) {
      tl.to(headerRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (headerRef.current) {
            gsap.set(headerRef.current, { y: 8 });
          }
        },
      });

      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      });
    }

    if (dateCardRef.current) {
      tl.fromTo(
        dateCardRef.current,
        { scale: 0.96, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.2)" },
        "-=0.35"
      );
    }

    if (countdownWrapRef.current) {
      tl.fromTo(
        countdownWrapRef.current,
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      );
    }

    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.1"
      );
    }
  }, [cleared, onUnlock]);

  const checkProgress = () => {
    if (cleared) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const { width, height } = canvas;
    const step = 14;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clearedPx = 0;
    let total = 0;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        total += 1;
        if (data[(y * width + x) * 4 + 3] < 35) clearedPx += 1;
      }
    }

    // Auto-reveal when 36% of the canvas has been scratched
    if (clearedPx / total > 0.36) celebrate();
  };

  const onPointerDown = (e) => {
    drawing.current = true;
    lastPointRef.current = null;
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch (_) {}
    scratchAt(e.clientX, e.clientY);
  };

  const onPointerMove = (e) => {
    if (!drawing.current) return;
    scratchAt(e.clientX, e.clientY);
  };

  const onPointerUp = (e) => {
    if (!drawing.current) return;
    drawing.current = false;
    lastPointRef.current = null;
    try {
      if (e.target.hasPointerCapture(e.pointerId)) {
        e.target.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
    checkProgress();
  };

  const cells = [
    { label: "DAYS", value: time?.days },
    { label: "HOURS", value: time?.hours },
    { label: "MINUTES", value: time?.minutes },
    { label: "SECONDS", value: time?.seconds },
  ];

  return (
    <section className="section scroll-mt-6" id="save-the-date" aria-labelledby="scratch-heading">
      <div className="container-card max-w-[820px] px-4 sm:px-6">
        {/* Dynamic Section Heading */}
        <div ref={headerRef} className="mb-8 text-center transition-all duration-300">
          <span className="eyebrow tracking-widest text-[#9C752B]">
            {cleared ? countdown.eyebrow : scratch.eyebrow}
          </span>
          <h2
            id="scratch-heading"
            className="mt-3 font-serif text-xl font-light uppercase tracking-[0.24em] leading-[1.25] text-[#FBF7EE] sm:text-2xl md:text-3xl"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#FBF7EE",
              textShadow: "0 2px 14px rgba(197, 160, 89, 0.22)",
            }}
          >
            {cleared ? countdown.heading : scratch.heading}
          </h2>
          <Flourish className="mx-auto mt-4 w-36 text-gold/80 sm:w-44" />
        </div>

        <Reveal delay={100}>
          {/* Main Card Container aligned with global .paper */}
          <div className="paper relative overflow-hidden rounded-sm p-4 sm:p-6">
            {/* Concentric Double Gold Frame */}
            <div
              className="pointer-events-none absolute inset-2 rounded-sm border border-[#D8BC7E]/70 sm:inset-3"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-3 rounded-sm border border-[#D8BC7E]/35 sm:inset-4"
              aria-hidden="true"
            />

            {/* Content Area */}
            <div className="relative z-10 p-2 sm:p-4">
              {/* Scratch / Date Stage Container with Responsive Aspect Ratio */}
              <div
                className="scratch-stage relative aspect-[4/3] w-full min-h-[220px] max-h-[380px] overflow-hidden rounded-sm border border-[#D8BC7E]/60 sm:aspect-[16/9]"
                  style={{
                    backgroundColor: "#F7F0E3",
                  boxShadow: "inset 0 2px 6px rgba(70, 25, 15, 0.08)",
                }}
                ref={stageRef}
              >
                {/* Thin Inner Gold Accent Border */}
                <div
                  className="pointer-events-none absolute inset-1.5 z-10 rounded-sm border border-[#D8BC7E]/45"
                  aria-hidden="true"
                />

                {/* Revealed Invitation Date */}
                <div
                  ref={dateCardRef}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-6 text-center"
                  style={{
                    backgroundColor: "#FBF7EE",
                  }}
                >
                  <div className="inline-block rounded-full border border-gold/50 bg-[#FBF7EE]/90 px-3.5 py-0.5 text-[10.5px] font-serif uppercase tracking-widest text-maroon shadow-sm">
                    Auspicious Date Revealed
                  </div>
                  <p className="font-display text-2xl uppercase tracking-name text-maroon sm:text-3xl">
                    {scratch.revealTitle}
                  </p>
                  <p className="font-display text-xl font-semibold text-maroon-deep sm:text-2xl">
                    {scratch.revealDate}
                  </p>
                  <p className="body-copy text-xs text-[#334155]">{scratch.revealDay}</p>
                </div>

                {/* Scratch Foil Layer */}
                {!cleared && (
                  <canvas
                    ref={canvasRef}
                    className="scratch-canvas absolute inset-0 z-20 h-full w-full cursor-crosshair touch-none select-none transition-opacity duration-300"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    onPointerLeave={onPointerUp}
                    aria-label="Interactive scratch card to reveal the wedding date"
                  />
                )}
              </div>

              {/* Accessible Reveal Button */}
              {!cleared && (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={celebrate}
                    className="font-serif text-xs font-semibold uppercase tracking-widest text-[#121D38] underline decoration-[#C5A059] decoration-dotted underline-offset-4 transition-colors hover:text-[#1B2A4E] hover:decoration-solid"
                  >
                    Reveal the date directly
                  </button>
                </div>
              )}

              {/* Countdown Display: Royal Maroon Tiles */}
              {cleared && (
                <div ref={countdownWrapRef} className="mt-7">
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <span className="h-[1px] w-12 bg-[#D8BC7E]/60" />
                    <span className="font-serif text-[11px] font-medium uppercase tracking-widest text-[#967432]">
                      Time Left Until Celebrations
                    </span>
                    <span className="h-[1px] w-12 bg-[#D8BC7E]/60" />
                  </div>

                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4" aria-label="Countdown to wedding">
                    {cells.map((cell) => (
                      <li
                        key={cell.label}
                        className="relative overflow-hidden rounded-sm border border-[#D4AF63]/50 px-3 py-4 text-center transition-transform duration-300 hover:-translate-y-0.5 sm:py-5"
                        style={{
                          background: "linear-gradient(145deg, #121D38 0%, #0B1325 100%)",
                          boxShadow:
                            "0 8px 20px -4px rgba(60, 10, 15, 0.4), inset 0 1px 0px rgba(255, 235, 175, 0.3)",
                        }}
                      >
                        {/* Inner Gold Hairline Frame */}
                        <div
                          className="pointer-events-none absolute inset-1 rounded-[2px] border border-[#D4AF63]/25"
                          aria-hidden="true"
                        />

                        {/* Digital Value */}
                        <div
                          className="relative z-10 font-display text-3xl font-normal leading-none tracking-tight sm:text-4xl"
                          style={{
                            color: "#F3E2B8",
                            textShadow: "0 1px 2px rgba(0, 0, 0, 0.4)",
                          }}
                        >
                          {mounted && cell.value !== undefined
                            ? String(cell.value).padStart(2, "0")
                            : "--"}
                        </div>

                        {/* High-Luminance Subtext */}
                        <div className="relative z-10 mt-2 font-serif text-[10px] font-bold uppercase tracking-[0.22em] text-[#F3E5C8]">
                          {cell.label}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Scroll Down Cue */}
                  <div
                    ref={scrollIndicatorRef}
                    className="mt-6 flex flex-col items-center animate-bounce text-[#967432]"
                  >
                    <span className="font-serif text-[11px] uppercase tracking-widest text-maroon/80">
                      Scroll down to explore the celebration
                    </span>
                    <span className="text-sm font-semibold">↓</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}