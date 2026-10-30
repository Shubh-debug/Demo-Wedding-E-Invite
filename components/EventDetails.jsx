"use client";

import siteConfig from "@/site.config";
import Reveal from "./Reveal";
import { Flourish } from "./ornaments/Motifs";

export default function EventDetails() {
  const { event } = siteConfig;

  return (
    <section
      className="section relative overflow-hidden py-14 sm:py-20"
      id="venue"
      aria-labelledby="venue-heading"
    >
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-96 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C5A059]/[0.035] blur-3xl"
        aria-hidden="true"
      />

      <div className="container-card max-w-xl px-4 sm:px-6">
        <Reveal>
          <article className="paper relative flex w-full flex-col overflow-hidden rounded-2xl border border-[#C5A059]/65 bg-gradient-to-b from-[#FBF7EE] via-[#F7F0E3] to-[#EEE4D2] p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.65)] sm:p-8">
            {/* Double Gilded Inset Hairline Frame */}
            <div
              className="pointer-events-none absolute inset-2.5 rounded-xl border border-[#C5A059]/35"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-3 rounded-xl border border-[#C5A059]/15"
              aria-hidden="true"
            />

            {/* Header */}
            <div className="relative z-10 flex flex-col items-center">
              <span className="font-serif text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8C6D37] sm:text-xs">
                {event.eyebrow || "WHERE WE GATHER"}
              </span>

              <h2
                id="venue-heading"
                className="mt-2 font-display text-2xl uppercase tracking-[0.14em] text-[#121D38] sm:text-3xl"
              >
                {event.venue || "The Grand Heritage Palace & Lawns"}
              </h2>

              <p className="mt-1 font-serif text-xs italic tracking-wider text-[#334155] sm:text-sm">
                {event.city || "Udaipur, Rajasthan"}
              </p>

              <Flourish className="mx-auto my-4 w-32 text-gold/75 sm:w-40" />
            </div>

            {/* ── Vintage Cartography Styled Map Frame ── */}
            <div className="group relative z-10 my-1 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#C5A059]/60 bg-[#EEE4D2] shadow-inner">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  event.city || "City Palace, Udaipur, Rajasthan"
                )}&z=17&output=embed`}
                className="h-full w-full filter contrast-[0.92] brightness-[0.96] sepia-[0.32] saturate-[0.75] transition-all duration-300 group-hover:contrast-100 group-hover:sepia-[0.15]"
                loading="lazy"
                title={`${event.venue || "Wedding venue"} location map`}
              />

              {/* Floating Royal Navy & Gold Mask CTA - Perfectly fits and covers the Google card */}
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  absolute left-[8px] top-[8px] z-20
                  flex h-[34px] w-[130px] items-center justify-center gap-1.5
                  rounded-[5px] border border-[#C5A059]/80
                  bg-[#0B1325] px-2 py-1
                  font-serif text-[13px] font-semibold tracking-wider text-[#FBF7EE]
                  shadow-[0_2px_8px_rgba(0,0,0,0.5)]
                  transition-all duration-200
                  hover:border-[#D4AF37] hover:bg-[#121D38]
                "
              >
                <span>Open in Maps</span>
                <span className="text-[13px] text-[#C5A059]">↗</span>
              </a>
              {/* Inner Gilded Edge & Vignette Ring */}
              <div
                className="pointer-events-none absolute inset-0 rounded-xl border border-[#C5A059]/40 shadow-[inset_0_0_20px_rgba(11,19,37,0.18)]"
                aria-hidden="true"
              />
            </div>

            {/* ── Focused Travel Guidance: By Train & By Road ── */}
            <div className="relative z-10 mt-5 flex w-full flex-col gap-3 text-left">
              {/* By Train Card */}
              <div className="flex items-start gap-3 rounded-xl border border-[#C5A059]/45 bg-[#FBF7EE]/90 p-3.5 shadow-sm transition-all hover:border-[#C5A059]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C5A059]/50 bg-[#EEE4D2] text-lg shadow-xs">
                  🚆
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6D37]">
                      {event.transit?.train.label || "BY TRAIN & METRO"}
                    </span>
                    <span className="rounded-full border border-[#C5A059]/30 bg-[#0B1325]/8 px-2 py-0.5 font-serif text-[9.5px] font-semibold text-[#121D38]">
                      {event.transit?.train.badge || "Via Green Line Metro"}
                    </span>
                  </div>
                  <p className="mt-0.5 font-serif text-[13.5px] font-semibold text-[#121D38]">
                    {event.transit?.train.route || "Udaipur City Railway Station (UDZ)"}
                  </p>
                  <p className="font-serif text-xs text-[#334155]">
                    {event.transit?.train.description}
                  </p>
                </div>
              </div>

              {/* By Road Card */}
              <div className="flex items-start gap-3 rounded-xl border border-[#C5A059]/45 bg-[#FBF7EE]/90 p-3.5 shadow-sm transition-all hover:border-[#C5A059]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C5A059]/50 bg-[#EEE4D2] text-lg shadow-xs">
                  🚗
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6D37]">
                      {event.transit?.road.label || "BY ROAD & CABS"}
                    </span>
                    <span className="rounded-full border border-[#C5A059]/30 bg-[#0B1325]/8 px-2 py-0.5 font-serif text-[9.5px] font-semibold text-[#121D38]">
                      {event.transit?.road.badge || "Maharana Pratap Airport"}
                    </span>
                  </div>
                  <p className="mt-0.5 font-serif text-[13.5px] font-semibold text-[#121D38]">
                    {event.transit?.road.route || "Maharana Pratap Airport (UDR)"}
                  </p>
                  <p className="font-serif text-xs text-[#334155]">
                    {event.transit?.road.description}
                  </p>
                </div>
              </div>
            </div>

          </article>
        </Reveal>
      </div>
    </section>
  );
}