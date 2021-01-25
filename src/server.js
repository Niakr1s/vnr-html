const { translate } = require('./scraper.js');

const PORT = 53532;
let serverWasStarted = false;

const startServer = () => {
  if (serverWasStarted) return;
  serverWasStarted = true;

  const server = require('express')();

  server.use(require('cors')());

  server.get('/translate/:sentence/:sourceLanguage/:targetLanguage', async (req, res) => {
    const options = {
      sentence: '',
      sourceLanguage: 'auto',
      targetLanguage: 'en',
      ...req.params,
    }
    
    const result = await translate({
      sentence: options.sentence,
      sourceLangauge: options.sourceLanguage,
      targetLanguage: options.targetLanguage,
    })

    res.end(JSON.stringify(result), () => {
      console.log(`${options.sourceLanguage} => ${options.targetLanguage}\n${options.sentence}\n${result.translation}\n`);
    });
  })

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Server have been started at ${PORT}`);
      resolve();
    });
  });
}

module.exports = {
  startServer,
}