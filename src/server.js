const bilibili = require("./bilibili");
const config = require("./config");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const Koa = require("koa");
const Router = require("koa-router");
const ytdl = require("ytdl-core");

const app = new Koa();
const router = new Router();

let id = 0;

router.get("/v/watch", async (ctx, next) => {
  ctx.response.type = "application/json";

  if (ctx.request.query.v === undefined) {
    ctx.response.body = JSON.stringify(
      { message: "You must input param v!" },
      null,
      2
    );
    return;
  }

  const url = `https://www.youtube.com/watch?v=${ctx.request.query.v}`;
  const path = `../assets/${ctx.request.query.v}`;
  console.log(`${ctx.request.ip} is creating a download of ${url}`);

  // Download video.

  // Screenshot
  ffmpeg(`${path}/video.flv`).screenshots({
    count: 1,
    folder: path,
    filename: "cover.png",
    size: "1146x717"
  });

  // Upload
  let cfg = {
    video: [`${path}/video.flv`],
    cover: `${path}/cover.png`,

    title: "",
    description: "",
    tags: Array.from(new Set([...config.tags, ""])).slice(0, 10)
  };
  /*

  new bilibili().upload({ ...config, ...cfg }).on("success", function(page) {
    //
  });
  */
  ctx.response.body = JSON.stringify(
    { message: `${ctx.request.ip} is creating a download of ${url}` },
    null,
    2
  );
});

router.get("/", async (ctx, next) => {
  ctx.response.type = "html";
  ctx.response.body = fs.readFileSync("./statics/index.html");
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(9527);
