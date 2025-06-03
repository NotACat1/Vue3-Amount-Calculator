module.exports = {
  plugins: [
    ['mozjpeg', { quality: 80 }],
    ['pngquant', { quality: [0.65, 0.8] }],
    ['gifsicle', { optimizationLevel: 3 }],
    [
      'svgo',
      {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                removeUnknownsAndDefaults: false,
              },
            },
          },
        ],
      },
    ],
  ],
}
