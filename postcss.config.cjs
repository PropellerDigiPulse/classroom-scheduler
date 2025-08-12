module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ Tailwind v4 PostCSS plugin
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': { preserve: false },
        'nesting-rules': true
      },
      browsers: ['Chrome 49', 'ie 11']
    }
  }
}
