/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./frontend/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(30 41 59)",
        secondary: "#F7D1CD",
        "grey-subtle": "rgb(220, 220, 221)",
        "dark-subtle": "rgba(255,255,255,0.5)",
        "light-subtle": "rgba(39,39,39,0.5)",
        "dark-purple": "#EC4067",
        light: "#FFF",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
