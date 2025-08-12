const gapFallback = require('./postcss-gap-fallback.cjs');

module.exports = {
  plugins: [
    gapFallback(), // our custom gap fallback
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true,
      },
      browsers: ['last 2 versions', 'chrome 49', 'ie 11']
    })
  ]
};
