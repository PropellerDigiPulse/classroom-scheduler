module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-custom-properties': { preserve: false },
    './postcss-shadow-fallback.cjs': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
      },
      browsers: ['last 2 versions', 'chrome 49', 'ie 11']
    }
  }
}
