const bilibili = require("../src/bilibili");
const path = `./assets/VCyyUelzZZc`;

let cfg = {
  video: [`${path}/video.flv`],
  cover: `${path}/cover.png`,

  title: "Forever Stranded LS Ep1 Oh No, not again",
  description: `I feel like a bowl of petunia's right about now. 

  Now Livestreaming at: https://mixer.com/Direwolf20`,
  tags: Array.from(new Set([...config.tags, "Minecraft", "direwolf20"])).slice(
    0,
    10
  )
};

new bilibili()
  .upload({ ...config, ...cfg })
  .on("success", function(page) {
    console.log("Success!");
  })
  .on("error", function(e) {
    console.error(e.message);
  });
