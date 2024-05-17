/** @type {import('tailwindcss').Config} */
module.exports = {
  //darkMode: "selector",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      FHD: "1921px",
    },
    extend: {
      colors: {
        light: "#FFFFFF",
        "light-2": "#E7ECF5",
        "btn-active-light": "#76A5D0",
        "btn-active-dark": "#44729B",
        "btn-active-text-light": "#FFFFFF",
        "btn-active-text-dark": "#FFFFFF",

        "btn-hover-light": "#468AC6",
        "btn-hover-dark": "#27537C",
      },
    },
  },
  plugins: [],
};
