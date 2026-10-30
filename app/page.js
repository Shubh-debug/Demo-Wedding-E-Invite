"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import EnvelopeOpener from "@/components/EnvelopeOpener";
import MusicPlayer from "@/components/MusicPlayer";
import Petals from "@/components/Petals";
import Hero from "@/components/Hero";
import ScratchCountdownSection from "@/components/ScratchCountdownSection";
import Journey from "@/components/Journey";
import Gallery from "@/components/Gallery";
import EventsSection from "@/components/EventsSection";
import EventDetails from "@/components/EventDetails";
import InviteMessage from "@/components/InviteMessage";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isStoryUnlocked, setIsStoryUnlocked] = useState(false);

  // Restore states if guest already completed stages this session
  useEffect(() => {
    try {
      if (sessionStorage.getItem("invite:date_revealed") === "true") {
        setIsUnlocked(true);
      }
      if (sessionStorage.getItem("invite:story_revealed") === "true") {
        setIsStoryUnlocked(true);
      }
    } catch {}
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    try {
      sessionStorage.setItem("invite:date_revealed", "true");
    } catch {}
  };

  const handleStoryUnlock = () => {
    setIsStoryUnlocked(true);
    try {
      sessionStorage.setItem("invite:story_revealed", "true");
    } catch {}

    // Give the DOM a split second to paint the new sections, then recalibrate GSAP
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <>
      <a href="#invitation" className="skip-link">
        Skip to the invitation
      </a>

      <EnvelopeOpener />
      <MusicPlayer />
      <Petals />

      <main id="invitation" className="relative w-full">
        {/* Primary Invitation Header */}
        <Hero />

        {/* Stage 1: Scratch Card */}
        <ScratchCountdownSection onUnlock={handleUnlock} isUnlocked={isUnlocked} />

        {/* Stage 2: Our Story (Reveals after Scratch) */}
        {isUnlocked && (
          <Journey onUnlock={handleStoryUnlock} isUnlocked={isStoryUnlocked} />
        )}

        {/* Stage 3: Celebrations (available without requiring Journey completion) */}
        {isUnlocked && (
          <div id="celebrations-container" className="relative w-full">
            <Gallery />
            <EventsSection />
            <EventDetails />
            <InviteMessage />
            <Rsvp />
            <Footer />
          </div>
        )}
      </main>
    </>
  );
}