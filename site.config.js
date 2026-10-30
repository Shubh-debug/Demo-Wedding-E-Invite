/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — everything you'd want to customize lives here.
 *  Edit the values below and the whole site updates.
 * ─────────────────────────────────────────────────────────────
 */

const siteConfig = {
  // ── Couple ────────────────────────────────────────────────
  couple: {
    partner1: "Amal",
    partner2: "Neha",
    partner1Parents: "S/O Smt. Manju & Swargiya Uttam Kumar Ji Minny",
    partner2Parents: "D/O Smt. Babita & Shri Rajkumar Prasad",
    displayName: "Amal & Neha",
  },

  // ── Milestone ─────────────────────────────────────────────
  milestone: {
    label: "The Wedding Celebration",
  },

  // ── Opening seal (shown before the invitation) ─────────────
  opener: {
    mangalText: "॥ श्री गणेशाय नमः ॥",
    eyebrow: "An Auspicious Invitation Awaits",
    title: "Amal & Neha",
    subtitle: "Request The Honour Of Your Presence",
    sealInitials: ["A", "N"],
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
        title: "WRITTEN IN THE STARS",
        text: "From tentative first conversations and curious questions to late-night chats that flowed effortlessly, two worlds gently began weaving into one.",
      },
      {
        year: "8TH JULY 2026",
        title: "WHEN DESTINY SPOKE",
        text: "What started as a formal arranged meeting quickly turned into a quiet certainty. By the end of that first day, both families smiled, hearts aligned, and our rishta was officially sealed.",
      },
      {
        year: "29TH AUGUST 2026",
        title: "A WALK IN SILIGURI",
        text: "When Amal visited Neha’s home in Siliguri, an outing together made time stand still. It felt less like a second meeting and more like an eternity rekindled—the exact partner Amal had always dreamed of, brought together by pure destiny.",
      },
      {
        year: "FOREVER BEGINS • 30TH NOVEMBER 2026",
        title: "AMAL & NEHA",
        text: "Our next chapter begins in Kolkata with seven sacred vows, the blessing of our loved ones, and a lifetime of togetherness.",
      },
    ],
  },

  // ── Gallery ───────────────────────────────────────────────
  gallery: {
    eyebrow: "Moments We Treasure",
    heading: "A thousand memories. One beautiful journey",
    photos: [
      { src: "/images/Moments/Moment-1.jpg", alt: "And then, We met" },
      { src: "/images/Moments/Moment-2.jpeg", alt: "Somewhere between “Us” and forever" },
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
    eyebrow: "Where We Gather",
    venue: "Dada Bari Temple",
    city: "29, Badridas Temple Street, Kolkata",
    mapsUrl: "https://www.google.com/maps/place/Jain+Shwetambar+Dadaji's+Temple+%26+Garden+(Dadabari)/@22.5913722,88.3780392,17z/data=!4m6!3m5!1s0x3a02763ee717c01f:0xd234faca03076dc1!8m2!3d22.5912838!4d88.3788395!16s%2Fg%2F11ggb34p_s?entry=ttu&g_ep=EgoyMDI2MTAxOC4wIKXMDSoASAFQAw%3D%3D",
    startISO: "2026-11-30T17:00:00+05:30",
    endISO: "2026-11-30T21:00:00+05:30",
    calendarTitle: "Amal & Neha's Wedding — Saat Vachan",
    calendarDetails: "The Phera Ceremony — Amal & Neha's Wedding Celebration",
    calendarLocation: "Dada Bari Temple, Kolkata ",
    transit: {
      train: {
        label: "BY TRAIN & METRO",
        badge: "Via Green Line Metro",
        route: "Howrah Railway Station (HWH)",
        description:
          "Directly accessible from Howrah Station via the underwater East-West Metro (Green Line) or local suburban network, connecting seamlessly across Kolkata.",
      },
      road: {
        label: "BY ROAD & CABS",
        badge: "Via Howrah Bridge / Vidyasagar Setu",
        route: "Via Vidyasagar Setu (2nd Hooghly Bridge) / Kona Expressway",
        description:
          "Smooth transit via Yellow Cabs, Uber, and Ola across the bridge directly to the venue.",
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
        venue: "Shri Shitalnath Bhawan, Dada Bari Temple",
        poster: "/images/Events/HaathKaam.png",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Shri+Shitalnath+Bhawan%2C+Dada+Bari+Temple",
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
        time: "2:00 PM onwards",
        venue: "Shri Shitalnath Bhawan, Dada Bari Temple",
        poster: "/images/Events/Mehndi.png",
        mapUrl: "https://www.google.com/maps/place/Shitalnath+Bhawan/@22.5918498,88.3755762,17z/data=!3m1!4b1!4m6!3m5!1s0x3a02763ec5fe12a3:0xca73fc8f9aafd1e5!8m2!3d22.5918449!4d88.3781511!16s%2Fg%2F11f06m5fxj?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D", // Resort Location
        startDateISO: "20261128T083000Z",
        endDateISO: "20261128T123000Z",
        showDirections: false,
        showCalendar: true,
      },
      {
        icon: "bhat",
        title: "Maayera",
        tagline: "Mayera Batisi — honoring ancestral roots with maternal love, shagun, and timeless joy.",
        date: "Sunday, 29 November 2026",
        time: "11:00 AM onwards",
        venue: "Shri Shitalnath Bhawan, Dada Bari Temple",
        poster: "/images/Events/Bhaat.png",
        mapUrl: "https://www.google.com/maps/place/Shitalnath+Bhawan/@22.5918498,88.3755762,17z/data=!3m1!4b1!4m6!3m5!1s0x3a02763ec5fe12a3:0xca73fc8f9aafd1e5!8m2!3d22.5918449!4d88.3781511!16s%2Fg%2F11f06m5fxj?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D",
        startDateISO: "20261129T053000Z",
        endDateISO: "20261129T093000Z",
        showDirections: false,
        showCalendar: true,
      },
      {
        icon: "tilak",
        title: "Tilak",
        tagline: "A cherished family blessing marking the auspicious wedding celebrations.",
        date: "Sunday, 29 November 2026",
        time: "5:00 PM onwards",
        venue: "Shri Shitalnath Bhawan, Dada Bari Temple",
        poster: "/images/Events/Tilak.png",
        mapUrl: "https://www.google.com/maps/place/Shitalnath+Bhawan/@22.5918498,88.3755762,17z/data=!3m1!4b1!4m6!3m5!1s0x3a02763ec5fe12a3:0xca73fc8f9aafd1e5!8m2!3d22.5918449!4d88.3781511!16s%2Fg%2F11f06m5fxj?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D",
        startDateISO: "20261129T113000Z",
        endDateISO: "20261129T123000Z",
        showDirections: false,
        showCalendar: true,
      },
      {
        icon: "sangeet",
        title: "Sangeet",
        tagline: "Loud beats, high energy, and unforgettable moves — dance like nobody's watching!",
        date: "Sunday, 29 November 2026",
        time: "6:30 PM onwards",
        venue: "Shri Shitalnath Bhawan, Dada Bari Temple",
        poster: "/images/Events/Sangeet.png",
        mapUrl: "https://www.google.com/maps/place/Shitalnath+Bhawan/@22.5918498,88.3755762,17z/data=!3m1!4b1!4m6!3m5!1s0x3a02763ec5fe12a3:0xca73fc8f9aafd1e5!8m2!3d22.5918449!4d88.3781511!16s%2Fg%2F11f06m5fxj?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D",
        startDateISO: "20261129T130000Z",
        endDateISO: "20261129T170000Z",
        showDirections: false,
        showCalendar: true,
      },
      {
        icon: "haldi",
        title: "Haldi",
        tagline: "A golden touch of turmeric, a splash of fragrant rosewater, and pure joy.",
        date: "Monday, 30 November 2026",
        time: "11:00 AM onwards",
        venue: "Shri Shitalnath Bhawan, Dada Bari Temple",
        poster: "/images/Events/Haldi.png",
        mapUrl: "https://www.google.com/maps/place/Shitalnath+Bhawan/@22.5918498,88.3755762,17z/data=!3m1!4b1!4m6!3m5!1s0x3a02763ec5fe12a3:0xca73fc8f9aafd1e5!8m2!3d22.5918449!4d88.3781511!16s%2Fg%2F11f06m5fxj?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D",
        startDateISO: "20261130T053000Z",
        endDateISO: "20261130T093000Z",
        showDirections: false,
        showCalendar: true,
      },
      {
        icon: "wedding",
        title: "Baarat",
        tagline: "Seven sacred steps, two souls united, and an eternity of togetherness.",
        date: "Monday, 30 November 2026",
        time: "5:00 PM onwards",
        venue: "Shri Jinduttsuri Bhawan, Dada Bari Temple",
        poster: "/images/Events/Phera.png",
        mapUrl: "https://www.google.com/maps/place/Shree+Jinduttsuri+Bhawan/@22.5907818,88.3797769,17z/data=!3m1!4b1!4m6!3m5!1s0x3a0277007cc938f3:0xdf90f86ca1e508d7!8m2!3d22.5907818!4d88.3797769!16s%2Fg%2F11vxz1vtm2?entry=ttu&g_ep=EgoyMDI2MTAxOC4wIKXMDSoASAFQAw%3D%3D",
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
    namePlaceholder: "Guest Name",
    guestsPlaceholder: "Number of Guests",
    messagePlaceholder: "Message / Wishes",
    submitLabel: "Send Wishes",
    successTitle: "Thank you!",
    successText: "Your wishes mean the world to us. See you at the celebration!",
    whatsappNumber: "+918420028988",
  },

};

export default siteConfig;