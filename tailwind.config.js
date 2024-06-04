/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      "light",
      {
        kyburz: {
          "primary": "#174198",
          "warning": "#FFA500",
          "error": "#FF1B1C"
        }
      }
    ]
  }
}

