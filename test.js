import puppeteer from "puppeteer";

async function scrapeWebsite(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url);

        await page.waitForSelector('.list-item');

        const elementText = await page.$eval('.list-item', el => el.textContent.trim());
        console.log('Extracted text:', elementText);


    } catch (error) {
        console.error('Error scraping the website:', error);
    } finally {
        await browser.close();
    }
}

scrapeWebsite('https://rt1.apolloglobal.net/Search/Results.html?Query=Queue%20%3D%20%27PSC%20-%20FinTech%27%20AND%20Status%20%3D%20%27__Active__%27');