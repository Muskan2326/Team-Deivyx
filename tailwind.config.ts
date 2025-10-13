import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "hsl(var(--secondary-light))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: "hsl(var(--accent-light))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-calm': 'var(--gradient-calm)',
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'glow': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'gentle-pulse': 'gentle-pulse 8s ease-in-out infinite',
        'float-particles': 'float-particles 20s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'wave-flow': 'wave-flow 8s ease-in-out infinite',
        'typing-bounce': 'typing-bounce 1.4s ease-in-out infinite both',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "wave-flow": {
          "0%, 100%": {
            transform: "translateX(0) translateY(0) scale(1)",
          },
          "33%": {
            transform: "translateX(-50px) translateY(-10px) scale(1.02)",
          },
          "66%": {
            transform: "translateX(50px) translateY(10px) scale(0.98)",
          },
        },
        "float-particles": {
          "0%": {
            transform: "translateY(100vh) rotate(0deg)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
          },
          "90%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-100vh) rotate(360deg)",
            opacity: "0",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "gentle-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "0.8",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "0.6",
          },
        },
        "breathe": {
          "0%, 100%": {
            transform: "scale(1) rotate(0deg)",
          },
          "50%": {
            transform: "scale(1.02) rotate(1deg)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
