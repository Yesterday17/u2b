const spawn = require("child_process").spawn;
const EventEmitter = require("events").EventEmitter;
const fs = require("fs");
const JSEncrypt = require("jsencrypt");

class bilibili extends EventEmitter {
  constructor(config) {
    super();

    this.username = config.username;
    this.password = config.password;
    this.title = config.title;
    this.desc = config.description;
    this.from = config.from | "";

    this.path = config.path;
  }

  setupUploadScript() {
    const file = `../assets/${path}/upload.py`;
    fs.writeFileSync(
      file,
      `from bilibiliupload import *
b = Bilibili()
b.login(${username}, ${this.password})
b.upload(...)`,
      { encoding: "utf-8" }
    );
  }

  async login() {
    const combine = await fetch(
      `http://passport.bilibili.com/web/captcha/combine?plat=2`
    ).then(v => v.json());
    const rsa = await fetch(
      `http://passport.bilibili.com/login?act=getkey&_=${new Date().getTime()}`
    ).then(key => key.json());

    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(rsa);

    const form = {};
    form.username = this.username;
    form.password = encrypt.encrypt(rsa.hash + this.password);
    form.keep = 1;
    form.key = combine.data.result.key;
    form.captchaType = 2;

    console.log(form);
  }

  async upload() {
    const process = spawn("python", [`../assets/${path}/upload.py`]);
  }
}

module.exports = bilibili;
