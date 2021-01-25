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

    const { translation } = await translate({
      sentence: options.sentence,
      sourceLangauge: options.sourceLanguage,
      targetLanguage: options.targetLanguage,
    })

    const result = {
      translation,
      sentence: options.sentence,
      sourceLanguage: options.sourceLanguage,
      targetLanguage: options.targetLanguage,
    }

    const resultJSON = JSON.stringify(result);
    res.end(JSON.stringify(resultJSON), () => {
      console.log(`${options.sourceLanguage} => ${options.targetLanguage}\n${options.sentence}\n${resultJSON}\n`);
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