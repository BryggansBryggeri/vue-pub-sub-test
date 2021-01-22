/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const colors = require("tailwindcss/colors");
/* eslint-enable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

module.exports = {
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontSize: {
      xxs: "0.65rem",
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    extend: {
      cursor: ["disabled"],
      boxShadow: {
        yellow: "0 4px 14px 0 rgba(237, 160, 29, 0.39)",
      },
      colors: {
        darkTrueGray: "#121212",
        blue: {
          450: "#5F99F7",
        },
        blueGray: {
          950: "#000000",
        },
        "blue-gray": colors.trueGray,
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
};
