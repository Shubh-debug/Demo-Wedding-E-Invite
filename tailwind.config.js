/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./site.config.js",
  ],
  theme: {
    extend: {
      colors: {
        // Warm champagne parchment for paper surfaces
        parchment: {
          50: "#FBF7EE",
          100: "#F7F0E3",
          200: "#EEE4D2",
          300: "#E2D2B5",
          400: "#D4BE91",
          500: "#C5A059",
        },
        // Imperial navy — headings, names, and primary actions
        maroon: {
          DEFAULT: "#121D38",
          light: "#1B2A4E",
          deep: "#0B1325",
          ink: "#0B1325",
        },
        // Warm champagne gold — rules, ornaments, and accents
        gold: {
          DEFAULT: "#C5A059",
          light: "#D4AF37",
          pale: "#F3E2B8",
          deep: "#8C6D37",
          ink: "#8C6D37",
        },
        // Marigold garland tones
        marigold: {
          DEFAULT: "#E8891F",
          deep: "#C8611A",
          light: "#F2B448",
          cream: "#FBF3E2",
        },
        leaf: {
          DEFAULT: "#5B7A48",
          deep: "#3F5A32",
          light: "#7E9A64",
        },
        // Readable slate navy body copy on parchment
        ink: {
          DEFAULT: "#2D3748",
          soft: "#334155",
          muted: "#475569",
        },
      },
      fontFamily: {
        // Roman caps for names & display — matches the printed card
        display: ["var(--font-cinzel)", "Cinzel", "Georgia", "serif"],
        // Elegant serif for body, labels, small caps
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        // Script accent ("and", flourishes)
        script: ["var(--font-vibes)", "Great Vibes", "cursive"],
      },
      letterSpacing: {
        label: "0.34em",
        name: "0.16em",
        wide2: "0.22em",
      },
      boxShadow: {
        card: "0 24px 60px -32px rgba(6, 10, 20, 0.45)",
        raised: "0 32px 70px -30px rgba(6, 10, 20, 0.55)",
        seal: "0 14px 28px -10px rgba(6, 10, 20, 0.65)",
      },
      backgroundImage: {
        "gold-rule":
          "linear-gradient(90deg, transparent, rgba(197,160,89,0.85), transparent)",
        "gold-foil":
          "linear-gradient(115deg, #F3E2B8 8%, #C5A059 34%, #FBF7EE 52%, #8C6D37 74%, #D4AF37 92%)",
      },
      keyframes: {
        "petal-fall": {
          "0%": { transform: "translate3d(0,-6vh,0) rotate(0deg)", opacity: "0" },
          "6%": { opacity: "var(--petal-opacity, 0.3)" },
          "25%": {
            transform:
              "translate3d(calc(var(--sway) * 0.6), 22vh, 0) rotate(calc(var(--spin) * 0.25))",
          },
          "50%": {
            transform:
              "translate3d(calc(var(--sway) * -0.4), 48vh, 0) rotate(calc(var(--spin) * 0.5))",
          },
          "75%": {
            transform:
              "translate3d(calc(var(--sway) * 0.5), 76vh, 0) rotate(calc(var(--spin) * 0.75))",
          },
          "96%": { opacity: "var(--petal-opacity, 0.3)" },
          "100%": {
            transform:
              "translate3d(calc(var(--sway) * -0.2), 110vh, 0) rotate(var(--spin))",
            opacity: "0",
          },
        },
        "tap-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 162, 39, 0.45)" },
          "55%": { boxShadow: "0 0 0 14px rgba(201, 162, 39, 0)" },
        },
        sway: {
          from: { transform: "rotate(-2deg)" },
          to: { transform: "rotate(2deg)" },
        },
        "wave-bounce": {
          "0%, 100%": { transform: "scaleY(0.55)" },
          "50%": { transform: "scaleY(1)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-140%) rotate(8deg)" },
          "100%": { transform: "translateX(140%) rotate(8deg)" },
        },
      },
      animation: {
        "petal-fall": "petal-fall var(--fall-duration, 12s) linear infinite",
        "tap-pulse": "tap-pulse 2s ease-in-out infinite",
        sway: "sway 4s ease-in-out infinite alternate",
        "wave-bounce": "wave-bounce 0.9s ease-in-out infinite",
        shimmer: "shimmer 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;