const { translate, translateEnd } = require('./scraper.js');

afterAll(translateEnd);

const sentence = 'hello';

test('returns non-empty string', async () => {
  expect(await translate({ sentence })).toBeTruthy();
});

test('can translate to russian', async () => {
  expect(await translate({ sentence, targetLanguage: 'ru' })).toEqual(expect.objectContaining({
    translation: expect.stringContaining('прив'),
  }))
});

test('can translate to japanese', async () => {
  expect(await translate({ sentence, targetLanguage: 'ja' })).toEqual(expect.objectContaining({
    translation: expect.stringContaining('こんにち'),
  }))
});