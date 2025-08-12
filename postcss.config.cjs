module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': { preserve: false },
        'nesting-rules': true,
      },
      browsers: ['last 2 versions', 'chrome 49', 'ie 11']
    }
  }
}

