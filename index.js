require('dotenv').config();
const mantiumAi = require('@mantium/mantiumapi');

// const username = process.env.MANTIUM_USER_NAME;
// const password = process.env.MANTIUM_PASSWORD;

const credentials = {
  username: process.env.MANTIUM_USER_NAME,
  password: process.env.MANTIUM_PASSWORD,
};

// if (!username && !password)
//   throw new Error('username and password are missing!');

(async () => {
  const loginResponse = await mantiumAi
    .Auth()
    .accessTokenLogin({ ...credentials })
    .then((response) => {
      // get bearer_id and set as a api_key
      mantiumAi.api_key = response.data.attributes.bearer_id;
      return response;
    });
  console.log(loginResponse);
  console.log('Token', mantiumAi.api_key);
})();

// https://www.twilio.com/blog/2017/10/how-to-receive-and-respond-to-a-text-message-with-node-js-express-and-twilio.html
