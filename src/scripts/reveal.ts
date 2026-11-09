import { animate, inView } from "motion";

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReduced) {
  // Remove the hidden state instead of animating.
  document.querySelectorAll("[data-reveal]").forEach((el) => el.removeAttribute("data-reveal"));
} else {
  inView(
    "[data-reveal]",
    (el) => {
      animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    },
    { margin: "0px 0px -10% 0px" },
  );
}
