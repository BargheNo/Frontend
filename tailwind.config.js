module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your project structure
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/oxide")],
};
