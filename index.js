const puppeteer = require('puppeteer');

async function getPic() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('https://www.google.com.br/search?q=dolar&oq=dolar&aqs=chrome..69i57j69i60l5.1131j0j4&sourceid=chrome&ie=UTF-8');

  const value = await page.evaluate(async () => {
    let result = await document.querySelector('.VgAgW .nRbRnb .dDoNo.vk_bk.gsrt .DFlfde').innerText;
  
    return {
      result
    }
  });
  //console.log(result.a)
  await browser.close();
}
