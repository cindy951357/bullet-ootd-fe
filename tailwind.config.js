/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "var(--color-primary)",
          "primary-hovered": "oklch(var(--color-primary-hovered) / <alpha-value>)",
          "on-primary": "oklch(var(--color-on-primary) / <alpha-value>)",
  
          secondary: "oklch(var(--color-secondary) / <alpha-value>)",
          "secondary-hovered": "oklch(var(--color-secondary-hovered) / <alpha-value>)",
          "on-secondary": "oklch(var(--color-on-secondary) / <alpha-value>)",
  
          highlight: "oklch(var(--color-highlight) / <alpha-value>)",
        },
      },
    },
    plugins: [],
  };
  