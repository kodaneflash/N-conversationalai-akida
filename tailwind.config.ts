import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors (Velvet Pink Series)
        velvet: {
          300: "#F7A5B5", // Subtle tint
          500: "#F97187", // CTA button pink - call-to-action
          600: "#F97086", // Logo pink - signature brand color
          700: "#EC5A7A", // Primary brand pink - used widely
        },
        // Core Surface Colors (Obsidian Series)
        obsidian: {
          700: "#1F1F1F", // Hover surface states
          800: "#171717", // Deeper surface elements
          900: "#1A1A1A", // Card backgrounds
          950: "#131313", // Main app background (darkest)
        },
      },
    },
  },
};

export default config;
