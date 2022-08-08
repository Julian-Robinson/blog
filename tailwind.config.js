const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "821px",
      lg: "1025px",
      xl: "1281px",
    },
    extend: {
      colors: {
        slateblue: "#2a4365",
      },
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        serif: ["Georgia", "Cambria"],
        display: ["Oswald"],
        body: ["Open Sans"],
      },
      typography: {
        DEFAULT: {
          css: {
            li: {
              margin: 0,
            },
            h1: {
              fontWeight: 300,
            },
            h2: {
              fontWeight: 300,
            },
            h3: {
              fontWeight: 300,
            },
            h4: {
              fontWeight: 300,
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
