const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    screens: {
      sm: "640px",
      md: "769px",
      lg: "1025px",
      xl: "1281px",
    },
    fontFamily: {
      sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      serif: ["Georgia", "Cambria"],
      display: ["Oswald"],
      body: ["Open Sans"],
    },
    typography: {
      default: {
        css: {
          li: {
            margin: 0,
          },
        },
      },
    },
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
