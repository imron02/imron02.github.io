// @ts-check
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://imron02.github.io",
  base: "/",
  output: "static",
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
