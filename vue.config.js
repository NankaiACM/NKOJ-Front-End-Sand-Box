module.exports = {
  lintOnSave: false,

  pages: {
    index: {
      entry: 'src/page/index/app.js',
      template: 'src/page/index/app.pug',
    },
    admin: {
      entry: 'src/page/admin/app.js',
      template: 'src/page/admin/app.pug',
    },
    teriri: 'src/page/teriri/app.vue', // video player
  },

  publicPath: '/public',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
};
