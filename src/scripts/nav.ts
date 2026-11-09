const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
const nav = document.querySelector<HTMLElement>("[data-nav]");

if (toggle && nav) {
  const setState = (open: boolean) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setState(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setState(false));
  });
}
