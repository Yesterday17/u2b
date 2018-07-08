const ffmpeg = require("fluent-ffmpeg");
const path = `./assets/VCyyUelzZZc`;

ffmpeg(`${path}/video.flv`).screenshots({
  count: 1,
  folder: path,
  filename: "cover.png",
  size: "1146x717"
});
