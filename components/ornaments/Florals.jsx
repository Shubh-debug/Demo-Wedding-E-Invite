/**
 * Hand-drawn SVG florals for the invitation card:
 * marigold clusters, hanging temple bells and leafy sprigs.
 * All are decorative — every export is aria-hidden.
 */

/* A single dense marigold pompom, built from stacked scalloped rings */
function Marigold({ cx, cy, r, outer, inner, core }) {
  const ring = (radius, count, petal, fill, phase = 0) =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2 + phase;
      const px = (cx + Math.cos(a) * radius).toFixed(2);
      const py = (cy + Math.sin(a) * radius).toFixed(2);
      return (
        <circle key={`${radius}-${i}`} cx={px} cy={py} r={petal.toFixed(2)} fill={fill} />
      );
    });

  return (
    <g>
      {/* base disc keeps gaps between petals from showing through */}
      <circle cx={cx} cy={cy} r={r * 0.86} fill={outer} />
      {ring(r * 0.84, 18, r * 0.22, outer, 0)}
      {ring(r * 0.62, 14, r * 0.2, inner, 0.22)}
      {ring(r * 0.38, 10, r * 0.17, inner, 0.45)}
      {ring(r * 0.18, 6, r * 0.14, core, 0.7)}
      <circle cx={cx} cy={cy} r={r * 0.14} fill={core} />
    </g>
  );
}

function Leaf({ x, y, rotate = 0, scale = 1, fill = "#5B7A48" }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0 0 C 14 -12, 34 -10, 44 2 C 34 14, 14 16, 0 0 Z"
        fill={fill}
      />
      <path
        d="M2 1 C 16 1, 30 2, 42 2"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.2"
        fill="none"
      />
    </g>
  );
}

/* Chain of beads ending in a temple bell */
function BellStrand({ x, top, length, scale = 1 }) {
  const beads = Math.max(3, Math.round(length / 16));
  return (
    <g transform={`translate(${x} ${top}) scale(${scale})`}>
      <line
        x1="0"
        y1="0"
        x2="0"
        y2={length}
        stroke="#C9A227"
        strokeWidth="1.2"
      />
      {Array.from({ length: beads }, (_, i) => (
        <circle
          key={i}
          cx="0"
          cy={(i + 1) * (length / (beads + 1))}
          r="2.6"
          fill="#DFC069"
        />
      ))}
      {/* bell */}
      <g transform={`translate(0 ${length})`}>
        <path
          d="M-7 10 C -7 2, -4 -2, 0 -3 C 4 -2, 7 2, 7 10 Z"
          fill="#C9A227"
        />
        <path d="M-8.5 10 H 8.5" stroke="#A8862B" strokeWidth="2.4" />
        <circle cx="0" cy="13.5" r="2.2" fill="#A8862B" />
        <circle cx="0" cy="-4.6" r="1.8" fill="#DFC069" />
      </g>
    </g>
  );
}

/**
 * The big corner flower cluster with bells trailing down,
 * mirroring the top-right corner of the printed card.
 */
export function MarigoldCorner({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 260 300"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      {/* leafy backdrop */}
      <g opacity="0.95">
        <Leaf x={196} y={40} rotate={18} scale={1.1} fill="#5B7A48" />
        <Leaf x={150} y={16} rotate={-24} scale={0.95} fill="#3F5A32" />
        <Leaf x={214} y={96} rotate={62} scale={1} fill="#7E9A64" />
        <Leaf x={128} y={64} rotate={148} scale={0.9} fill="#5B7A48" />
        <Leaf x={236} y={150} rotate={84} scale={0.85} fill="#3F5A32" />
        <Leaf x={104} y={30} rotate={196} scale={0.8} fill="#7E9A64" />
      </g>

      {/* hanging bell strands */}
      <BellStrand x={122} top={54} length={92} scale={0.95} />
      <BellStrand x={166} top={92} length={148} />
      <BellStrand x={206} top={128} length={104} scale={0.9} />
      <BellStrand x={242} top={78} length={196} scale={0.85} />

      {/* flower cluster */}
      <Marigold cx={196} cy={44} r={34} outer="#C8611A" inner="#E8891F" core="#F2B448" />
      <Marigold cx={142} cy={40} r={26} outer="#EFE4CE" inner="#FBF3E2" core="#F2B448" />
      <Marigold cx={238} cy={86} r={30} outer="#E8891F" inner="#F2B448" core="#FBF3E2" />
      <Marigold cx={176} cy={98} r={24} outer="#FBF3E2" inner="#EFE4CE" core="#E8891F" />
      <Marigold cx={228} cy={20} r={22} outer="#C8611A" inner="#E8891F" core="#F2B448" />
      <Marigold cx={116} cy={78} r={19} outer="#E8891F" inner="#F2B448" core="#FBF3E2" />
      <Marigold cx={254} cy={140} r={20} outer="#FBF3E2" inner="#EFE4CE" core="#E8891F" />
    </svg>
  );
}

/** Small marigold + lotus spray used under the kalash and in footers */
export function FloralSpray({ className = "" }) {
  return (
    <svg viewBox="0 0 220 70" className={className} aria-hidden="true" focusable="false">
      <Leaf x={54} y={44} rotate={186} scale={0.8} fill="#7E9A64" />
      <Leaf x={166} y={44} rotate={-6} scale={0.8} fill="#7E9A64" />
      <Leaf x={70} y={30} rotate={210} scale={0.62} fill="#5B7A48" />
      <Leaf x={150} y={30} rotate={-30} scale={0.62} fill="#5B7A48" />
      {/* lotus petals */}
      <g fill="#FBF3E2" stroke="#E0CBA2" strokeWidth="1">
        <path d="M110 62 C 96 56, 88 44, 92 32 C 102 36, 110 48, 110 62 Z" />
        <path d="M110 62 C 124 56, 132 44, 128 32 C 118 36, 110 48, 110 62 Z" />
        <path d="M110 62 C 104 48, 104 34, 110 24 C 116 34, 116 48, 110 62 Z" />
      </g>
      <Marigold cx={78} cy={52} r={13} outer="#E8891F" inner="#F2B448" core="#FBF3E2" />
      <Marigold cx={142} cy={52} r={13} outer="#E8891F" inner="#F2B448" core="#FBF3E2" />
      <Marigold cx={58} cy={58} r={9} outer="#C8611A" inner="#E8891F" core="#F2B448" />
      <Marigold cx={162} cy={58} r={9} outer="#C8611A" inner="#E8891F" core="#F2B448" />
    </svg>
  );
}

/** Sacred kalash (pot + coconut + mango leaves) — bottom centrepiece */
// export function Kalash({ className = "w-24 sm:w-28" }) {
//   return (
//     <svg
//       viewBox="0 0 160 170"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//       aria-hidden="true"
//     >
//       <defs>
//         {/* Pot Copper-Gold Shading */}
//         <radialGradient id="potGrad" cx="38%" cy="38%" r="65%">
//           <stop offset="0%" stopColor="#FFF1D0" />
//           <stop offset="25%" stopColor="#E5B25D" />
//           <stop offset="65%" stopColor="#B87B28" />
//           <stop offset="100%" stopColor="#78440E" />
//         </radialGradient>

//         {/* Coconut Fiber Texture Gradient */}
//         <linearGradient id="coconutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#9C6B3D" />
//           <stop offset="50%" stopColor="#6E441F" />
//           <stop offset="100%" stopColor="#4A260C" />
//         </linearGradient>

//         {/* Mango Leaf Lush Royal Gradients */}
//         <linearGradient id="leafLeft" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="#558B2F" />
//           <stop offset="70%" stopColor="#2E5A18" />
//           <stop offset="100%" stopColor="#1B3A0E" />
//         </linearGradient>

//         <linearGradient id="leafRight" x1="100%" y1="0%" x2="0%" y2="100%">
//           <stop offset="0%" stopColor="#7CB342" />
//           <stop offset="70%" stopColor="#33691E" />
//           <stop offset="100%" stopColor="#1B3A0E" />
//         </linearGradient>

//         {/* Soft Drop Shadow under pot */}
//         <filter id="kalashShadow" x="-10%" y="-10%" width="130%" height="130%">
//           <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#421805" floodOpacity="0.22" />
//         </filter>
//       </defs>

//       <g filter="url(#kalashShadow)">
//         {/* ── Mango Leaves (Amra Pallav) ── */}
//         {/* Outer Far Leaves */}
//         <path d="M80 78 C40 68 15 45 22 18 C38 42 62 62 80 78Z" fill="url(#leafLeft)" />
//         <path d="M80 78 C120 68 145 45 138 18 C122 42 98 62 80 78Z" fill="url(#leafRight)" />
//         {/* Inner Mid Leaves */}
//         <path d="M80 75 C52 50 42 22 55 5 C64 28 72 52 80 75Z" fill="url(#leafLeft)" />
//         <path d="M80 75 C108 50 118 22 105 5 C96 28 88 52 80 75Z" fill="url(#leafRight)" />
//         {/* Center Upright Leaf */}
//         <path d="M80 72 C70 42 74 15 80 0 C86 15 90 42 80 72Z" fill="#689F38" />

//         {/* ── Nariyal (Sacred Coconut) ── */}
//         <path
//           d="M80 28 C64 28 54 44 54 62 C54 75 66 82 80 82 C94 82 106 75 106 62 C106 44 96 28 80 28Z"
//           fill="url(#coconutGrad)"
//         />
//         {/* Coconut Top Sprout */}
//         <path d="M80 20 L76 29 L84 29 Z" fill="#4A260C" />

//         {/* ── Sacred Red/Gold Mauli Thread at Rim ── */}
//         <rect x="52" y="74" width="56" height="8" rx="4" fill="#8B1E28" />
//         <line x1="58" y1="74" x2="56" y2="82" stroke="#E5B25D" strokeWidth="2" />
//         <line x1="70" y1="74" x2="68" y2="82" stroke="#E5B25D" strokeWidth="2" />
//         <line x1="82" y1="74" x2="80" y2="82" stroke="#E5B25D" strokeWidth="2" />
//         <line x1="94" y1="74" x2="92" y2="82" stroke="#E5B25D" strokeWidth="2" />
//         <line x1="104" y1="74" x2="102" y2="82" stroke="#E5B25D" strokeWidth="2" />

//         {/* ── The Lota / Pot ── */}
//         <path
//           d="M58 80 C40 86 32 105 32 124 C32 146 52 158 80 158 C108 158 128 146 128 124 C128 105 120 86 102 80 Z"
//           fill="url(#potGrad)"
//           stroke="#B87B28"
//           strokeWidth="1.5"
//         />

//         {/* Pedestal Base */}
//         <path d="M52 154 C52 152 64 150 80 150 C96 150 108 152 108 154 L104 162 C104 164 94 165 80 165 C66 165 56 164 56 162 Z" fill="#945F18" />

//         {/* ── Auspicious Kumkum Swastika ── */}
//         <g stroke="#8B1E28" strokeWidth="3" strokeLinecap="round">
//           {/* Main Cross */}
//           <line x1="80" y1="106" x2="80" y2="134" />
//           <line x1="66" y1="120" x2="94" y2="120" />
//           {/* Arms */}
//           <line x1="80" y1="106" x2="90" y2="106" />
//           <line x1="94" y1="120" x2="94" y2="130" />
//           <line x1="80" y1="134" x2="70" y2="134" />
//           <line x1="66" y1="120" x2="66" y2="110" />
//           {/* Dots */}
//           <circle cx="73" cy="113" r="1.5" fill="#8B1E28" stroke="none" />
//           <circle cx="87" cy="113" r="1.5" fill="#8B1E28" stroke="none" />
//           <circle cx="73" cy="127" r="1.5" fill="#8B1E28" stroke="none" />
//           <circle cx="87" cy="127" r="1.5" fill="#8B1E28" stroke="none" />
//         </g>
//       </g>
//     </svg>
//   );
// }