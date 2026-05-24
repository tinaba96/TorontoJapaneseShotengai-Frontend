import type { Config } from "tailwindcss";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        jp: ["var(--font-noto-serif-jp)", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Legacy tokens kept so existing class names continue to work.
        "shinsaibashi-blue": "#1a1a3e",
        "shinsaibashi-orange": "#d4af37",
        // New brand palette: Wa-Modern Toronto.
        sakura: {
          50: "#fff5f8",
          100: "#ffe4ec",
          200: "#ffc4d6",
          300: "#ff97b6",
          400: "#ff6b9d",
          500: "#ff3d7f",
          600: "#e91c63",
          700: "#c2185b",
          800: "#9a1450",
          900: "#691239",
        },
        sumi: {
          50: "#f6f6f7",
          100: "#e1e1e6",
          200: "#c3c3cd",
          300: "#9a9aab",
          400: "#6b6b80",
          500: "#3a3a52",
          600: "#23233a",
          700: "#16162b",
          800: "#0d0d1f",
          900: "#070713",
        },
        gold: {
          50: "#fdf8e7",
          100: "#faecbb",
          200: "#f5dc83",
          300: "#eec74a",
          400: "#d4af37",
          500: "#b8941f",
          600: "#937414",
          700: "#6e5710",
          800: "#4a3a0b",
          900: "#2a2106",
        },
        washi: {
          50: "#fffdf7",
          100: "#fdf9e9",
          200: "#f9f0cc",
        },
        ink: "#0a0a14",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-sakura":
          "linear-gradient(135deg, #ff6b9d 0%, #ff3d7f 50%, #c2185b 100%)",
        "gradient-sumi":
          "linear-gradient(135deg, #16162b 0%, #0d0d1f 50%, #070713 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #f5dc83 0%, #d4af37 50%, #b8941f 100%)",
        "gradient-aurora":
          "linear-gradient(135deg, #ff6b9d 0%, #d4af37 50%, #16162b 100%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(255, 107, 157, 0.6)",
        "glow-gold": "0 0 40px -10px rgba(212, 175, 55, 0.55)",
        "glow-soft": "0 10px 40px -15px rgba(22, 22, 43, 0.35)",
        elegant:
          "0 30px 60px -30px rgba(22, 22, 43, 0.45), 0 18px 36px -18px rgba(22, 22, 43, 0.2)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.1)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-in-right":
          "slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
