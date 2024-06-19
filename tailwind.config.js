const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // Explicitly enable JIT mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(select|listbox|divider|popover|button|ripple|spinner|scroll-shadow).js"
  ],
  theme: {},
  plugins: [nextui()],
};
