import puppeteer from "puppeteer";

const getData = async () => {
    
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)

  const browser = await puppeteer.launch({
    "headless": true,
    "args": ["--fast-start", "--disable-extensions", "--no-sandbox"],
    "ignoreHTTPSErrors": true,
    // "headless": false,
    // defaultViewport: null,
});
  
  // Open a new page
  const page = await browser.newPage();


    await page.goto('https://rt1.apolloglobal.net/NoAuth/Login.html?', {
        waitUntil: "domcontentloaded",
    })

    console.log(`Authenticate RT User...`)
    await page.type('[name="user"]', 'jerome.encinares@apolloglobal.net')
    await page.type('[type="password"]', 'rome.ap0ll02k24')
    await page.click('[type="submit"]')

    console.log(`Navigate to RT1 Fintech SD Queue...`)
    await page.goto("https://rt1.apolloglobal.net/Search/Results.html?Query=Queue%20%3D%20%27PSC%20-%20FinTech%27%20AND%20Status%20%3D%20%27__Active__%27", {
        waitUntil: "domcontentloaded",
    });
    

    console.log(`Extracting Data...`)
    const datas = await page.evaluate(() => {
        const doc = document.querySelectorAll('tbody.list-item td.collection-as-table b a');
        const size = doc.length
        let tickets = [];

        // let array = doc[1].innerText;
        for (let index = 0; index <= size - 1; index++) {
            tickets.push(doc[index].innerText)
        }
        return { tickets }
    });

    console.log(datas);
    await browser.close();
};

getData();
