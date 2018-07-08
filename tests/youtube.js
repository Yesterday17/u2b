const fs = require("fs");
const ytdl = require("ytdl-core");

ytdl("https://www.youtube.com/watch?v=VCyyUelzZZc", { quality: "highest" })
  .pipe(fs.createWriteStream("./assets/VCyyUelzZZc/video.flv"))
  .on("progress", (chunk, download, total) => {
    console.log(`Chunk: ${chunk}, Download: ${download}, Total: ${total}`);
  });
