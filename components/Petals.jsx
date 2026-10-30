"use client";

import { useEffect, useState } from "react";

const ROSE_PALETTES = [
  {
    bg: "linear-gradient(135deg, #D4AF37 0%, #C5A059 60%, #8C6D37 100%)",
    fallback: "#C5A059",
    glow: "rgba(159, 18, 57, 0.35)",
  },
  {
    bg: "linear-gradient(135deg, #F3E2B8 0%, #D4AF37 60%, #8C6D37 100%)",
    fallback: "#D4AF37",
    glow: "rgba(190, 18, 60, 0.35)",
  },
  {
    bg: "linear-gradient(135deg, #FBF7EE 0%, #D4AF37 50%, #C5A059 100%)",
    fallback: "#C5A059",
    glow: "rgba(225, 29, 72, 0.3)",
  },
];

function generateRandomPetals(count, isForeground = false) {
  return Array.from({ length: count }, (_, i) => {
    // Width variation for natural scale
    const width = isForeground 
      ? 14 + Math.random() * 9 
      : 11 + Math.random() * 8;
    const height = width * (1.28 + Math.random() * 0.2);
    const theme = ROSE_PALETTES[Math.floor(Math.random() * ROSE_PALETTES.length)];

    // Foreground covers card region (12% to 88%), background covers full span (2% to 98%)
    const leftMin = isForeground ? 12 : 2;
    const leftRange = isForeground ? 76 : 96;
    const left = leftMin + Math.random() * leftRange;

    // Slow, unhurried float
    const duration = isForeground 
      ? 18 + Math.random() * 9 
      : 16 + Math.random() * 10;

    // Decoupled random delay ensures no vertical grouping or sync
    const delay = -(Math.random() * 30);

    // Wide, varied sway so paths drift diagonally and never form vertical lines
    const sway = (30 + Math.random() * 55) * (Math.random() > 0.5 ? 1 : -1);

    return {
      id: `${isForeground ? "fg" : "bg"}-${i}`,
      left,
      width,
      height,
      theme,
      duration,
      delay,
      sway,
      tiltX: (10 + Math.random() * 20) * (Math.random() > 0.5 ? 1 : -1),
      tiltY: (8 + Math.random() * 16) * (Math.random() > 0.5 ? 1 : -1),
      spinZ: (40 + Math.random() * 180) * (Math.random() > 0.5 ? 1 : -1),
      // Gentle translucency on foreground so content stays legible
      opacity: isForeground ? 0.42 + Math.random() * 0.2 : 0.65 + Math.random() * 0.25,
      blur: !isForeground && Math.random() < 0.25 ? 1.2 : 0,
    };
  });
}

export default function Petals() {
  const [bgPetals, setBgPetals] = useState([]);
  const [fgPetals, setFgPetals] = useState([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // 30 background petals, 20 foreground petals with true random coordinates
    setBgPetals(generateRandomPetals(30, false));
    setFgPetals(generateRandomPetals(20, true));
  }, []);

  const renderPetal = (p) => (
    <span
      key={p.id}
      className="absolute -top-14 animate-petal-flutter will-change-transform select-none pointer-events-none"
      style={{
        left: `${p.left}%`,
        width: `${p.width}px`,
        height: `${p.height}px`,
        filter: p.blur ? `blur(${p.blur}px)` : undefined,
        animationDelay: `${p.delay}s`,
        "--fall-duration": `${p.duration}s`,
        "--sway": `${p.sway}px`,
        "--tilt-x": `${p.tiltX}deg`,
        "--tilt-y": `${p.tiltY}deg`,
        "--spin-z": `${p.spinZ}deg`,
        "--petal-opacity": p.opacity,
      }}
    >
      <div
        className="relative h-full w-full"
        style={{
          backgroundColor: p.theme.fallback,
          backgroundImage: p.theme.bg,
          borderRadius: "15% 85% 25% 75% / 25% 75% 15% 85%",
          boxShadow: `0 3px 6px ${p.theme.glow}, inset -1px -1px 2px rgba(0,0,0,0.25), inset 1px 1px 2px rgba(255,255,255,0.3)`,
        }}
      >
        <div
          className="absolute left-1/2 top-1 h-3/5 w-[1px] -translate-x-1/2 opacity-35"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)",
          }}
        />
      </div>
    </span>
  );

  return (
    <>
      {/* Background Layer: Behind cards (z-0) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ perspective: "1000px" }}
        aria-hidden="true"
      >
        {bgPetals.map(renderPetal)}
      </div>

      {/* Foreground Layer: Over cards (z-40) */}
      <div
        className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
        style={{ perspective: "1000px" }}
        aria-hidden="true"
      >
        {fgPetals.map(renderPetal)}
      </div>
    </>
  );
}