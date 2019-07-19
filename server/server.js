const Koa = require('koa');
const Router = require('koa-router');
const KoaStatic = require('koa-static');
const path = require('path');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');
const backendApp = new Koa();
const frontendApp = new Koa();
const backendRouter = new Router();
const frontendRouter = new Router();

const resolve = file => path.resolve(__dirname, file);

const serverBundle = require(resolve('../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(resolve('../dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(resolve('../dist/index.ssr.html'), 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: template,
  clientManifest: clientManifest
});

// const bundle = fs.readFileSync(resolve('../dist/server.bundle.js'), 'utf-8');
// const renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
//   template: fs.readFileSync(resolve('../dist/index.ssr.html'), 'utf-8')
// });

// 后端 Server
backendRouter.get('/', async (ctx, next) => {
  console.log('SSR index.html');
  // 这里用哪个 renderToString 的 promise 返回的 html 有问题, 没有样式
  try {
    const context = {
      url: ctx.url
    };
    const html = await renderer.renderToString(context);
    ctx.type = 'html';
    ctx.status = 200;
    ctx.body = html;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = '服务器内部错误';
  }
});

backendApp
  .use(backendRouter.routes())
  .use(backendRouter.allowedMethods());

backendApp.use(KoaStatic(resolve('../dist')));

backendApp.listen(3000, () => {
  console.log('服务器端渲染地址： http://localhost:3000');
});

// 前端 Server
frontendRouter.get('/', (ctx, next) => {
  console.log('Client index.html');
  let html = fs.readFileSync(resolve('../dist/index.html'), 'utf-8');
  ctx.type = 'html';
  ctx.status = 200;
  ctx.body = html;
});

frontendApp
  .use(frontendRouter.routes())
  .use(frontendRouter.allowedMethods());

frontendApp.use(KoaStatic(resolve('../dist')));

frontendApp.listen(3001, () => {
  console.log('浏览器端渲染地址： http://localhost:3001');
});
