module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},   // Tailwind v4 PostCSS plugin
    autoprefixer: {},             // Adds vendor prefixes for old browsers
    'postcss-preset-env': {       // Converts modern CSS to old syntax
      stage: 3,
      features: {
        'custom-properties': { preserve: false }, // Convert CSS variables
        'nesting-rules': true
      },
      browsers: ['last 2 versions', 'ie 11', 'chrome 49', 'samsung 4']
    }
  }
}
