/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        btn: {
          background: "var(--btn-background)",
          "background-hover": "var(--btn-background-hover)",
        },
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
      },
    },
  },
  plugins: [],
};
