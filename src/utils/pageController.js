const pageScraper = require("./pageScraper");

async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    let scrapedData = {};
    scrapedData["Champions"] = await pageScraper.scraper(browser);
    await browser.close();
    console.log(scrapedData);
  } catch (err) {
    console.log("No se pudo iniciar la instancia del navegador => ", err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
