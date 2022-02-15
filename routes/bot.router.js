let botController = require('./../controller/bot.js');
let bot = new botController();

const botRoutes = (app) => {
  // send message
  app.post('/bot', (req, res) => {
    bot.postMessage(req, res);
  });

  // set default get to show warning message
  app.get('/bot', (req, res) => bot.getMessage(req, res));
};

module.exports = botRoutes;
