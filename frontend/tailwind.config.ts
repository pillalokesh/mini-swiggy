import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        choco: "#2B1208",
        cocoa: "#4A2312",
        caramel: "#B86A2D",
        cream: "#F8EEDD",
        biscuit: "#F1D7B8",
        gold: "#E5B14B"
      },
      boxShadow: {
        dessert: "0 12px 32px rgba(69, 33, 15, 0.25)"
      },
      backgroundImage: {
        "dessert-glow": "radial-gradient(circle at top right, rgba(229,177,75,0.25), transparent 45%), linear-gradient(160deg, #2B1208 0%, #4A2312 52%, #6D3216 100%)"
      }
    }
  },
  plugins: []
};

export default config;
