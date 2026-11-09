// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://imron02.github.io",
  output: "static",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    locales: ["id", "en"],
    defaultLocale: "id",
    routing: { prefixDefaultLocale: false },
  },
});
