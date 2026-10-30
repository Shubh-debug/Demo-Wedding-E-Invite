"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const startPlayback = () => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  const toggleMusic = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      startPlayback();
    }
  };

  useEffect(() => {
    // Plays strictly when the seal is tapped and the envelope triggers this event
    const handleEnvelopeOpen = () => {
      startPlayback();
    };

    window.addEventListener("wedding:envelope-opened", handleEnvelopeOpen);

    return () => {
      window.removeEventListener("wedding:envelope-opened", handleEnvelopeOpen);
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/audio/Sunehra.mp3" loop preload="auto" />

      {/* Floating Bottom-Left Luxury Music Disc */}
      <div className="fixed bottom-5 left-5 z-40 sm:bottom-7 sm:left-7">
        <button
          onClick={toggleMusic}
          type="button"
          aria-label={isPlaying ? "Pause Background Music" : "Play Background Music"}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A059]/40 bg-[#0B1325]/90 p-2 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-[#C5A059] hover:bg-[#121D38] hover:shadow-[0_4px_16px_rgba(197,160,89,0.25)] active:scale-95"
        >
          {/* Ambient Glow Pulse When Playing */}
          {isPlaying && (
            <span
              className="pointer-events-none absolute inset-0 rounded-full border border-[#C5A059]/40 animate-ping opacity-25"
              aria-hidden="true"
            />
          )}

          {/* Equalizer Sound Waves */}
          <div className="flex h-4 w-4 items-end justify-center gap-[3px]">
            <span
              className={`w-[2.5px] rounded-full bg-[#E6CA85] transition-all duration-300 ${
                isPlaying
                  ? "h-4 animate-[wave-bounce_0.8s_ease-in-out_infinite]"
                  : "h-1.5 opacity-50"
              }`}
            />
            <span
              className={`w-[2.5px] rounded-full bg-[#E6CA85] transition-all duration-300 ${
                isPlaying
                  ? "h-2.5 animate-[wave-bounce_1.1s_ease-in-out_infinite_0.2s]"
                  : "h-3 opacity-50"
              }`}
            />
            <span
              className={`w-[2.5px] rounded-full bg-[#E6CA85] transition-all duration-300 ${
                isPlaying
                  ? "h-3.5 animate-[wave-bounce_0.9s_ease-in-out_infinite_0.4s]"
                  : "h-2 opacity-50"
              }`}
            />
          </div>

          {/* Desktop Hover Tooltip */}
          <span className="pointer-events-none absolute left-14 whitespace-nowrap rounded-md border border-[#C5A059]/30 bg-[#060A14]/95 px-2.5 py-1 font-serif text-[10px] font-semibold uppercase tracking-widest text-[#F3E2B8] opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
            {isPlaying ? "Pause Music" : "Play Sunehra"}
          </span>
        </button>
      </div>
    </>
  );
}