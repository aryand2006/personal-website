import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#061820",
        ink2: "#0a2834",
        bone: "#e8f7fa",
        boneDim: "#8fb8c6",
        signal: "#3de8d4",
        steel: "#5a8fa0"
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        tightest: "-0.06em"
      },
      boxShadow: {
        glass: "0 18px 50px rgba(0, 30, 45, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
