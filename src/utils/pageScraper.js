const fs = require("fs");

const scraperObject = {
  url: "https://www.leagueoflegends.com/es-es/champions/",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navegando a ${this.url}...`);
    await page.goto(this.url);
    await page.waitForSelector(
      ".style__Wrapper-sc-13btjky-0.style__ResponsiveWrapper-sc-13btjky-4.kKksmy.SHyYQ"
    );

    const championLinks = await page.evaluate(() => {
      const links = document.querySelectorAll(
        ".style__Wrapper-sc-n3ovyt-0.style__ResponsiveWrapper-sc-n3ovyt-4.jMmGcS.iUmzcQ.style__Item-sc-13btjky-3.idPziT.isVisible.isFirstTime"
      );
      return Array.from(links).map((link) => link.getAttribute("href"));
    });

    let scrapeChampionPage = async (link) => {
      let championData = {};
      let newPage = await browser.newPage();
      await newPage.goto(`https://www.leagueoflegends.com${link}`);
      await newPage.waitForSelector(".style__Wrapper-sc-8gkpub-30.gmzlAV");
      await newPage.click('[data-testid="overview:seemorebutton"]');
      await newPage.waitForSelector('[data-testid="overview:description"]');

      championData["name"] = await newPage.$eval(
        '[data-testid="overview:title"]',
        (span) => span.textContent.trim()
      );
      championData["img"] = await newPage.$eval(
        '[data-testid="overview:backgroundimage"] img',
        (img) => img.src
      );
      championData["rol"] = await newPage.$eval(
        '[data-testid="overview:role"]',
        (div) => div.textContent.trim()
      );
      championData["description"] = await newPage.$eval(
        '[data-testid="overview:description"]',
        (p) => p.textContent.trim()
      );

      console.log(championData);

      await newPage.close();
      return championData;
    };

    let scrapedData = [];

    for (let link of championLinks) {
      let championData = await scrapeChampionPage(link);
      scrapedData.push(championData);
    }

    fs.writeFile(
      "champions.json",
      JSON.stringify(scrapedData, null, 2),
      (err) => {
        if (err) {
          console.error("Error al escribir en champions.json:", err);
          return;
        }
        console.log("Datos de los campeones guardados en champions.json");
      }
    );
  },
};

module.exports = scraperObject;
