import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "w-192.png", "w-512.png"],
      manifest: {
        name: "Wordle",
        short_name: "Wordle",
        description:
          "Wordle is a word game where players try to guess a hidden 5-letter word in 6 attempts. Each guess provides feedback on the position and presence of letters, helping players narrow down the possibilities and eventually solve the puzzle.",
        theme_color: "#000000",
        background_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        icons: [
          {
            src: "/w-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/w-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true, // Enable PWA in development
        type: "module",
        navigateFallback: "/",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
});
