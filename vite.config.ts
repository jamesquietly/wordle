import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { defineConfig, loadEnv } from "vite";

// Load environment variables
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

export default defineConfig({
  base: env.BASE_PATH || '/',
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "w-192.png", "w-512.png"],
      base: env.BASE_PATH || '/',
      manifest: {
        name: "Wordle",
        short_name: "Wordle",
        description:
          "A word guessing game where players try to guess a hidden 5-letter word in 6 attempts",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/wordle/",
        icons: [
          {
            src: "/wordle/w-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/wordle/w-512.png",
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
