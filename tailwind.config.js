/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],

  darkMode: "media",

  theme: {
    extend: {
      screens: {
        desktop: "855px",
      },
      cursor: {
        pointer: "url('/icons/cursor.png'), pointer",
      },
      colors: {
        Orange: "hsl(26, 100%, 55%)",
        "Pale-orange": "hsl(25, 100%, 94%)",
        "Dark-grayish-blue": "hsl(219, 9%, 45%)",
        "Grayish-blue": "hsl(220, 14%, 75%)",
        "Light-grayish-blue": "hsl(223, 64%, 98%)",
        White: "hsl(0, 0%, 100%)",
        Black75: "hsl(0, 0%, 0%)", //(with 75% opacity for lightbox background)
      },
      fontSize: {
        base: "16px",
      },

      keyframes: {
        bounce: {
          "0%": { transform: "translateY(0)", opacity: "0.6" },
          "100%": { transform: "translateY(-10px)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slideRight100": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slideLeft100": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "1" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-40%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-left": {
          "0%": { transform: "translateX(40%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },

        "pop-in": {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.3s ease-out forwards",
        "bounce": "bounce 0.6s infinite alternate",
        "fade-in": "fade-in 1s ease forwards",
        "slide-right": "slide-right 0.7s ease-in-out",
        "slide-left": "slide-left 0.7s ease-in-out",
        "slide-right-100": "slideRight100 0.4s ease-out",
        "slide-left-100": "slideLeft100 0.5s ease-out",
      },
    },
  },

  plugins: [],
};
