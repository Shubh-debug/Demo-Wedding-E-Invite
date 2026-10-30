# A Royal Rajasthani Wedding Invitation

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-149eca?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)

> A luxury digital wedding invitation inspired by royal Rajasthani stationery.
<!-- 
**Live demo:** [View the invitation](https://your-live-demo-url.example.com) *(replace with the production URL)*   -->
**Deployment:** Ready for production deployment on Vercel as a static Next.js export.

## Overview

This interactive wedding invitation turns a traditional printed card into an immersive digital experience. Guests begin with a sealed envelope, open the invitation through a choreographed GSAP sequence, and continue through a staged celebration of the couple's story, memories, wedding functions, venue details, and RSVP.

The visual language combines antique parchment, temple maroon, antique gold, marigold accents, ornamental motifs, custom serif typography, and subtle motion. The experience is responsive across mobile and desktop and includes reduced-motion support for guests who prefer less animation.

## Experience Highlights

### Royal hero card

- Printed-card composition with parchment texture, antique-gold rules, deep maroon typography, and royal ornamentation.
- Ganesh Ji mangal text, Sanskrit shlok, blessings, and a clear family-lineage hierarchy for both partners.
- Grounded royal tableau details, including elephants, Kalash artwork, palace motifs, mandala corners, florals, and marigold-inspired accents.
- An animated envelope opener with seal interaction, lifting flap, emerging invitation letter, and a cinematic particle portal handoff.

### Interactive RSVP stage

- A playful, gamified RSVP choice where the **No** button evades mouse and touch interactions.
- Witty response lines keep the interaction light while preserving a clear, accessible primary acceptance action.
- Acceptance triggers celebratory `canvas-confetti` physics and reveals a wishes form.
- Guest wishes can be routed directly to WhatsApp using the configured RSVP number.

### Rich media and visual details

- Traditional block-print and parchment-inspired patterns with restrained gold foil accents.
- Floating rose-petal animation and scroll-triggered reveals.
- Scratch-to-reveal date experience with a keyboard-friendly reveal fallback.
- Countdown, story journey, photo gallery, celebration event cards, maps, calendar links, and venue details.
- Background audio with a floating mute/unmute control, started after the guest opens the invitation.
- Responsive layout for mobile, tablet, and desktop, with `prefers-reduced-motion` support.

### Analytics and observability

- `@vercel/analytics` is mounted in the root layout for deployment-aware visitor analytics.
- The app is a static export, making it straightforward to host on Vercel or another static web platform.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 14 with the App Router |
| UI | React 18, JSX, and client components where interaction is required |
| Styling | Tailwind CSS 3.4 and custom CSS in `app/globals.css` |
| Typography | `next/font/google`: Cinzel, Cormorant Garamond, and Great Vibes |
| Animation | GSAP, CSS keyframes, scroll-triggered reveals, and Three.js |
| Canvas effects | `canvas-confetti` and the scratch-to-reveal canvas interaction |
| Analytics | `@vercel/analytics` |
| Deployment | Vercel static hosting via Next.js `output: "export"` |

## Project Structure

The runnable application lives in `Wedding-invite-rajasthani/anniversary-invite`.

```text
Wedding-invite-rajasthani-20260805T211253Z-1-001/
├── README.md                         # Project documentation
└── Wedding-invite-rajasthani/
    └── anniversary-invite/           # Next.js application root
        ├── app/
        │   ├── layout.js             # Fonts, metadata, viewport, Vercel Analytics
        │   ├── page.js               # Invitation flow and staged section composition
        │   └── globals.css            # Paper texture, focus styles, shared primitives
        ├── components/
        │   ├── EnvelopeOpener.jsx    # Seal, envelope, letter, and portal handoff
        │   ├── PortalTransition.jsx  # Three.js cinematic gold particle transition
        │   ├── Hero.jsx               # Royal printed invitation card
        │   ├── ScratchCountdownSection.jsx
        │   │                            # Scratch date reveal and countdown
        │   ├── Journey.jsx             # Couple story timeline
        │   ├── Gallery.jsx             # Couple photo gallery
        │   ├── EventsSection.jsx       # Mehendi through Saat Vachan events
        │   ├── EventDetails.jsx        # Venue, map, and calendar actions
        │   ├── InviteMessage.jsx       # Closing invitation message
        │   ├── Rsvp.jsx                # Dodge interaction, wishes, WhatsApp RSVP
        │   ├── MusicPlayer.jsx         # Background music control
        │   ├── Petals.jsx              # Floating rose-petal overlay
        │   ├── Reveal.jsx               # Scroll reveal wrapper
        │   ├── Footer.jsx
        │   ├── confetti.js             # Shared confetti helper
        │   └── ornaments/
        │       ├── Florals.jsx         # Floral sprays, corners, and Kalash
        │       └── Motifs.jsx          # Palace, mandala, lotus, and Om motifs
        ├── public/
        │   ├── audio/                  # Background music assets
        │   └── images/
        │       ├── envelope/           # Letter, body, flap, and seal layers
        │       ├── Events/             # Function posters
        │       └── Moments/            # Gallery photographs
        ├── site.config.js              # Couple, event, RSVP, copy, and media config
        ├── next.config.mjs             # Static export configuration
        ├── tailwind.config.js          # Theme colors, fonts, keyframes, animations
        ├── postcss.config.mjs
        ├── jsconfig.json               # `@/*` import alias
        └── package.json                # Scripts and dependencies
```

## Getting Started

### Prerequisites

- Node.js **18.17 or newer**; Node.js 20 LTS is recommended.
- npm 9 or newer.
- A modern browser with JavaScript enabled. WebGL is used for the portal particle transition.

### Install and run locally

From a terminal:

```bash
git clone <YOUR_REPOSITORY_URL>
cd <CLONED_REPOSITORY>/Wedding-invite-rajasthani/anniversary-invite
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser, tap the envelope seal, and explore the invitation.

Available scripts:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create the production static export in `out/` |
| `npm run start` | Serve a built Next.js application locally |
| `npm run lint` | Run the configured Next.js lint command |

> **Build note:** Stop `npm run dev` before running `npm run build`, because both processes use the `.next` directory.

## Configuration

Most invitation content is intentionally centralized in [`site.config.js`](Wedding-invite-rajasthani/anniversary-invite/site.config.js). Edit the values there, then restart the dev server if necessary.

| Configuration section | Customize |
| --- | --- |
| `couple` | Names, parent lineage, and display name |
| `opener` | Envelope greeting, title, seal initials, and tap label |
| `music` | Audio path and whether playback starts after opening |
| `hero` | Mangal text, shlok, blessings, invitation copy, and scroll prompt |
| `scratch` | Scratch-card copy and revealed date |
| `journey` | Story heading, subtitle, and milestone entries |
| `gallery` | Image paths and accessible alt text |
| `event` | Main ceremony venue, dates, map URL, and calendar details |
| `events` | Function names, dates, dress codes, posters, and map links |
| `rsvp` | Form labels, success copy, and WhatsApp phone number |

### Change names and event details

Update the `couple`, `event`, `events`, `hero`, `scratch`, and `journey` objects. The countdown derives its target from `event.startISO`, so keep that value in a valid ISO timestamp with its timezone offset.

```js
const siteConfig = {
  couple: {
    partner1: "XYZ",
    partner2: "ZYXW",
    displayName: "X & Y",
  },
  event: {
    venue: "Dada Bari Temple",
    city: "29, Badridas Temple Street, Kolkata",
    startISO: "2026-11-30T17:00:00+05:30",
  },
};
```

### Change the RSVP WhatsApp number

Set `rsvp.whatsappNumber` to the destination number in international format, without spaces or punctuation.

```js
rsvp: {
  whatsappNumber: "919876543210",
}
```

The RSVP form is front-end only by default. WhatsApp opens in a new tab with the guest name and wishes pre-filled. For a persistent inbox or database workflow, connect `components/Rsvp.jsx` to a backend or form provider.

## Deployment on Vercel

This application is configured with `output: "export"`, so `npm run build` produces a static site in `out/`. Vercel can build and serve that output automatically.

1. Import the repository into Vercel.
2. In **Project Settings > General**, set **Root Directory** to:
   `Wedding-invite-rajasthani/anniversary-invite`
3. Keep the framework preset as **Next.js**.
4. Use `npm install` as the install command and `npm run build` as the build command, unless Vercel detects them automatically.
5. Deploy. Vercel will publish the generated static export.

> **Important:** The Next.js app is nested below the repository root. Setting the Root Directory is required so Vercel finds `package.json`, `next.config.mjs`, and the `app/` directory.

For another static host, run:

```bash
npm install
npm run build
```

Then upload the contents of `Wedding-invite-rajasthani/anniversary-invite/out/` to the host.

## Accessibility and Performance

- Uses semantic headings, labelled form fields, image alt text, visible focus states, and a skip link.
- Supports keyboard access for the scratch reveal through a direct reveal action.
- Respects `prefers-reduced-motion` for petals, scroll reveals, and major transitions.
- Uses responsive particle counts and capped renderer pixel ratio for the Three.js transition.
- Uses Next.js image handling with static-export-compatible unoptimized output.

## 🔒 Proprietary Notice & License

Copyright © 2026 Shubham Agarwal. All rights reserved.

This project and its assets - including source code, bespoke illustrations, royal design motifs, and personal family details - are strictly proprietary. 

- **Unauthorized Reproduction:** Cloning, forking, scraping, redistribution, or deployment for commercial or public use is strictly prohibited.
- **Personal Assets:** All wedding media, dates, and lineage information are private to the families involved and may not be reused.
