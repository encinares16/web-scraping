import puppeteer from "puppeteer";
import 'dotenv/config'
import ps from "prompt-sync"

const prompt = ps();

const getList = async () => {
    
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)

    const browser = await puppeteer.launch({
        // "headless": true,
        "args": ["--fast-start", "--disable-extensions", "--no-sandbox"],
        "ignoreHTTPSErrors": true,
        "headless": false,
        defaultViewport: null,
    });
 
    const page = await browser.newPage();
    const url = 'https://testpay.cliqq.net/';

    console.log(`App starting ...`)
    await page.goto(`${url}login/auth`, {
        waitUntil: "domcontentloaded",
    })

    console.log(`Authenticate User...`)
    await page.type('[name="j_username"]', process.env.SEVEN_CONNECT_USERNAME)
    await page.type('[name="j_password"]', process.env.SEVEN_CONNECT_PASS)
    await page.click('[type="submit"]')

    console.log(`Navigate to 7connect...`)
    await page.reload()
    
    console.log(`Welcome 7-connect dashboard...`)

    const reference = [
        '2428-3000-0052'
    ]

    await page.click('[id="clearDateCreatedFrom"]')    

    await page.type('[id="sevenPayID"]', reference[0])
    await page.click('[value="Search"]')

    await page.evaluate(() => {
        document.querySelector('.list table tbody tr td > a').click();
    });

    // const elementHandle = await page.waitForSelector('.list table tbody tr td > a');
    // await elementHandle.click();

    // await page.click('.list table tbody tr td > a');

    // const datas = await page.evaluate(() => {
    //     const doc = document.querySelectorAll('tbody.list-item td.collection-as-table a');
       
    //     const size = doc.length
    //     let tickets = [];

    //     // const status = document.querySelectorAll(`tbody[data-index="${11}"] .collection-as-table .value span`)[1].innerText
    //     // let array = doc[1].innerText;
    //     for (let index = 0; index <= size - 1; index++) {
    //         tickets.push(doc[index].innerText)
    //     }
    //     return { tickets }
    // });

    // console.log(datas);

    // await new Promise(r => setTimeout(r, 5000));
    // let data = await page.evaluate(() => {
    //     let reasonCode = document.querySelector('.noborder tbody tr:nth-child(23) td:last-child').innerHTML
    //     const stats = {
    //         sevenpayid: reference[0],
    //         reasonCode: reasonCode.slice(reasonCode.lastIndexOf(" ")).trim()
    //     }

    //     return stats
    // });


    await new Promise(r => setTimeout(r, 5000));
    await browser.close();

};

getList();
