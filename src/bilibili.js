const puppeteer = require("puppeteer");
const debug = false;

try {
  (async () => {
    const config = require("./config");
    let browser;

    if (debug) {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
        devtools: false
      });
    } else {
      browser = await puppeteer.launch({ slowMo: 250 });
    }

    const page = await browser.newPage();

    const addTag = async content => {
      const tag = await page.waitForSelector(
        `[placeholder="按回车键Enter创建标签"]`
      );
      await tag.type(content);
      await tag.press("Enter");
    };

    const addCookie = async cookie => {
      await page.setCookie({
        domain: ".bilibili.com",
        url: config.url,
        name: cookie,
        value: config[cookie] || process.env["u2b_" + cookie]
      });
    };

    const clickNode = async (selector, times = 1) => {
      let item = await page.waitForSelector(selector);

      for (let i = 0; i < times; i++) {
        await item.click();
      }
    };

    const addLocalStorage = async (key, value) => {
      await page.evaluate(
        (key, value) => {
          localStorage.setItem(key, value);
        },
        key,
        value
      );
    };

    const upload = async (selector, file) => {
      const upload = await page.waitForSelector(selector);
      await upload.uploadFile(file);
    };

    const delText = async selector => {
      await page.click(selector);
      await page.keyboard.down("Control");
      await page.keyboard.press("KeyA");
      await page.keyboard.up("Control");
      await page.keyboard.press("Backspace");
    };

    const setText = async (selector, text) => {
      await delText(selector);
      const textBox = await page.waitForSelector(selector);
      await textBox.type(text);
    };

    // Cookies
    await addCookie("bili_jct");
    await addCookie("SESSDATA");
    await addCookie("DedeUserID");
    console.log(`[log] Cookies set.`);

    // Gogo page
    await page.goto(config.url);

    // Clear UI (1/2)
    await addLocalStorage("bili_upload_v3_notify_1_alert", "null");

    // Upload Video File
    console.log(`[log] Video uploading...`);
    await upload(
      `[accept=".mp4,.flv,.avi,.wmv,.mov,.webm,.mpeg4,.ts,.mpg,.rm,.rmvb,.mkv"]`,
      config.video[0]
    );

    // Clear UI (2/2)
    await clickNode(".guide-tip-btn-v2-item", 3);
    await clickNode(".notify-v2-close");

    // Add Cover
    console.log(`[log] Cover uploading...`);
    if (config.autogen) {
      const selector = ".selector-item + ".repeat(config.select);
      await clickNode(selector.substring(0, selector.length - 2) + "> img");
    } else {
      await upload(`[accept="image/jpeg, image/jpg, image/png"]`, config.cover);
      await clickNode(".cover-chop-modal-v2-foot > div");
    }

    // Type
    console.log(`[log] Type setting...`);
    if (config.type) {
      await clickNode(
        ".check-radio-v2-container + .check-radio-v2-container > .check-radio-v2-box"
      );
      await setText(
        `[placeholder="转载视频请注明来源（例：转自http://www.xxxx.com/yyyy），注明来源会更快地通过审核哦"]`,
        config.from
      );
    }

    // Category
    console.log(`[log] Category setting...`);
    await clickNode(".selebox-box-v2-drop-icon");
    const container = await page.waitForSelector(".drop-cascader-container");
    const main_category = (await container.$$(".pre-item-content"))[
      config.category[0]
    ];
    await main_category.click();

    const container_sub = await page.waitForSelector(".drop-cascader-list-wrp");
    const sub_category = (await container_sub.$$(".drop-cascader-list-item"))[
      config.category[1]
    ];
    await sub_category.click();

    // Tag
    console.log(`[log] Tag setting...`);
    for (let t in config.tags) {
      await addTag(config.tags[t]);
    }

    // Description
    console.log(`[log] Description setting...`);
    await setText(`.text-area-box-v2-val`, config.description);

    // Commercial
    console.log(`[log] Commercial setting...`);
    if (config.commercial) {
      await clickNode(`#more-selector-v2`);
      await clickNode(
        `.porder-set-v2-check-radio-group > .check-radio-v2-container + .check-radio-v2-container > .check-radio-v2-box`
      );
    }

    // Dynamic
    console.log(`[log] Dynamic setting...`);
    await setText(
      `.fans-dynamic-v2-input-wrp > .text-area-box-v2-container > .text-area-box-v2-val`,
      config.dynamic
    );

    await page.screenshot({ path: "content-successful.png", fullPage: true });

    // Upload finish
    console.log(`[log] Upload finished.`);
    await page.waitForSelector(`.item-upload-progress-complete`, {
      timeout: 3600000
    });

    // Title
    console.log(`[log] Title setting...`);
    await setText(
      `.content-title-v2-input-wrp .input-box-v2-1-val`,
      config.title
    );

    await page.screenshot({ path: "upload-successful.png", fullPage: true });

    // Submit Form
    console.log(`[log] Submitting...`);
    // await clickNode(`.submit-btn-group-add`);

    // Debug screenshot
    await page.screenshot({ path: "submit-successful.png", fullPage: true });

    // Close browser
    await browser.close();
  })();
} catch (e) {
  console.error(`[Err] ${e.message}`);
  if (e.message === "Cannot find module './config'") {
    console.error(`[Err] You should configure your 'config.js' correctly!`);
  }
}
