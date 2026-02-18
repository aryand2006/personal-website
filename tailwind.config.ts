import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        secondaryBackground: "#111827",
        card: "#0F172A",
        primaryAccent: "#3B82F6",
        secondaryAccent: "#6366F1",
        mutedText: "#94A3B8",
        primaryText: "#F1F5F9"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(59, 130, 246, 0.25), 0 18px 60px rgba(15, 23, 42, 0.65)"
      },
      backgroundImage: {
        "radial-tech": "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.18), transparent 45%), radial-gradient(circle at 80% 30%, rgba(99,102,241,0.14), transparent 40%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
