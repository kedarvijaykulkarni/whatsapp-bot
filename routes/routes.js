const appRouter = (app) => {
  // default route
  app.get('/', (req, res) => {
    res.send('Welcome to Mantium WhatsApp Bot!');
  });

  // import other routes
  const botRoutes = require('./bot.router');
  botRoutes(app);

  // import other routes
  const chromeExtensionRoutes = require('./chrome-extension.router');
  chromeExtensionRoutes(app);
};

module.exports = appRouter;
