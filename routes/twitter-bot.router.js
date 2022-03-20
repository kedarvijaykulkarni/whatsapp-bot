// let twitterController = require('./../controller/twitter.js');
// let twitter = new twitterController();

import { Twitter } from './../controller/twitter.js';
let twitter = new Twitter();

export default function twitterBotRoutes(app) {
  // set default get to show warning message
  app.get('/twitter', (req, res) => twitter.getMessage(req, res));
}
