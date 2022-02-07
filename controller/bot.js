'use strict';
require('dotenv').config();

// get the mantium Token
const mantiumAi = require('@mantium/mantiumapi');
const prompt_id = 'd68207a4-e082-4452-943a-e18cb82fb199';
const credentials = {
  username: process.env.MANTIUM_USER_NAME,
  password: process.env.MANTIUM_PASSWORD,
};
const MessagingResponse = require('twilio').twiml.MessagingResponse;

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
        if (response.data?.attributes) {
          console.log('Login successful!');
          mantiumAi.api_key = response.data.attributes.bearer_id;
          this.apiKey = response.data.attributes.bearer_id;
        } else {
          console.log('Login failed!');
        }
      });
  }

  async getAnswer(question) {
    return await mantiumAi
      .Prompts('OpenAI')
      .execute({
        id: prompt_id,
        input: question,
      })
      .then(async (res) => {
        /*
         * from the successful response collect the prompt_execution_id
         * and then pass this to the result method
         */
        if (res?.prompt_execution_id) {
          return await mantiumAi
            .Prompts('OpenAI')
            .result(res.prompt_execution_id)
            .then((response) => {
              return response;
            });
        }
      });
  }

  apiKey = null;

  async postMessage(req, res) {
    // execute the prompt
    // res.status(200).send('Hi I am postMessage' + req.body + ' ' + this.apiKey);

    console.log('body ::::', req.body);

    let response = await this.getAnswer(req.body.Body);

    console.log('response ::::', response);

    const twiml = new MessagingResponse();

    res.writeHead(200, { 'Content-Type': 'text/xml' });

    twiml.message(response.output);

    // convert response to twillio xml format
    //https://www.twilio.com/docs/sms/tutorials/how-to-receive-and-reply-node-js

    /*if (req.body && req.body.message && response?.output) {
      twiml.message(response.output);
      // res.status(200).send('Hi I am postMessage' + response.output);
    } else {
      // res.status(200).send('No response from AI ....');
      twiml.message('No response from AI ....');
    }*/

    res.end(twiml.toString());
  }

  getMessage(req, res) {
    res.status(200).send('This URL use only for post messge' + this.apiKey);
  }
}

module.exports = Bot;
