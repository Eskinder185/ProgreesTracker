/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: {100:"#ede9fe",500:"#8b5cf6",600:"#7c3aed"} },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,0.06)" },
      backgroundImage: { "hero-gradient":"linear-gradient(180deg,#ffe5f3 0%,#e6ebff 50%,#f6f8ff 100%)" }
    }
  },
  plugins: []
}

