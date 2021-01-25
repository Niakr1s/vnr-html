## Just a single html page, for convinient use to read visual novels.



### Suggested software
- [Firefox](https://www.mozilla.org/en-US/firefox/new/) (I suggest it because extension below didn't work in chromium-based browsers as for me).
- [Clipboard Inserter](https://addons.mozilla.org/en-US/firefox/addon/clipboard-inserter/) extension with default settings (p/body/300). 
- [Textractor](https://github.com/Artikash/Textractor) for plucking text from visual novels (use it with "Copy to clipboard" extension, so each chunk of text will be copied into your clipboard).
- [Yomichan](https://addons.mozilla.org/en-US/firefox/addon/yomichan/) - handy japanese dictionary.

### v1.0.0
Standalone vnr.html.

### v1.1.0
Added Node.js server to translate via deepl. You need to install node.js, execute ```npm install``` and ```npm run run``` alongside with opened vhr.html in Firefox.
Translation is implemented via puppeteer and will take about 400MB free space after executing ```npm install```.
It still okay to run vhr.html standalone without needing to run ```npm install```!