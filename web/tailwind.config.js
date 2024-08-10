/** @type {import('tailwindcss').Config} */
module.exports = {
  //darkMode: "selector",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        dark1: "hsl(0, 0%, 13%)",
        dark2: "hsl(232, 11%, 27%)",
        "button-normal": "hsl(211, 34%, 45%)",
        "button-clicked": "hsl(211, 44%, 56%)",
      },
    },
  },
  plugins: [],
};
