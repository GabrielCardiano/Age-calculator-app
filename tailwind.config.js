/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins"]
      },
      colors: {
        "primary-purple": "hsl(259, 100%, 65%)",
        "red": {
          ligth: "hsl(0, 100%, 67%)",
        },
        "off-white": "hsl(0, 0%, 94%)",
        "light-grey": "hsl(0, 0%, 86%)",
        "smokey-grey": "hsl(0, 1%, 44%)",
        "off-black": "hsl(0, 0%, 8%)",
      },
      borderRadius: {
        "border-card": "20px 20px 100px 20px"
      }
    },
  },
  plugins: [],
}