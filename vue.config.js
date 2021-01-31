/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const publicPath = process.env.NODE_ENV === 'production' ? '/public' : '/';

module.exports = {
  publicPath, // equ process.env.BASE_URL
  pages: {
    admin: {
      entry: 'src/views/admin/app.ts',
      template: 'src/views/admin/app.pug',
    },
    nkpc: {
      entry: 'src/views/nkpc/app.ts',
      template: 'src/views/nkpc/app.pug',
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `$publicPath: '${publicPath}';`,
        sassOptions: {
          indentedSyntax: false,
        },
      },
    },
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/nkpc/, to: '/nkpc.html' },
        { from: /\/admin/, to: '/admin.html' },
      ],
    },
    https: {
      // ❯ openssl genrsa -out privatekey.pem 1024
      // ❯ openssl req -new -key privatekey.pem -out certrequest.csr
      // ❯ openssl x509 -req -in .\certrequest.csr -signkey .\privatekey.pem -out certificate.pem
      key: fs.readFileSync(path.join(__dirname, './public/cert/privatekey.pem')),
      cert: fs.readFileSync(path.join(__dirname, './public/cert/certificate.pem')),
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://acm.nankai.edu.cn',
    //     changeOrigin: true,
    //   },
    // },
  },
};
