// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import siteConfig from "@/site.config";
// import Reveal from "./Reveal";
// import fireConfetti from "./confetti";
// import { Flourish } from "./ornaments/Motifs";

// export default function ScratchSection() {
//   const { scratch } = siteConfig;
//   const canvasRef = useRef(null);
//   const stageRef = useRef(null);
//   const drawing = useRef(false);
//   const scratchedOnce = useRef(false);
//   const [cleared, setCleared] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const stage = stageRef.current;
//     if (!canvas || !stage) return;

//     const paint = () => {
//       const dpr = Math.min(window.devicePixelRatio || 1, 2);
//       const { width, height } = stage.getBoundingClientRect();
//       if (!width || !height) return;
//       canvas.width = Math.round(width * dpr);
//       canvas.height = Math.round(height * dpr);
//       const ctx = canvas.getContext("2d", { willReadFrequently: true });
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//       // brushed antique-gold foil
//       const g = ctx.createLinearGradient(0, 0, width, height);
//       g.addColorStop(0, "#A8862B");
//       g.addColorStop(0.28, "#DFC069");
//       g.addColorStop(0.5, "#C9A227");
//       g.addColorStop(0.72, "#EBD9A4");
//       g.addColorStop(1, "#A8862B");
//       ctx.fillStyle = g;
//       ctx.fillRect(0, 0, width, height);

//       const sheen = ctx.createLinearGradient(0, 0, width * 0.9, height);
//       sheen.addColorStop(0, "rgba(255,255,255,0)");
//       sheen.addColorStop(0.48, "rgba(255,255,255,0.32)");
//       sheen.addColorStop(0.55, "rgba(255,255,255,0)");
//       ctx.fillStyle = sheen;
//       ctx.fillRect(0, 0, width, height);

//       ctx.font = '600 18px "Cormorant Garamond", Georgia, serif';
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillStyle = "rgba(90, 15, 18, 0.75)";
//       ctx.letterSpacing = "3px";
//       ctx.fillText(scratch.coverText.toUpperCase(), width / 2, height / 2);
//     };

//     paint();
//     const ro = new ResizeObserver(() => {
//       if (!scratchedOnce.current) paint();
//     });
//     ro.observe(stage);
//     return () => ro.disconnect();
//   }, [scratch.coverText]);

//   const celebrate = useCallback(() => {
//     setCleared(true);
//     const rect = stageRef.current?.getBoundingClientRect();
//     fireConfetti(
//       rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : {}
//     );
//   }, []);

//   const scratchAt = (clientX, clientY) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const dpr = canvas.width / rect.width;
//     const ctx = canvas.getContext("2d", { willReadFrequently: true });
//     ctx.save();
//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//     ctx.globalCompositeOperation = "destination-out";
//     ctx.beginPath();
//     ctx.arc((clientX - rect.left) * dpr, (clientY - rect.top) * dpr, 32 * dpr, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.restore();
//     scratchedOnce.current = true;
//   };

//   const checkProgress = () => {
//     if (cleared) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d", { willReadFrequently: true });
//     const { width, height } = canvas;
//     const step = 12;
//     const data = ctx.getImageData(0, 0, width, height).data;
//     let clearedPx = 0;
//     let total = 0;
//     for (let y = 0; y < height; y += step) {
//       for (let x = 0; x < width; x += step) {
//         total += 1;
//         if (data[(y * width + x) * 4 + 3] < 40) clearedPx += 1;
//       }
//     }
//     if (clearedPx / total > 0.42) celebrate();
//   };

//   const onPointerDown = (e) => {
//     drawing.current = true;
//     e.currentTarget.setPointerCapture?.(e.pointerId);
//     scratchAt(e.clientX, e.clientY);
//   };
//   const onPointerMove = (e) => {
//     if (!drawing.current) return;
//     scratchAt(e.clientX, e.clientY);
//   };
//   const onPointerUp = () => {
//     if (!drawing.current) return;
//     drawing.current = false;
//     checkProgress();
//   };

//   return (
//     <section className="section" id="save-the-date" aria-labelledby="scratch-heading">
//       <div className="container-card">
//         <Reveal className="mb-8">
//           <span className="eyebrow">{scratch.eyebrow}</span>
//           <h2 id="scratch-heading" className="heading mt-4">
//             {scratch.heading}
//           </h2>
//           <Flourish className="mx-auto mt-5 w-40 text-gold" />
//         </Reveal>

//         <Reveal delay={100}>
//           <div className="paper paper-grain rounded-sm p-4 sm:p-5">
//             <div className="scratch-stage" ref={stageRef}>
//               {/* revealed content sits underneath the foil */}
//               <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-parchment-50 px-6 text-center">
//                 <p className="font-display text-xl uppercase tracking-name text-maroon sm:text-2xl">
//                   {scratch.revealTitle}
//                 </p>
//                 <p className="font-display text-lg text-maroon-deep sm:text-xl">
//                   {scratch.revealDate}
//                 </p>
//                 <p className="body-copy text-base">{scratch.revealDay}</p>
//               </div>

//               {!cleared && (
//                 <canvas
//                   ref={canvasRef}
//                   className={`scratch-canvas ${cleared ? "is-cleared" : ""}`}
//                   onPointerDown={onPointerDown}
//                   onPointerMove={onPointerMove}
//                   onPointerUp={onPointerUp}
//                   onPointerLeave={onPointerUp}
//                   aria-hidden="true"
//                 />
//               )}
//             </div>

//             {/* Keyboard / screen-reader path — scratching is pointer-only */}
//             {!cleared && (
//               <button
//                 type="button"
//                 onClick={celebrate}
//                 className="mt-4 font-serif text-sm font-semibold uppercase tracking-wide2
//                            text-maroon underline decoration-gold decoration-dotted
//                            underline-offset-4 hover:decoration-solid"
//               >
//                 Reveal the date instead
//               </button>
//             )}
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }
