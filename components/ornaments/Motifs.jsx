/**
 * Line-art motifs: palace (mahal) watermarks, quarter mandalas,
 * gold flourish dividers, lotus glyph, royal ceremonial elephants,
 * and Rajput/Mughal Jali lattice base borders.
 * All decorative — every export is aria-hidden.
 */

/** Rajasthani palace silhouette — used as a pale watermark behind sections */
export function PalaceWatermark({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 300 320"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
        {/* central onion dome + finial */}
        <path d="M150 30 V 16" />
        <circle cx="150" cy="12" r="4" />
        <path
          d="M150 34 C 128 46, 118 66, 118 84 C 118 96, 128 104, 150 104
             C 172 104, 182 96, 182 84 C 182 66, 172 46, 150 34 Z"
        />
        <path d="M114 104 H 186" strokeWidth="3" />
        <path d="M120 104 V 130 M180 104 V 130" />

        {/* flanking chhatris */}
        <g>
          <path d="M74 74 V 64" />
          <path d="M74 78 C 62 86, 56 98, 56 108 C 56 116, 63 120, 74 120 C 85 120, 92 116, 92 108 C 92 98, 86 86, 74 78 Z" />
          <path d="M52 120 H 96" strokeWidth="2.6" />
          <path d="M58 120 V 152 M90 120 V 152" />
          <path d="M58 136 C 58 128, 90 128, 90 136" />
        </g>
        <g>
          <path d="M226 74 V 64" />
          <path d="M226 78 C 214 86, 208 98, 208 108 C 208 116, 215 120, 226 120 C 237 120, 244 116, 244 108 C 244 98, 238 86, 226 78 Z" />
          <path d="M204 120 H 248" strokeWidth="2.6" />
          <path d="M210 120 V 152 M242 120 V 152" />
          <path d="M210 136 C 210 128, 242 128, 242 136" />
        </g>

        {/* main façade with cusped arches */}
        <path d="M44 152 H 256" strokeWidth="3" />
        <path d="M52 152 V 288 M248 152 V 288" />

        {/* arch openings */}
        {[86, 150, 214].map((x) => (
          <g key={x}>
            <path
              d={`M${x - 26} 288 V 206
                  C ${x - 26} 188, ${x - 14} 176, ${x} 176
                  C ${x + 14} 176, ${x + 26} 188, ${x + 26} 206 V 288`}
            />
            <path
              d={`M${x - 17} 288 V 210
                  C ${x - 17} 197, ${x - 9} 189, ${x} 189
                  C ${x + 9} 189, ${x + 17} 197, ${x + 17} 210 V 288`}
              strokeWidth="1.4"
            />
          </g>
        ))}

        {/* jharokha balconies */}
        <path d="M64 200 H 108 M192 200 H 236" strokeWidth="1.6" />

        {/* plinth */}
        <path d="M32 288 H 268" strokeWidth="3" />
        <path d="M24 300 H 276" strokeWidth="2" />
      </g>
    </svg>
  );
}

/** Quarter mandala of scalloped rings — sits in the card corners */
export function MandalaCorner({ className = "", flip = false }) {
  const petals = (radius, count) =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / (count - 1)) * (Math.PI / 2);
      const x = (Math.cos(a) * radius).toFixed(2);
      const y = (Math.sin(a) * radius).toFixed(2);
      return <circle key={`${radius}-${i}`} cx={x} cy={y} r={radius * 0.032} />;
    });

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.3">
        {[54, 78, 102, 126, 150].map((r) => (
          <path key={r} d={`M0 ${r} A ${r} ${r} 0 0 0 ${r} 0`} />
        ))}
        {/* scalloped outer edge */}
        <path
          d="M0 176 A 176 176 0 0 0 176 0"
          strokeDasharray="1.5 8"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
        {/* radiating spokes */}
        {Array.from({ length: 9 }, (_, i) => {
          const a = (i / 8) * (Math.PI / 2);
          return (
            <line
              key={i}
              x1={(Math.cos(a) * 54).toFixed(2)}
              y1={(Math.sin(a) * 54).toFixed(2)}
              x2={(Math.cos(a) * 150).toFixed(2)}
              y2={(Math.sin(a) * 150).toFixed(2)}
              strokeWidth="0.9"
            />
          );
        })}
      </g>
      <g fill="currentColor">
        {petals(66, 7)}
        {petals(114, 9)}
        {petals(162, 11)}
      </g>
    </svg>
  );
}


        /** Elegant botanical corner ornament for the invitation card */
export function RoyalFloralCorner({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      {/* Main fine gold vine */}
      <path
        d="M12 12 Q55 14 90 22 Q120 30 148 18"
        stroke="#C5A059"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      <path
        d="M12 12 Q14 55 22 90 Q30 120 18 148"
        stroke="#C5A059"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      <path
        d="M18 18 Q45 40 70 52"
        stroke="#C5A059"
        strokeWidth="0.9"
        strokeLinecap="round"
      />

      {/* Top leaves */}
      <path
        d="M40 14 Q48 8 54 15 Q48 20 40 14Z"
        fill="#C5A059"
        fillOpacity="0.85"
      />

      <path
        d="M68 18 Q78 12 84 19 Q76 25 68 18Z"
        fill="#C5A059"
        fillOpacity="0.85"
      />

      <path
        d="M104 22 Q112 16 118 24 Q110 29 104 22Z"
        fill="#C5A059"
        fillOpacity="0.85"
      />

      <path
        d="M130 20 Q138 12 144 22 Q136 26 130 20Z"
        fill="#C5A059"
        fillOpacity="0.85"
      />

      {/* Side leaves */}
      <path
        d="M14 40 Q8 48 15 54 Q20 48 14 40Z"
        fill="#C5A059"
        fillOpacity="0.85"
      />

      <path
        d="M18 68 Q12 78 19 84 Q25 76 18 68Z"
        fill="#C5A059"
        fillOpacity="0.85"
      />

      <path
        d="M22 104 Q16 112 24 118 Q29 110 22 104Z"
        fill="#C5A059"
        fillOpacity="0.85"
      />

      <path
        d="M20 130 Q12 138 22 144 Q26 136 20 130Z"
        fill="#C5A059"
        fillOpacity="0.85"
      />

      {/* Main maroon rosette */}
      <g transform="translate(32 32)">
        <circle
          cx="0"
          cy="0"
          r="14"
          fill="#D4AF37"
          fillOpacity="0.22"
        />

        <circle cx="0" cy="-9" r="5" fill="#121D38" />
        <circle cx="6.4" cy="-6.4" r="5" fill="#0B1325" />
        <circle cx="9" cy="0" r="5" fill="#121D38" />
        <circle cx="6.4" cy="6.4" r="5" fill="#0B1325" />
        <circle cx="0" cy="9" r="5" fill="#121D38" />
        <circle cx="-6.4" cy="6.4" r="5" fill="#0B1325" />
        <circle cx="-9" cy="0" r="5" fill="#121D38" />
        <circle cx="-6.4" cy="-6.4" r="5" fill="#0B1325" />

        <circle cx="0" cy="0" r="5.5" fill="#FBF7EE" />
        <circle cx="0" cy="0" r="3" fill="#B88A33" />
        <circle cx="0" cy="0" r="1.2" fill="#0B1325" />
      </g>

      {/* Small accent buds */}
      <g transform="translate(86 21)">
        <circle cx="0" cy="0" r="4.5" fill="#121D38" />
        <circle cx="0" cy="0" r="1.8" fill="#FBF7EE" />
      </g>

      <g transform="translate(21 86)">
        <circle cx="0" cy="0" r="4.5" fill="#121D38" />
        <circle cx="0" cy="0" r="1.8" fill="#FBF7EE" />
      </g>

      {/* Delicate hanging beads */}
      <line
        x1="28"
        y1="92"
        x2="28"
        y2="126"
        stroke="#C5A059"
        strokeWidth="0.8"
        strokeDasharray="1.5 2"
      />

      <circle cx="28" cy="128" r="1.8" fill="#C5A059" />

      <path
        d="M28 132 L26 138 L30 138Z"
        fill="#8C6824"
      />

      {/* Secondary hanging ornament */}
      <line
        x1="48"
        y1="52"
        x2="48"
        y2="82"
        stroke="#C5A059"
        strokeWidth="0.8"
        strokeDasharray="1.5 2"
      />

      <circle cx="48" cy="84" r="1.6" fill="#C5A059" />

      <circle cx="48" cy="90" r="2.4" fill="#121D38" />
    </svg>
  );
}

/** Gold flourish divider — curls either side of a small diamond */
export function Flourish({ className = "" }) {
  return (
    <svg viewBox="0 0 200 20" className={className} aria-hidden="true" focusable="false">
      <g stroke="currentColor" fill="none" strokeWidth="1.2" strokeLinecap="round">
        <path d="M8 10 H 66" />
        <path d="M134 10 H 192" />
        <path d="M66 10 C 74 10, 78 4, 86 6 C 92 7.5, 92 12.5, 86 14 C 78 16, 74 10, 66 10 Z" />
        <path d="M134 10 C 126 10, 122 4, 114 6 C 108 7.5, 108 12.5, 114 14 C 122 16, 126 10, 134 10 Z" />
      </g>
      <g fill="currentColor">
        <path d="M100 3 L 106 10 L 100 17 L 94 10 Z" />
        <circle cx="74" cy="10" r="1.4" />
        <circle cx="126" cy="10" r="1.4" />
      </g>
    </svg>
  );
}

/** Simple lotus glyph used as a section mark */
export function LotusMark({ className = "" }) {
  return (
    <svg viewBox="0 0 60 34" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M30 30 C 22 24, 18 14, 20 6 C 26 10, 30 20, 30 30 Z" />
        <path d="M30 30 C 38 24, 42 14, 40 6 C 34 10, 30 20, 30 30 Z" />
        <path d="M30 30 C 26 22, 26 12, 30 4 C 34 12, 34 22, 30 30 Z" />
        <path d="M30 30 C 20 28, 10 22, 6 14 C 16 14, 26 22, 30 30 Z" />
        <path d="M30 30 C 40 28, 50 22, 54 14 C 44 14, 34 22, 30 30 Z" />
      </g>
    </svg>
  );
}

/** ॐ in Devanagari, drawn as text so it always renders correctly */
export function OmMark({ className = "" }) {
  return (
    <span className={className} aria-hidden="true">
      ॐ
    </span>
  );
}

/**
 * Royal Ceremonial Elephant with Raised Trunk (Gaja-Lakshmi style)
 * Features traditional jhool (decorative saddle blanket), tusks, and salutation posture.
 */
export function RoyalElephant({ className = "", flip = false }) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Head & Raised Trunk */}
        <path d="M72 45 C73 34 68 25 58 24 C50 23 44 28 42 35 C40 40 38 46 32 46 C28 46 25 42 27 34 C29 26 36 17 44 14 C48 12 50 8 47 5 C44 2 38 5 32 10 C22 17 18 28 17 38 C16 48 22 55 30 55 C38 55 42 48 45 42" />
        {/* Tusk */}
        <path d="M46 44 C49 46 54 48 57 44" strokeWidth="1.5" />
        {/* Eye */}
        <circle cx="53" cy="29" r="1.2" fill="currentColor" />
        {/* Ear */}
        <path d="M58 26 C64 26 71 31 71 39 C71 47 63 50 58 48 Z" />
        <path d="M62 31 C65 33 67 36 66 41" strokeWidth="0.8" strokeDasharray="1.5 1.5" />

        {/* Back & Body */}
        <path d="M72 42 C78 44 85 47 88 54 C90 58 89 68 89 74" />
        {/* Tail */}
        <path d="M89 54 C91 58 93 64 92 68" strokeWidth="1" />
        <path d="M91 67 C93 69 94 72 92 74" />

        {/* Front Leg */}
        <path d="M48 56 L47 74" />
        <path d="M43 74 L52 74" />
        {/* Back Leg */}
        <path d="M78 54 L78 74" />
        <path d="M74 74 L83 74" />

        {/* Underbelly */}
        <path d="M52 64 C60 66 70 65 76 58" />

        {/* Ceremonial Jhool (Decorative Saddle Blanket) */}
        <path d="M56 46 L76 46 L74 60 C74 62 70 63 66 63 C62 63 58 62 58 60 Z" fill="currentColor" fillOpacity="0.08" />
        <path d="M56 46 L76 46 L74 60 C74 62 70 63 66 63 C62 63 58 62 58 60 Z" />
        {/* Jhool Fringe & Bell Accent */}
        <path d="M57 58 L75 58" strokeWidth="0.8" strokeDasharray="2 1.5" />
        <circle cx="66" cy="53" r="2.5" />
      </g>
    </svg>
  );
}

/**
 * Geometric Rajput/Mughal Jali Lattice Base Border
 * Continuous repeating arch and floral diamond pattern.
 */
export function JaliBaseBorder({ className = "" }) {
  return (
    <div className={`relative h-6 w-full overflow-hidden opacity-35 ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <pattern
            id="heroJaliPattern"
            width="28"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            {/* Scalloped Arch Profile */}
            <path
              d="M0 24 L0 12 C4 12 6 8 14 8 C22 8 24 12 28 12 L28 24 Z"
              stroke="currentColor"
              strokeWidth="0.9"
              fill="none"
            />
            {/* Inner Floral Diamond */}
            <path
              d="M14 12 L17 15 L14 18 L11 15 Z"
              stroke="currentColor"
              strokeWidth="0.7"
              fill="none"
            />
            <circle cx="14" cy="4" r="1.2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroJaliPattern)" />
        {/* Top Gold Rule */}
        <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.45" />
      </svg>
    </div>
  );
}