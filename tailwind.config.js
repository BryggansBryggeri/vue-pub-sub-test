const colors = require("tailwindcss/colors");

module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkTrueGray: "#121212",
        blue: {
          450: "#5F99F7"
        },
        blueGray: {
          950: "#000000"
        },
        "blue-gray": colors.trueGray
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
