# sandbox

当前 vue 版本为 vue3, cli 版本为 vue-cli4, 语法扩展 vue-class-component.

ant-design-vue 在 admin 中使用, 版本 为 2.x.

bulma 在 nkpc 中使用, 版本 0.9.1.

其他见 package.json.

admin 中主要为 ts, nkpc 中主要为 js, 保持原状.

与后端的接口交互封装在 `src/typescript/api.ts` 中, 相关类型见 `src/types/interface.d.ts`.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### 开始跨域预览
```
npm run chrome
```
入口 url 形如 https://localhost:8080/admin.html#/ https://localhost:8080/nkpc.html#/

关于 vue-router 的 base url 用法及作用形式请请查阅 https://next.router.vuejs.org/api/#createwebhashhistory

关于 vue.config.js 的 publicPath 请查阅 https://cli.vuejs.org/zh/config/#publicpath

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
