let chromeController = require('./../controller/chrome-extension.js');
let chrome = new chromeController();

const chromeExtensionRoutes = (app) => {
  // send message
  app.post('/chrome-extension', (req, res) => {
    chrome.postMessage(req, res);
  });

  // set default get to show warning message
  app.get('/chrome-extension', (req, res) => chrome.getMessage(req, res));
};

module.exports = chromeExtensionRoutes;
