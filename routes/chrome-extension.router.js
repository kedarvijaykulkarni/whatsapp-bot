import { chromeExtension } from './../controller/chrome-extension.js';
let chrome = new chromeExtension();

export default function chromeExtensionRoutes (app) {
  // send message
  app.post('/chrome-extension', (req, res) => {
    chrome.postMessage(req, res);
  });

  // set default get to show warning message
  app.get('/chrome-extension', (req, res) => chrome.getMessage(req, res));
}
