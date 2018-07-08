const fs = require("fs");
const Koa = require("koa");
const Router = require("koa-router");
const ytdl = require("ytdl-core");

const app = new Koa();
const router = new Router();

router.get("/v/watch", (ctx, next) => {
  const url = `https://www.youtube.com/watch?${ctx.request.querystring}`;
  console.log(`${ctx.request.ip} is creating a download of ${url}`);
  ctx.response.body = `${ctx.request.ip} is creating a download of ${url}`;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(9527);
