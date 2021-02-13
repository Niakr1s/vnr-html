const homepage = 'https://www.deepl.com/translator';

const newBrowser = () => {
  let _browser;

  const getBrowser = async () => {
    if (_browser) return _browser;
    _browser = require('puppeteer-core').launch({executablePath: '/usr/bin/chromium'});
    return _browser;
  }
  getBrowser();

  const closeBrowser = async () => { await (await getBrowser()).close() }

  return {
    getBrowser,
    closeBrowser,
  };
}

const { getBrowser, closeBrowser } = newBrowser();

const getNewPage = async () => await (await getBrowser()).newPage();

module.exports = {

  async translate(options = { sourceLangauge, targetLanguage, sentence }) {
    options = {
      sourceLangauge: 'auto',
      targetLanguage: 'en',
      sentence: '',

      ...options,
    }

    let page = await getNewPage();
    let url = `${homepage}#${options.sourceLanguage}/${options.targetLanguage.slice(0, 2)}/${options.sentence}`;
    await page.goto(url);
    await page.waitForSelector('.lmt__rating-up', { visible: true });

    const translation = await page.$eval('#target-dummydiv', el => el.textContent) || '';

    page.close();

    return {
      translation,
    };
  },

  translateEnd: closeBrowser,
}