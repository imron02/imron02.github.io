document.querySelectorAll("[data-print-cv]").forEach((btn) => {
  btn.addEventListener("click", () => window.print());
});
