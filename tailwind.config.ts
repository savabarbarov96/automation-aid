
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
        background: "#1A1F2C",
        foreground: "#F6F6F7",
        primary: {
          DEFAULT: "#9b87f5",
          foreground: "#1A1F2C",
        },
        secondary: {
          DEFAULT: "#403E43",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#9b87f5",
          foreground: "#1A1F2C",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#221F26",
          foreground: "#F6F6F7",
        },
        card: {
          DEFAULT: "#2A2D3A",
          foreground: "#F6F6F7",
        },
        cool: {
          100: "#2A2D3A",
          200: "#353744",
          300: "#F6F6F7",
          400: "#F6F6F7",
          500: "#9b87f5",
          600: "#8B5CF6",
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
            transform: "translate(0px, 0px) scale(1) skew(0deg, 0deg)",
          },
          "25%": {
            transform: "translate(50px, -40px) scale(1.2) skew(-5deg, 3deg)",
          },
          "50%": {
            transform: "translate(-30px, 50px) scale(0.8) skew(5deg, -3deg)",
          },
          "75%": {
            transform: "translate(40px, 30px) scale(1.1) skew(-3deg, 5deg)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1) skew(0deg, 0deg)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        "blob": "blob 8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
