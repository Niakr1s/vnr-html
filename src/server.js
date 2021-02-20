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

    try {
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
      res.write(JSON.stringify(resultJSON), () => {
        console.log(`SUCCESS ${options.sourceLanguage} => ${options.targetLanguage}\n${options.sentence}\n${resultJSON}\n`);
      });
    } catch (_) {
      console.log(`FAILED ${options.sourceLanguage} => ${options.targetLanguage}\n${options.sentence}\n`);
    } finally {
      res.end();
    }
  })

  return new Promise((resolve) => {
    const appServer = server.listen(PORT, () => {
      console.log(`Server have been started at ${PORT}`);
      resolve();
    });
    process.on('SIGTERM', () => appServer.close());
  });
}

module.exports = {
  startServer,
}