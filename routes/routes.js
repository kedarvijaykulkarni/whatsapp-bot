import botRoutes from './bot.router.js';
import chromeExtensionRoutes from './chrome-extension.router.js';
import twitterBotRoutes from './twitter-bot.router.js';

export default function appRouter(app) {
  // default route
  app.get('/', (req, res) => {
    res.send('Welcome to Mantium Bot!');
  });

  // import other routes
  botRoutes(app);

  // import other routes
  chromeExtensionRoutes(app);

  // import other routes
  twitterBotRoutes(app);

};
