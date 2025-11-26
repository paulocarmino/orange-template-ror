/** @type {import('tailwindcss').Config} */

// AIDEV-NOTE: Tailwind v4 minimal config - theme moved to CSS
export default {
  darkMode: "class",
  content: [
    "./public/*.html",
    "./app/helpers/**/*.rb",
    "./app/frontend/**/*.{js,ts,jsx,tsx,vue,svelte}",
    "./app/views/**/*.{erb,haml,html,slim,js,ts,jsx,tsx,vue,svelte}",
  ],
}
