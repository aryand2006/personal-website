import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#eaf6fa",
        ink2: "#d5eef5",
        bone: "#0b2c38",
        boneDim: "#3d6574",
        signal: "#0f9e8f",
        steel: "#5a8494"
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        tightest: "-0.06em"
      }
    }
  },
  plugins: []
};

export default config;
