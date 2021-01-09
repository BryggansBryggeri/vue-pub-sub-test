/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const colors = require("tailwindcss/colors");
/* eslint-enable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

module.exports = {
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
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
    extend: {},
  },
  plugins: [],
};
