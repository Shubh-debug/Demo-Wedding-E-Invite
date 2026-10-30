"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import siteConfig from "@/site.config";
import PortalTransition from "./PortalTransition";

/**
 * ============================================================================
 * ENVELOPE GEOMETRY & CONSTANTS
 * ============================================================================
 */
const FLAP_LIFT = -7.333;
const FLAP_HINGE = "50% 17.333%";

const SEAL_X = 1.64;
const SEAL_Y = 18;

const LETTER_TUCKED = 8;
const LETTER_PEEK = -10;
const LETTER_OUT = -68;

const LETTER_CLIP =
  "polygon(-200% -500%, 300% -500%, 300% 99.4%, -200% 99.4%)";

const SHADOW = {
  flapClosed: "drop-shadow(0px 7px 9px rgba(11,19,37,0.22))",
  flapOpening: "drop-shadow(0px 15px 17px rgba(11,19,37,0.18))",
  flapOpen: "drop-shadow(0px 24px 24px rgba(11,19,37,0.10))",
  sealAttached: "drop-shadow(0px 5px 7px rgba(6,10,20,0.40))",
  letterInside: "drop-shadow(0px 2px 4px rgba(11,19,37,0.08))",
  letterOut: "drop-shadow(0px 12px 20px rgba(6,10,20,0.25))",
};

export default function EnvelopeOpener() {
  const { opener } = siteConfig;

  const [phase, setPhase] = useState("closed");
  const [showPortal, setShowPortal] = useState(false);
  const [portalMounted, setPortalMounted] = useState(false);

  const rootRef = useRef(null);
  const stageRef = useRef(null);

  const flapGroupRef = useRef(null);
  const flapRef = useRef(null);

  const sealRef = useRef(null);
  const sealHitRef = useRef(null);

  const letterRef = useRef(null);
  const backDropRef = useRef(null);

  const eyebrowRef = useRef(null);
  const tapRef = useRef(null);

  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      phase === "closed" || phase === "opening" ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useLayoutEffect(() => {
    if (
      !flapGroupRef.current ||
      !flapRef.current ||
      !sealRef.current ||
      !letterRef.current
    ) {
      return;
    }

    gsap.set(flapGroupRef.current, {
      yPercent: FLAP_LIFT,
      transformOrigin: FLAP_HINGE,
      transformPerspective: 1400,
      rotationX: 0,
      rotationY: 0,
      rotation: 0,
    });

    gsap.set(flapRef.current, {
      filter: SHADOW.flapClosed,
    });

    gsap.set(sealRef.current, {
      xPercent: SEAL_X,
      yPercent: SEAL_Y,
      rotation: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      opacity: 1,
      transformOrigin: "50% 50%",
      filter: SHADOW.sealAttached,
    });

    gsap.set(letterRef.current, {
      yPercent: LETTER_TUCKED,
      transformOrigin: "50% 50%",
      filter: SHADOW.letterInside,
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(stageRef.current, {
        y: -6,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(sealRef.current, {
        scale: 1.012,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const open = () => {
    if (phase !== "closed") return;

    window.dispatchEvent(new CustomEvent("invite:opened"));
    setPhase("opening");

    if (reduced.current) {
      window.dispatchEvent(new CustomEvent("wedding:envelope-opened"));
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power1.out",
        onComplete: () => {
          window.scrollTo(0, 0);
          window.dispatchEvent(new CustomEvent("wedding:hero-ready"));
          setPhase("gone");
        },
      });
      return;
    }

    gsap.killTweensOf([
      stageRef.current,
      flapGroupRef.current,
      sealRef.current,
    ]);

    setPortalMounted(true);

    const tl = gsap.timeline();

    // 0.00s: Hide instruction UI
    tl.to(
      [eyebrowRef.current, tapRef.current],
      {
        opacity: 0,
        y: 8,
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );

    // Phase 1: Tactile Seal Reaction
    tl.to(
      sealRef.current,
      {
        scale: 0.965,
        duration: 0.12,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      sealRef.current,
      {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      },
      0.12
    );

    // Phase 2: Flap Opens
    tl.to(
      flapGroupRef.current,
      {
        rotationX: -145,
        filter: SHADOW.flapOpening,
        duration: 1.45,
        ease: "power3.inOut",
      },
      0.2
    );

    tl.to(
      flapGroupRef.current,
      {
        rotationX: -151,
        filter: SHADOW.flapOpen,
        duration: 0.28,
        ease: "power1.out",
      },
      1.65
    );

    tl.set(flapGroupRef.current, { zIndex: 5 }, 1.78);

    // Phase 3: Card Slides Out Completely & Music Starts Playing
    tl.call(
      () => {
        window.dispatchEvent(new CustomEvent("wedding:envelope-opened"));
      },
      null,
      1.75
    );

    tl.to(
      letterRef.current,
      {
        yPercent: LETTER_PEEK,
        filter: SHADOW.letterOut,
        duration: 1.0,
        ease: "power2.out",
      },
      1.75
    );

    tl.to(
      letterRef.current,
      {
        yPercent: LETTER_OUT,
        duration: 0.55,
        ease: "power2.inOut",
      },
      2.75
    );

    tl.set(
      letterRef.current.parentElement,
      {
        clipPath: "none",
        overflow: "visible",
        zIndex: 40,
      },
      3.30
    );

    // Phase 4: Full Card Reading Hold
    tl.to({}, { duration: 1.5 }, 3.30);

    // Phase 5: Trigger Golden Dust Portal
    tl.call(
      () => {
        setShowPortal(true);
      },
      null,
      4.85
    );

    tl.set(
      letterRef.current.parentElement,
      {
        zIndex: 60,
      },
      4.85
    );

    // Phase 6: Smooth Paper Zoom into Camera
    tl.to(
      letterRef.current,
      {
        scale: 3.15,
        yPercent: -14,
        filter: SHADOW.letterOut,
        duration: 1.65,
        ease: "power2.inOut",
      },
      4.85
    );

    // Envelope body, flap, and backdrop fade & blur out together
    tl.to(
      [
        flapGroupRef.current,
        stageRef.current.querySelector("img.z-20"),
        backDropRef.current,
      ],
      {
        opacity: 0,
        filter: "blur(8px)",
        duration: 1.05,
        ease: "power2.out",
      },
      4.95
    );

    tl.to(
      rootRef.current,
      {
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut",
        onComplete: () => {
          window.scrollTo(0, 0);
          window.dispatchEvent(new CustomEvent("wedding:hero-ready"));
          setPhase("gone");
        },
      },
      5.55
    );
  };

  const layer =
    "pointer-events-none absolute inset-0 h-full w-full select-none object-contain";

  return (
    <>
      {phase !== "gone" && (
        <div
          ref={rootRef}
          className="
            fixed inset-0 z-[100]
            flex flex-col items-center justify-center
            gap-6 overflow-hidden
            bg-[#070B14]
            px-5 py-8
            text-center
            isolate
          "
        >
          {/* ROYAL MIDNIGHT NAVY MARBLE BACKDROP */}
          <div
            className="pointer-events-none absolute inset-0 -z-30 scale-105 filter blur-[0.5px]"
            style={{
              backgroundImage: "url('/images/Envelope/Royal Background.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
            aria-hidden="true"
          />

          {/* LIGHT SAPPHIRE OVERLAY: Keeps the blue marble tone without crushing texture */}
          <div
            className="pointer-events-none absolute inset-0 -z-20 bg-[#0B1325]/25 mix-blend-color"
            aria-hidden="true"
          />

          {/* AIRIER SPOTLIGHT VIGNETTE: Focuses the envelope while preserving background veining */}
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(11,19,37,0.15) 0%, rgba(7,11,20,0.55) 60%, rgba(4,7,14,0.88) 100%)",
            }}
            aria-hidden="true"
          />

          {/* EYEBROW INSTRUCTION: Frosted Glass Badge with Balanced Inset */}
          <div className="relative z-10 flex items-center justify-center">
            <p
              ref={eyebrowRef}
              className="
                inline-flex
                items-center
                gap-3
                sm:gap-3.5
                rounded-full
                border
                border-[#C5A059]/45
                bg-[#070B14]/45
                px-6
                py-1.5
                sm:px-7
                sm:py-2
                font-serif
                text-[11px]
                font-medium
                uppercase
                tracking-[0.24em]
                text-[#F5E6C8]
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_24px_rgba(0,0,0,0.65)]
                backdrop-blur-xl
                sm:text-xs
              "
            >
              <span className="text-[8.5px] text-[#C5A059] opacity-85 select-none">✦</span>
              <span>{opener.eyebrow}</span>
              <span className="text-[8.5px] text-[#C5A059] opacity-85 select-none">✦</span>
            </p>
          </div>

          {/* ENVELOPE STAGE */}
          <div className="relative flex flex-col items-center">
            <div
              ref={stageRef}
              className="
                relative
                aspect-[1400/900]
                w-[min(88vw,430px)]
              "
              style={{
                perspective: "1400px",
              }}
            >
              {/* Real Tabletop Cast Shadow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  bottom-[1%]
                  z-0
                  h-[14%]
                  w-[82%]
                  -translate-x-1/2
                  rounded-[50%]
                  bg-black/60
                  blur-[20px]
                  transition-opacity
                  duration-500
                "
                style={{
                  opacity: phase === "closed" ? 0.85 : 0.25,
                }}
                aria-hidden="true"
              />

              {/* ENVELOPE INNER BACK DROP */}
              <img
                ref={backDropRef}
                src="/images/Envelope/Back Drop.png"
                alt=""
                className={`${layer} z-[5]`}
                loading="eager"
                fetchPriority="high"
              />

              {/* LETTER */}
              <div
                className="absolute inset-0 z-10"
                style={{ clipPath: LETTER_CLIP }}
              >
                <img
                  ref={letterRef}
                  src="/images/Envelope/letter.png"
                  alt=""
                  className="
                    pointer-events-none
                    absolute inset-0
                    h-full w-full
                    select-none
                    object-contain
                  "
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* ENVELOPE BODY */}
              <img
                src="/images/Envelope/body.webp"
                alt=""
                className={`${layer} z-20`}
                loading="eager"
                fetchPriority="high"
              />

              {/* FLAP GROUP */}
              <div
                ref={flapGroupRef}
                className="absolute inset-0 z-30"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  ref={flapRef}
                  src="/images/Envelope/flap.webp"
                  alt=""
                  className={`${layer}`}
                  loading="eager"
                  fetchPriority="high"
                />

                <img
                  ref={sealRef}
                  src="/images/Envelope/seal.png"
                  alt=""
                  className={`${layer} z-10`}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* SEAL HIT TARGET */}
              <button
                ref={sealHitRef}
                type="button"
                aria-label={opener.tapLabel}
                onClick={(event) => {
                  event.stopPropagation();
                  open();
                }}
                className="
                  absolute
                  z-50
                  cursor-pointer
                  rounded-full
                  bg-transparent
                "
                style={{
                  left: "37%",
                  top: "53%",
                  width: "25%",
                  height: "25%",
                }}
              />
            </div>
          </div>

          {/* TAP INSTRUCTION BUTTON */}
          <button
            ref={tapRef}
            type="button"
            onClick={open}
            className="
              relative
              inline-block
              cursor-pointer
              animate-tap-pulse
              rounded-full
              border
              border-[#C5A059]/90
              bg-[#0B1325]/90
              px-6
              py-3
              font-serif
              text-[11px]
              font-semibold
              uppercase
              tracking-label
              text-[#FBF7EE]
              shadow-[0_10px_25px_rgba(0,0,0,0.7)]
              backdrop-blur-md
              transition-colors
              duration-300
              hover:border-[#D4AF37]
              hover:bg-[#121D38]
              sm:text-xs
            "
          >
            {opener.tapLabel}
          </button>
        </div>
      )}

      {/* PORTAL TRANSITION */}
      {portalMounted && (
        <PortalTransition
          active={showPortal}
          onComplete={() => {
            window.scrollTo(0, 0);
            setPhase("gone");
          }}
          onDone={() => {
            setPortalMounted(false);
          }}
        />
      )}
    </>
  );
}