"use client";

import siteConfig from "@/site.config";
import Reveal from "./Reveal";
import { Flourish } from "./ornaments/Motifs";

function downloadEventICS(event, coupleName) {
  const eventTitle = `${event.title || event.name} - ${coupleName || "Aarav & Ananya"} Wedding`;
  const calStart = event.startDateISO;
  const calEnd = event.endDateISO;
  const description = `${event.tagline || ""}\\nDress Code: ${event.dressCode || ""}`;
  const location = event.venue || "";

  const icsData = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AaravAndAnanya//Demo Wedding Invite//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${eventTitle}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${calStart}`,
    `DTEND:${calEnd}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${(event.title || event.name || "wedding-event").toLowerCase().replace(/\s+/g, "-")}.ics`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function EventsSection() {
  const { events, couple } = siteConfig;
  const eventList = events.items || events || [];
  const coupleDisplayName = couple?.displayName || "Aarav & Ananya";

  const handleCalendarClick = (e, ev) => {
    // Check if user is on iOS / macOS Safari to trigger native .ics calendar subscription
    const isApple =
      typeof navigator !== "undefined" &&
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document));

    if (isApple) {
      e.preventDefault();
      downloadEventICS(ev, coupleDisplayName);
    }
  };

  return (
    <section
      className="section relative py-12 sm:py-20"
      id="events"
      aria-labelledby="events-heading"
    >
      <div className="container-card max-w-xl px-4 sm:px-6">
        {/* Section Header — Re-triggers every time user scrolls past */}
        <Reveal reset={true} className="mb-12 text-center">
          <span className="eyebrow tracking-widest text-[#B88A33]">
            {events.eyebrow || "SHUBH KAARYAKRAM"}
          </span>
          <h2
            id="events-heading"
            className="mt-3 font-serif text-2xl font-light uppercase tracking-[0.24em] leading-[1.25] text-[#FBF7EE] sm:text-3xl md:text-4xl"
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#FBF7EE",
              textShadow: "0 2px 14px rgba(197, 160, 89, 0.22)",
            }}
          >
            {events.heading || "The Celebration Events"}
          </h2>
          <Flourish className="mx-auto mt-3 w-32 text-gold/80 sm:w-40" />
          {events.subtitle && (
            <p className="mx-auto mt-2.5 max-w-md font-serif text-xs italic tracking-wide text-[#FBF7EE]/80 sm:text-sm">
              &ldquo;{events.subtitle}&rdquo;
            </p>
          )}
        </Reveal>

        {/* ── Single-Column Royal Scroll Cascade ── */}
        <div className="relative flex flex-col items-center gap-14 sm:gap-18">
          {eventList.map((ev, i) => {
            const eventTitle = ev.title || ev.name;
            const hasDirections = Boolean(ev.showDirections);
            const hasCalendar = ev.showCalendar !== false;

            const mapUrl = ev.mapUrl || siteConfig.event.mapsUrl;

            const calStart = ev.startDateISO;
            const calEnd = ev.endDateISO;
            const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
              `${eventTitle} - ${coupleDisplayName} Wedding`
            )}&dates=${calStart}/${calEnd}&details=${encodeURIComponent(
              `${ev.tagline || ""}\nDress Code: ${ev.dressCode || ""}`
            )}&location=${encodeURIComponent(ev.venue || "")}`;

            return (
              <div key={eventTitle + i} className="group relative flex w-full flex-col items-center">
                {/* Each card re-animates smoothly whenever it scrolls back into view */}
                <Reveal delay={40} reset={true} className="w-full">
                  <article className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-[#C5A059]/55 bg-[#0B1325] shadow-[0_16px_40px_rgba(0,0,0,0.65)] transition-all duration-500 hover:border-gold">
                    
                    {/* ── 1. Poster Artwork (Framed Masterpiece) ── */}
                    <div className="relative aspect-[9/13] w-full overflow-hidden bg-[#060A14]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ev.poster}
                        alt={eventTitle}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      {/* Inner gold framing line */}
                      <div className="pointer-events-none absolute inset-0 border border-gold/30 shadow-inner" />
                    </div>

                    {/* ── 2. Antique Gilded Farman Divider Bar ── */}
                    <div className="relative z-20 flex h-3 w-full items-center justify-center bg-gradient-to-r from-[#8C6D37] via-[#F3E2B8] to-[#8C6D37] shadow-md">
                      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#121D38]/40 to-transparent" />
                      <span className="absolute text-[8px] text-[#121D38]">✦</span>
                    </div>

                    {/* ── 3. Integrated Heritage Parchment Slip (Venue & Dress Code) ── */}
                    <div className="relative flex w-full flex-col items-center bg-gradient-to-b from-[#FBF7EE] via-[#F7F0E3] to-[#EEE4D2] px-5 py-5 text-center sm:px-7 sm:py-6">
                      {/* Delicate Parchment Inset Frame */}
                      <div className="pointer-events-none absolute inset-2.5 rounded-lg border border-[#B88A33]/35" aria-hidden="true" />

                      <div className="relative z-10 flex w-full flex-col items-center">
                        {/* Tagline */}
                        {ev.tagline && (
                          <p className="max-w-md font-serif text-[13px] italic leading-snug text-[#2D3748] sm:text-[14px]">
                            &ldquo;{ev.tagline}&rdquo;
                          </p>
                        )}

                        {/* Venue & Time Duo Panel */}
                        <div className="mt-3.5 grid w-full max-w-md grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-stretch gap-2 sm:gap-3">
                          {/* Venue Panel */}
                          <div className="flex h-full min-h-[68px] min-w-0 w-full flex-col justify-center rounded-lg border border-[#C5A059]/40 bg-[#FBF7EE]/80 p-2.5 text-left shadow-xs">
                            <span className="font-serif text-[9px] font-bold uppercase tracking-wider text-[#8C6D37]">
                              Venue
                            </span>
                            <p
                              className="mt-0.5 min-w-0 font-serif text-[11px] font-semibold leading-tight text-maroon sm:text-[12px]"
                              title={ev.venue}
                            >
                              📍 {ev.venue}
                            </p>
                          </div>

                          {/* Time Panel */}
                          <div className="flex h-full min-h-[68px] min-w-0 w-full flex-col justify-center rounded-lg border border-[#C5A059]/40 bg-[#FBF7EE]/80 p-2.5 text-left shadow-xs">
                            <span className="font-serif text-[9px] font-bold uppercase tracking-wider text-[#8C6D37]">
                              TIME
                            </span>
                            <p className="mt-0.5 min-w-0 whitespace-nowrap font-serif text-[11px] font-semibold leading-tight text-maroon sm:text-[12px]">
                              {ev.time}
                            </p>
                          </div>

                          {/* Dress Code Panel */}
                          {ev.dressCode && (
                            <div className="col-span-2 flex flex-col justify-center rounded-lg border border-[#C5A059]/40 bg-[#FBF7EE]/80 p-2.5 text-left shadow-xs">
                              <span className="font-serif text-[9px] font-bold uppercase tracking-wider text-[#8C6D37]">
                                Dress Code
                              </span>
                              <p className="mt-0.5 font-serif text-[12px] font-bold tracking-wide text-maroon-deep sm:text-[12.5px]">
                                {ev.dressCode}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* ── Action Buttons ── */}
                        {(hasDirections || hasCalendar) && (
                          <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-2.5 border-t border-[#C5A059]/30 pt-3">
                            {hasDirections && (
                              <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-full border border-[#C5A059] bg-gradient-to-r from-[#121D38] to-[#0B1325] px-4 py-1.5 font-serif text-[10.5px] font-semibold uppercase tracking-wider text-[#FBF7EE] shadow-md transition-all duration-200 hover:scale-105 hover:from-[#1B2A4E] hover:to-[#0B1325] active:scale-95"
                              >
                                📍 Get Directions
                              </a>
                            )}

                            {hasCalendar && (
                              <a
                                href={calUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => handleCalendarClick(e, ev)}
                                className="inline-flex items-center justify-center rounded-full border border-[#C5A059]/70 bg-[#FBF7EE] px-4 py-1.5 font-serif text-[10.5px] font-semibold uppercase tracking-wider text-maroon shadow-md transition-all duration-200 hover:bg-[#F7F0E3] active:scale-95"
                              >
                                📅 Add to Calendar
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                  </article>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}