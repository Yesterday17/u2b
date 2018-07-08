const fs = require("fs");
const ytdl = require("ytdl-core");
const path = "./assets/VCyyUelzZZc";

if (fs.existsSync(path)) {
  fs.rmdirSync(path);
}

fs.mkdirSync(path);
ytdl("https://www.youtube.com/watch?v=VCyyUelzZZc", { quality: "highest" })
  .pipe(fs.createWriteStream(`${path}/video.flv`))
  .on("progress", (chunk, download, total) => {
    console.log(`Chunk: ${chunk}, Download: ${download}, Total: ${total}`);
  });
