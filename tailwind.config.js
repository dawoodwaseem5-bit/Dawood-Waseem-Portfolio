/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        geistmono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "#10b981",
          light: "#059669",
          dark: "#34d399",
        },
      },
    },
  },
  plugins: [],
};
