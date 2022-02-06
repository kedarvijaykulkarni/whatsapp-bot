'use strict';
require('dotenv').config();

// get the mantium Token
const mantiumAi = require('@mantium/mantiumapi');
const credentials = {
  username: process.env.MANTIUM_USER_NAME,
  password: process.env.MANTIUM_PASSWORD,
};

class Bot {
  /****************************************************************************************************
   Constructor
  *******************************************************************************************************/
  constructor() {
    if (this.apiKey === null) {
      this.getToken();
    }
  }

  async getToken() {
    await mantiumAi
      .Auth()
      .accessTokenLogin({ ...credentials })
      .then((response) => {
        // get bearer_id and set as a api_key
        mantiumAi.api_key = response.data.attributes.bearer_id;
        this.apiKey = response.data.attributes.bearer_id;
      });
  }

  apiKey = null;

  postMessage(req, res) {
    // execute the prompt
    // res.status(200).send('Hi I am postMessage' + req.body + ' ' + this.apiKey);

    console.log('body ::::', req.body);
    res.status(200).send('Hi I am postMessage' + req.body);
  }

  getMessage(req, res) {
    res.status(200).send('This URL use only for post messge' + this.apiKey);
  }
}

module.exports = Bot;
