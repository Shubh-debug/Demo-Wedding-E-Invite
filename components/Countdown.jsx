// "use client";

// import { useEffect, useState } from "react";
// import siteConfig from "@/site.config";
// import Reveal from "./Reveal";
// import { Flourish } from "./ornaments/Motifs";

// function remaining(targetMs) {
//   const diff = targetMs - Date.now();
//   if (diff <= 0) return null; // the day has arrived
//   return {
//     days: Math.floor(diff / 86400000),
//     hours: Math.floor(diff / 3600000) % 24,
//     minutes: Math.floor(diff / 60000) % 60,
//     seconds: Math.floor(diff / 1000) % 60,
//   };
// }

// export default function Countdown() {
//   const { countdown, event } = siteConfig;
//   const [time, setTime] = useState(null);
//   const [mounted, setMounted] = useState(false); // avoids hydration mismatch

//   useEffect(() => {
//     const target = new Date(event.startISO).getTime();
//     setTime(remaining(target));
//     setMounted(true);
//     const id = setInterval(() => setTime(remaining(target)), 1000);
//     return () => clearInterval(id);
//   }, [event.startISO]);

//   const cells = [
//     { label: "Days", value: time?.days },
//     { label: "Hours", value: time?.hours },
//     { label: "Minutes", value: time?.minutes },
//     { label: "Seconds", value: time?.seconds },
//   ];

//   const arrived = mounted && time === null;

//   return (
//     <section className="section" id="countdown" aria-labelledby="countdown-heading">
//       <div className="container-card">
//         <Reveal className="mb-10">
//           <span className="eyebrow">{countdown.eyebrow}</span>
//           <h2 id="countdown-heading" className="heading mt-4">
//             {countdown.heading}
//           </h2>
//           <Flourish className="mx-auto mt-5 w-40 text-gold" />
//         </Reveal>

//         <Reveal delay={100}>
//           {arrived ? (
//             <p className="body-copy font-display text-2xl text-maroon">
//               The day is here — we can&apos;t wait to celebrate with you.
//             </p>
//           ) : (
//             <>
//               {/* Ticking digits are decorative for screen readers; the
//                   summary below carries the same information calmly. */}
//               <ul
//                 className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
//                 aria-hidden="true"
//               >
//                 {cells.map((cell) => (
//                   <li
//                     key={cell.label}
//                     className="paper paper-grain rounded-sm border-t-2 border-t-maroon/70 px-4 py-6 text-center"
//                   >
//                     <div className="font-display text-3xl leading-none text-maroon sm:text-4xl">
//                       {mounted ? String(cell.value).padStart(2, "0") : "--"}
//                     </div>
//                     <div className="mt-3 font-serif text-[10px] font-semibold uppercase tracking-label text-gold-ink sm:text-[11px]">
//                       {cell.label}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//               <p className="sr-only">
//                 {mounted && time
//                   ? `${time.days} days and ${time.hours} hours until the ceremony.`
//                   : "Counting down to the ceremony."}
//               </p>
//             </>
//           )}
//         </Reveal>
//       </div>
//     </section>
//   );
// }
