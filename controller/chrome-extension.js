import {} from 'dotenv/config';

import mantiumAi from '@mantium/mantiumapi';

const prompt_id = process.env.MANTIUM_PROMPT_ID;
const credentials = {
  username: process.env.MANTIUM_USER_NAME,
  password: process.env.MANTIUM_PASSWORD,
};

export class chromeExtension {
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
          mantiumAi.api_key = response.data.attributes.bearer_id;
          this.apiKey = response.data.attributes.bearer_id;
        } else {
          console.log('Login failed!');
        }
      });
  }

  async getAnswer(body) {
    let question = body.message;
    let promptId = body.prompt_id || prompt_id;

    return await mantiumAi
      .Prompts('OpenAI')
      .execute({
        id: promptId,
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
    const response = await this.getAnswer(req.body);
    /* WORKING */
    // res.end(response?.output.toString() || 'Response faild!');
    res.status(200).send(response);
  }

  getMessage(req, res) {
    res.status(200).send('HTTP POST method only supported by this endpoint');
  }
}
