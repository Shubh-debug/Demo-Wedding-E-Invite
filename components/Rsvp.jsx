"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import siteConfig from "@/site.config";
import Reveal from "./Reveal";
import { Flourish, LotusMark } from "./ornaments/Motifs";

const WITTY_DODGE_LINES = [
  "Sadly, I can't make it...",
  "Aapko aana hi Padega! 😜",
  "Sangeet me thumke kaun lagayega? 💃",
  "Astrologer said NO is forbidden!",
  "Baraat bina aapke nahi niklegi! 🥁",
  "Attendance is strictly mandatory!",
];

// Coordinate offsets kept tightly inside the card bounds
const ESCAPE_ZONES = [
  { x: 75, y: -45 },
  { x: -75, y: -45 },
  { x: 80, y: 45 },
  { x: -80, y: 45 },
  { x: 0, y: 55 },
  { x: 85, y: 0 },
  { x: -85, y: 0 },
];

export default function Rsvp() {
  const { couple, rsvp } = siteConfig;
  const [accepted, setAccepted] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [wishes, setWishes] = useState("");
  const [hasStartedDodging, setHasStartedDodging] = useState(false);
  const [dodgeStep, setDodgeStep] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const playgroundRef = useRef(null);

  const handleAccept = (e) => {
    e.preventDefault();
    setAccepted(true);

    if (typeof window !== "undefined") {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#121D38", "#1B2A4E", "#C5A059", "#D4AF37", "#FBF7EE"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#121D38", "#C5A059", "#FBF7EE"],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#121D38", "#C5A059", "#FBF7EE"],
        });
      }, 250);
    }
  };

  const dodgeNoButton = () => {
    if (!playgroundRef.current) return;

    const playground = playgroundRef.current.getBoundingClientRect();
    const isMobile = playground.width < 450;
    const scaleFactor = isMobile ? 0.75 : 1.25;

    const nextStep = dodgeStep + 1;
    const targetZone = ESCAPE_ZONES[nextStep % ESCAPE_ZONES.length];

    setHasStartedDodging(true);
    setDodgeStep(nextStep);
    setNoPos({
      x: targetZone.x * scaleFactor,
      y: targetZone.y * scaleFactor,
    });
  };

  const currentNoText = WITTY_DODGE_LINES[dodgeStep % WITTY_DODGE_LINES.length];

  const sendWhatsApp = (e) => {
    e?.preventDefault();
    if (!rsvp?.whatsappNumber) return;

    // Strip out '+' and all non-numeric characters for reliable wa.me routing
    const cleanPhone = rsvp.whatsappNumber.replace(/\D/g, "");

    const trimmedName = guestName.trim();
    const trimmedWishes = wishes.trim();

    let text = "";

    if (!trimmedName && !trimmedWishes) {
      // Clean, elegant fallback when both fields are left empty
      text =
        `*Wedding RSVP — Aarav & Ananya*\n\n` +
        `Looking forward to celebrating this royal celebration with you both!`;
    } else {
      // Structured format when user fills out name and/or wishes
      text =
        `*Wedding Wishes & RSVP — ${couple.displayName}*\n\n` +
        `*From:* ${trimmedName || "A dear friend / family"}\n` +
        `*Wishes / Sangeet Song:* ${trimmedWishes || "Count me in! Looking forward to celebrating together! 🎉"}`;
    }

    const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="section relative py-12 sm:py-20" id="rsvp" aria-labelledby="rsvp-heading">
      <div className="mx-auto w-full max-w-2xl px-3 sm:px-6">
        <Reveal>
          <article className="paper gold-frame relative flex w-full flex-col overflow-hidden rounded-xl px-4 py-8 text-center shadow-[0_22px_55px_rgba(0,0,0,0.7)] sm:px-12 sm:py-14">
            
            {/* Top Sacred Motif */}
            <LotusMark className="mx-auto w-10 text-gold drop-shadow-[0_2px_4px_rgba(197,160,89,0.3)] sm:w-12" />

            <span className="eyebrow mt-3 text-[11px] tracking-widest text-[#8C6D37] uppercase">
              • The Royal Verdict •
            </span>

            {/* Headline */}
            <h2
              id="rsvp-heading"
              className="mx-auto mt-3 font-serif text-xl font-normal tracking-widest text-[#121D38] sm:text-2xl md:text-[25px]"
              style={{
                fontFamily: "'Cinzel Decorative', 'Rozha One', serif",
                letterSpacing: "0.08em",
              }}
            >
              WILL YOU CELEBRATE WITH US?
            </h2>

            <Flourish className="mx-auto my-4 w-36 text-gold/80 sm:w-48" />

            {!accepted ? (
              <div className="mx-auto w-full max-w-md pt-1">
                <p className="font-serif text-[13px] italic leading-relaxed text-ink-soft sm:text-[15px]">
                  Choose wisely... There is strictly only one acceptable answer for family &amp; friends! 😉
                </p>

                {/* The Interactive Button Stage */}
                <div
                  ref={playgroundRef}
                  className="relative mx-auto mt-6 flex min-h-[160px] w-full items-center justify-center overflow-visible sm:mt-8 sm:min-h-[170px]"
                >
                  <div className="relative flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row sm:gap-6">
                    
                    {/* The YES Button */}
                    <button
                      type="button"
                      onClick={handleAccept}
                      className="relative z-20 w-full max-w-[260px] inline-flex items-center justify-center rounded-md border border-[#C5A059] bg-gradient-to-r from-[#121D38] via-[#1B2A4E] to-[#0B1325] px-4 py-3 font-serif text-[11.5px] font-bold tracking-wider text-[#FBF7EE] shadow-[0_8px_20px_rgba(6,10,20,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 sm:w-auto sm:max-w-none sm:px-7 sm:py-3.5 sm:text-sm sm:tracking-widest"
                    >
                      HELL YES, CAN&apos;T WAIT! 🎊
                    </button>

                    {/* The NO Button */}
                    <div
                      style={
                        hasStartedDodging
                          ? {
                              position: "absolute",
                              left: "50%",
                              top: "50%",
                              transform: `translate(calc(-50% + ${noPos.x}px), calc(-50% + ${noPos.y}px))`,
                              transition: "transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
                              pointerEvents: "auto",
                              zIndex: 30,
                            }
                          : {
                              position: "relative",
                              zIndex: 20,
                              width: "100%",
                              maxWidth: "260px",
                            }
                      }
                      className="flex justify-center sm:w-auto sm:max-w-none"
                    >
                      <button
                        type="button"
                        onMouseEnter={dodgeNoButton}
                        onTouchStart={dodgeNoButton}
                        onClick={dodgeNoButton}
                        className="w-full cursor-pointer rounded-md border border-[#C5A059]/60 bg-[#FBF7EE] px-3.5 py-2.5 font-serif text-xs font-semibold tracking-wide text-ink-soft shadow-md transition-all duration-150 hover:border-[#C5A059] hover:bg-[#F7F0E3] sm:w-auto sm:px-4 sm:py-3 sm:text-[13px]"
                      >
                        {currentNoText}
                      </button>
                    </div>

                  </div>
                </div>

                {dodgeStep > 0 && (
                  <p className="mt-3 animate-fade-in font-serif text-xs italic text-[#121D38]/85">
                    {dodgeStep >= 3
                      ? "Give up! You're coming anyway! 🥳"
                      : "Look at that button running away... Take the hint! 😄"}
                  </p>
                )}
              </div>
            ) : (
              /* Success / RSVP Screen */
              <div className="mx-auto w-full max-w-md pt-2 text-center animate-fade-in">
                
                {/* Sacred Hastmelap Illustration */}
                <div className="mx-auto my-3 flex items-center justify-center">
                  <div className="relative h-16 w-32 sm:h-20 sm:w-40 transition-transform duration-300 hover:scale-105">
                    <div
                      className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#D4AF37]/15 blur-lg"
                      aria-hidden="true"
                    />
                    <Image
                      src="/images/RSVPhands.png"
                      alt="Sacred Hastmelap - Aarav & Ananya"
                      fill
                      sizes="(max-width: 640px) 128px, 160px"
                      className="object-contain select-none drop-shadow-[0_4px_12px_rgba(18,29,56,0.18)]"
                      priority
                    />
                  </div>
                </div>

                <h3 className="mt-4 font-serif text-xl font-bold tracking-wide text-[#121D38] sm:text-2xl">
                  We Knew You Wouldn&apos;t Say No!
                </h3>
                
                <p className="mt-2 font-serif text-sm leading-relaxed text-ink-soft sm:text-[14.5px]">
                  Your presence is officially locked in. Prepare your best dance moves and get ready for a memorable celebration!
                </p>

                {/* Direct Wishes Form */}
                <form onSubmit={sendWhatsApp} className="mt-6 space-y-3.5 text-left">
                  <div>
                    <label className="mb-1 block font-serif text-[11px] font-semibold uppercase tracking-wider text-[#8C6D37]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder={rsvp.namePlaceholder}
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full rounded-md border border-[#C5A059]/40 bg-[#FBF7EE] px-3.5 py-2.5 font-serif text-sm text-[#121D38] outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-serif text-[11px] font-semibold uppercase tracking-wider text-[#8C6D37]">
                      Wishes / Song for the Sangeet Night
                    </label>
                    <input
                      type="text"
                      placeholder={rsvp.messagePlaceholder}
                      value={wishes}
                      onChange={(e) => setWishes(e.target.value)}
                      className="w-full rounded-md border border-[#C5A059]/40 bg-[#FBF7EE] px-3.5 py-2.5 font-serif text-sm text-[#121D38] outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-3 w-full cursor-pointer rounded-md border border-[#C5A059] bg-gradient-to-r from-[#121D38] via-[#1B2A4E] to-[#0B1325] py-3 font-serif text-xs font-bold uppercase tracking-widest text-[#FBF7EE] shadow-md transition hover:from-[#1B2A4E] hover:via-[#121D38] hover:to-[#0B1325] active:scale-[0.99]"
                  >
                    Send Direct Wishes to the Couple 💬
                  </button>
                </form>
              </div>
            )}

          </article>
        </Reveal>
      </div>
    </section>
  );
}