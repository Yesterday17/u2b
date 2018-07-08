const bilibili = require("../src/bilibili");
const config = require("../src/config");
const path = `./assets/VCyyUelzZZc`;

let cfg = {
  video: [`${path}/video.flv`],
  cover: `${path}/cover.png`,

  type: 1,
  from: "https://www.youtube.com/watch?v=VCyyUelzZZc",

  title: "Forever Stranded LS Ep1 Oh No, not again",
  description: `I feel like a bowl of petunia's right about now. 

  Now Livestreaming at: https://mixer.com/Direwolf20`,
  tags: Array.from(new Set([...config.tags, "Minecraft", "direwolf20"])).slice(
    0,
    10
  ),
  dynamic: `#direwolf20# #Minecraft# #y2b#`
};

let bili = new bilibili();
bili.upload({ ...config, ...cfg });
bili.on("success", function(page) {
  console.log("Success!");
});
bili.on("error", function(e) {
  console.error(e.message);
});
