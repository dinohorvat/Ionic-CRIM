// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {
  copyAssets: {
    src: ['{{SRC}}/assets/**/*'],
    dest: '{{WWW}}/assets'
  },
  copyIndexContent: {
    src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
    dest: '{{WWW}}'
  },
  copyFonts: {
    src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyBootstrap: {
    src: ['{{ROOT}}/node_modules/bootstrap/dist/css/*',
      '{{ROOT}}/node_modules/bootstrap/dist/js/*',
      '{{ROOT}}/node_modules/jquery/dist/*'
    ],
    dest: '{{WWW}}/assets/bootstrap'
  },
  copyGlyphIcons: {
    src: ['{{ROOT}}/node_modules/bootstrap/fonts/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyTheme: {
    src: ['{{ROOT}}/src/assets/sass/**'],
    dest: '{{BUILD}}/assets/theme'
  },
  copyPolyfills: {
    src: [`{{ROOT}}/node_modules/ionic-angular/polyfills/${process.env.IONIC_POLYFILL_FILE_NAME}`],
    dest: '{{BUILD}}'
  },
  copySwToolbox: {
    src: ['{{ROOT}}/node_modules/sw-toolbox/sw-toolbox.js'],
    dest: '{{BUILD}}'
  },
  copyPrimeng: {
    src: ['{{ROOT}}/node_modules/primeng/resources/themes/omega/theme.css', '{{ROOT}}/node_modules/primeng/resources/primeng.min.css', '{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css'],
    dest: '{{BUILD}}/assets/css'
  },
  copyRoboto: {
    src: ['{{ROOT}}/node_modules/primeng/resources/themes/omega/fonts/roboto-v15-latin-regular.eot',
      '{{ROOT}}/node_modules/primeng/resources/themes/omega/fonts/roboto-v15-latin-regular.svg',
      '{{ROOT}}/node_modules/primeng/resources/themes/omega/fonts/roboto-v15-latin-regular.ttf',
      '{{ROOT}}/node_modules/primeng/resources/themes/omega/fonts/roboto-v15-latin-regular.woff',
      '{{ROOT}}/node_modules/primeng/resources/themes/omega/fonts/roboto-v15-latin-regular.woff2'],
    dest: '{{BUILD}}/assets/css/fonts'
  },
    copyFontAwesome: {
    src: ["{{ROOT}}/node_modules/font-awesome/fonts/**/*"],
    dest: "{{BUILD}}/assets/fonts"
  }
};
