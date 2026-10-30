import confetti from "canvas-confetti";

/**
 * Fires celebration confetti from both the left and right borders of the screen
 * matching the inspiration video.
 */
export default function fireConfetti() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  // Royal Wedding Color Palette: Champagne, Pure Gold, Soft Rose, Cream, Marigold
  const colors = ["#D4AF37", "#F3E2B8", "#C5A059", "#121D38", "#FBF7EE", "#8C6D37"];

  (function frame() {
    // Left Cannon firing inward and upward (angle: 60)
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.82 },
      colors: colors,
      scalar: 1.1,
      drift: 0.1,
      gravity: 0.9,
      ticks: 200,
    });

    // Right Cannon firing inward and upward (angle: 120)
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.82 },
      colors: colors,
      scalar: 1.1,
      drift: -0.1,
      gravity: 0.9,
      ticks: 200,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  })();
}