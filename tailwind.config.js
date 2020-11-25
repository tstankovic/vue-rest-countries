module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "light-text": "var(--light-mode-text)",
        "light-input": "var(--light-mode-input)",
        "light-bg": "var(--light-mode-bg)",
        "light-elements": "var(--light-mode-elements)",
        "dark-text": "var(--dark-mode-text)",
        "dark-bg": "var(--dark-mode-bg)",
        "dark-elements": "var(--dark-mode-elements)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
