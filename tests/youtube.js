const fs = require("fs");
const ytdl = require("ytdl-core");
const path = "./assets/-EbTk3toFgY";

if (fs.existsSync(path)) {
  fs.rmdirSync(path);
}

fs.mkdirSync(path);
const video = ytdl("https://www.youtube.com/watch?v=-EbTk3toFgY");

video.pipe(fs.createWriteStream(`${path}/video.flv`));
video.once("response", () => {
  starttime = Date.now();
});
video.on("progress", (chunkLength, downloaded, total) => {
  const floatDownloaded = downloaded / total;
  const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
  console.log(`${(floatDownloaded * 100).toFixed(2)}% downloaded`);
  console.log(
    `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
      total /
      1024 /
      1024
    ).toFixed(2)}MB)\n`
  );
  console.log(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
  console.log(
    `, estimated time left: ${(
      downloadedMinutes / floatDownloaded -
      downloadedMinutes
    ).toFixed(2)}minutes `
  );
});
video.on("end", () => {
  console.log("\n\n");
});
