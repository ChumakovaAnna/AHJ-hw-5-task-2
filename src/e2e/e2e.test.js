import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // default puppeteer timeout

describe("test", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("PopUp Renderer", async () => {
    await page.goto(baseUrl);
    const button = await page.$("[data-btn=add]");
    await button.click();
    await page.waitForSelector("[class=popup]");
  });

  test("PopUp with error", async () => {
    await page.goto(baseUrl);
    const button = await page.$("[data-btn=add]");
    await button.click();
    const popup = await page.$("[class=popup]");
    const inputPrice = await popup.$("[data-name=price]");
    inputPrice.type = "asdasd";
    const submit = await popup.$("[data-btn=submit]");
    submit.click();
    await page.waitForSelector("[class=error]");
  });

  afterAll(async () => {
    await browser.close();
  });
});
