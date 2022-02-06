const appRouter = (app) => {
  // default route
  app.get('/', (req, res) => {
    res.send('Welcome to Mantium WhatsApp Bot!');
  });

  // import other routes
  const botRoutes = require('./bot.router');
  botRoutes(app);
};

module.exports = appRouter;
