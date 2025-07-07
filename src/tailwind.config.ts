
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#1A1F2C", // Dark background
        foreground: "#F6F6F7",
        primary: {
          DEFAULT: "#88D06F", // More subtle green
          foreground: "#1A1F2C",
        },
        secondary: {
          DEFAULT: "#403E43",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#88D06F",
          foreground: "#1A1F2C",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#221F26", // Darker muted
          foreground: "#F6F6F7",
        },
        card: {
          DEFAULT: "#2A2D3A", // Dark card background
          foreground: "#F6F6F7",
        },
        cool: {
          100: "#2A2D3A", // Dark
          200: "#353744", // Slightly lighter
          300: "#F6F6F7", // Light text
          400: "#F6F6F7", // Light text
          500: "#88D06F", // Subtle green
          600: "#7AB964", // Darker green for hover
        }
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "25%": {
            transform: "translate(150px, -80px) scale(1.3)",
          },
          "50%": {
            transform: "translate(-100px, 100px) scale(0.7)",
          },
          "75%": {
            transform: "translate(80px, 60px) scale(1.2)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        "blob": "blob 12s cubic-bezier(0.4, 0, 0.2, 1) infinite", // Even faster animation
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
