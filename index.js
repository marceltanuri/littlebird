const puppeteer = require('puppeteer');
const config = require('./config.json');
const { scrollPageToBottom } = require('puppeteer-autoscroll-down')
const notifier = require('node-notifier');


async function main() {
    const browser = await puppeteer.launch(
        {
            headless: false,
            userDataDir: __dirname + '/chrome_data'
        });

    const page = await browser.newPage();
    await page.goto(config.page);
    
    hasKeyword = await findKeyword(page, config.keyword)

    if(hasKeyword){
        const msg = `Keyword '${config.keyword}' was found`
        console.log(msg)
        notifier.notify({
            title: config.notificationTitle,
            message: msg,

          });
    }
    else{
        console.log(`Keyword '${config.keyword}' not found`)
    }
      
    await browser.close();
}
main();

async function findKeyword(page, keyword){

    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.waitForTimeout(1000);
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    
    let hasKeyword = data.includes(keyword)
    
    if(hasKeyword){
        return hasKeyword
    }

    await scrollPageToBottom(page, {
        size: 500,
        delay: 1000,
        stepsLimit : 80
      })
    
    await page.waitForTimeout(1000);

    const data2 = await page.evaluate(() => document.querySelector('*').outerHTML);
    return data2.includes(keyword)

}
