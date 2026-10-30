/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — everything you'd want to customize lives here.
 *  Edit the values below and the whole site updates.
 * ─────────────────────────────────────────────────────────────
 */

const siteConfig = {
  // ── Couple ────────────────────────────────────────────────
  couple: {
    partner1: "Aarav",
    partner2: "Ananya",
    partner1Parents: "S/O Smt. Sunita & Shri Vikram Singhania",
    partner2Parents: "D/O Smt. Radhika & Shri Rajeshwari Mittal",
    displayName: "Aarav & Ananya",
  },

  // ── Milestone ─────────────────────────────────────────────
  milestone: {
    label: "The Royal Wedding Celebration | Demo Invitation",
  },

  // ── Opening seal (shown before the invitation) ─────────────
  opener: {
    mangalText: "॥ श्री गणेशाय नमः ॥",
    eyebrow: "An Auspicious Invitation Awaits",
    title: "Aarav & Ananya",
    subtitle: "Request The Honour Of Your Presence",
    sealInitials: ["A", "A"],
    tapLabel: "Tap The Seal To Open",
  },

  // ── Background music ──────────────────────────────────────
  music: {
    src: "/audio/Sunehra.mp3",
    startAfterOpen: true,
  },

  // ── Hero — the printed invitation card ────────────────────
  hero: {
    mangalText: "॥ श्री गणेशाय नमः ॥",
    shlok: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    blessing: "With the blessings of Shri Ganesh\n& our beloved parents & elders",
    inviteLine: "You are cordially invited to celebrate\nthe sacred union of",
    joiner: "and",
    dayNumber: "30",
    monthLabel: "November",
    yearLabel: "2026",
    sacredVerse: "Two families, two hearts, and a lifetime of togetherness begin with seven sacred vows.",
    teaserLabel: "An Auspicious Celebration Awaits",
    scrollLabel: "Scroll to unveil the celebration",
  },

  // ── Scratch-to-reveal card ────────────────────────────────
  scratch: {
    eyebrow: "A Little Secret",
    heading: "Scratch To Reveal The Date",
    coverText: "Scratch To Reveal The Date",
    revealTitle: "॥ Mangal Milan ॥",
    revealDate: "30 November 2026",
    revealDay: "Save the date — we can't wait to celebrate with you.",
  },

  // ── Journey / timeline ────────────────────────────────────
  journey: {
    eyebrow: "Our Story",
    heading: "A love written in little moments",
    subtitle:
      "Two families, one promise, and a lifetime that starts the moment our hands are taken in yours too.",
        milestones: [
      {
        year: "THE BEGINNING",
        title: "THE BEGINNING",
        text: "A serendipitous meeting at a mutual friend's gathering sparked conversations that lasted until dawn.",
      },
      {
        year: "THE FIRST DATE",
        title: "THE FIRST DATE",
        text: "Over warm artisan coffee and quiet laughter, simple moments started feeling like forever.",
      },
      {
        year: "TWO FAMILIES, ONE PROMISE",
        title: "TWO FAMILIES, ONE PROMISE",
        text: "With blessings, shared laughter, and happy tears from both families, our union was sealed.",
      },
      {
        year: "FOREVER BEGINS",
        title: "AARAV & ANANYA",
        text: "Aarav & Ananya step into eternity under starlit skies with seven sacred vows.",
      },
    ],
  },

  // ── Gallery ───────────────────────────────────────────────
  gallery: {
    eyebrow: "Moments We Treasure",
    heading: "A thousand memories. One beautiful journey",
    photos: [
      { src: "/images/Moments/Moment-1.jpg", alt: "And then, We met" },
      { src: "/images/Moments/Moment-2.jpg", alt: "Somewhere between “Us” and forever" },
      { src: "/images/Moments/Moment-3.jpg", alt: "He asked, She said yes… and forever began" },
    ],
  },

  // ── Invitation message ────────────────────────────────────
  message: {
    headline: "With hearts full of joy and gratitude, we invite you to be part of our forever.",
    lines: [
      "As we take this beautiful step into a new chapter of our lives, we would be honoured to have you beside us — through every ritual, every celebration, and every joyous moment.",
      "Your presence will make our celebration truly unforgettable.",
    ],
  },

  // ── Event details (main venue / ceremony) ─────────────────
  event: {
    eyebrow: "WHERE WE GATHER",
    venue: "The Grand Heritage Palace & Lawns",
    city: "Udaipur, Rajasthan",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=City+Palace%2C+Udaipur%2C+Rajasthan",
    startISO: "2026-11-30T17:00:00+05:30",
    endISO: "2026-11-30T21:00:00+05:30",
    calendarTitle: "Aarav & Ananya's Wedding — Saat Vachan",
    calendarDetails: "The Phera Ceremony — Aarav & Ananya's Royal Wedding Celebration",
    calendarLocation: "The Grand Heritage Palace & Lawns, Udaipur, Rajasthan",
    transit: {
      train: {
        label: "BY TRAIN",
        badge: "Direct cab ride",
        route: "Udaipur City Railway Station (UDZ)",
        description:
          "Udaipur City Railway Station (UDZ) — ~15 mins direct cab ride.",
      },
      road: {
        label: "BY AIR",
        badge: "Maharana Pratap Airport",
        route: "Maharana Pratap Airport (UDR)",
        description:
          "Maharana Pratap Airport (UDR) — ~35 mins drive to palace.",
      },
    },
  },

  // ── Celebration events / functions ────────────────────────
  events: {
    eyebrow: "Shubh Kaaryakram",
    heading: "The Celebration Events",
    subtitle: "Every ritual, every celebration — we want you there for it all.",
    items: [
      {
        icon: "haathKaam",
        title: "Haath Kaam",
        tagline: "A sacred beginning filled with blessings, family, and auspicious rituals.",
        date: "Saturday, 28 November 2026",
        time: "11:00 AM onwards",
        venue: "The Courtyard Pavilions",
        poster: "/images/Events/HaathKaam.png",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=City+Palace%2C+Udaipur%2C+Rajasthan",
        startDateISO: "20261128T053000Z",
        endDateISO: "20261128T083000Z",
        showDirections: true,
        showCalendar: true,
      },
      {
        icon: "mehndi",
        title: "Mehndi",
        tagline: "An afternoon and evening of intricate henna, laughter, and joyful beginnings.",
        date: "Saturday, 28 November 2026",
        time: "02:00 PM onwards",
        venue: "Royal Poolside Lawns",
        poster: "/images/Events/Mehndi.png",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=City+Palace%2C+Udaipur%2C+Rajasthan",
        startDateISO: "20261128T083000Z",
        endDateISO: "20261128T123000Z",
        showDirections: false,
        showCalendar: true,
      },
      {
        icon: "bhat",
        title: "Maayera (Mayera Batisi)",
        tagline: "Mayera Batisi — honoring ancestral roots with maternal love, shagun, and timeless joy.",
        date: "Sunday, 29 November 2026",
        time: "11:00 AM onwards",
        venue: "Grand Darbar Hall",
        poster: "/images/Events/Bhaat.png",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=City+Palace%2C+Udaipur%2C+Rajasthan",
        startDateISO: "20261129T053000Z",
        endDateISO: "20261129T093000Z",
        showDirections: false,
        showCalendar: true,
      },
      {
        icon: "tilak",
        title: "Tilak & Sangeet",
        tagline: "A cherished family blessing followed by an evening of music, movement, and royal revelry.",
        date: "Sunday, 29 November 2026",
        time: "06:30 PM onwards",
        venue: "The Palace Amphitheatre",
        poster: "/images/Events/Tilak.png",
        galleryPoster: "/images/Events/Sangeet.png",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=City+Palace%2C+Udaipur%2C+Rajasthan",
        startDateISO: "20261129T113000Z",
        endDateISO: "20261129T123000Z",
        showDirections: false,
        showCalendar: true,
      },
      {
        icon: "haldi",
        title: "Haldi",
        tagline: "A golden touch of turmeric, a splash of fragrant rosewater, and pure joy.",
        date: "Monday, 30 November 2026",
        time: "11:00 AM onwards",
        venue: "Fragrance Gardens",
        poster: "/images/Events/Haldi.png",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=City+Palace%2C+Udaipur%2C+Rajasthan",
        startDateISO: "20261130T053000Z",
        endDateISO: "20261130T093000Z",
        showDirections: false,
        showCalendar: true,
      },
      {
        icon: "wedding",
        title: "Baarat & Saat Vachan",
        tagline: "Seven sacred steps, two souls united, and an eternity of togetherness.",
        date: "Monday, 30 November 2026",
        time: "05:00 PM onwards",
        venue: "Heritage Raj Mandap",
        poster: "/images/Events/Phera.png",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=City+Palace%2C+Udaipur%2C+Rajasthan",
        startDateISO: "20261130T113000Z",
        endDateISO: "20261130T173000Z",
        showDirections: true,
        showCalendar: true,
      },
    ],
  },

  // ── Countdown section ─────────────────────────────────────
  countdown: {
    eyebrow: "Counting The Moments",
    heading: "Until We Say Forever",
  },

  // ── RSVP ──────────────────────────────────────────────────
  rsvp: {
    eyebrow: "RSVP",
    heading: "Will You Celebrate With Us?",
    namePlaceholder: "e.g. Rohan Sharma",
    guestsPlaceholder: "Number of Guests",
    messagePlaceholder: "Drop a blessing, song recommendation, or sweet wish...",
    submitLabel: "Send Wishes",
    successTitle: "Thank you!",
    successText: "Your wishes mean the world to us. See you at the celebration!",
    whatsappNumber: "919876543210",
  },

};

export default siteConfig;