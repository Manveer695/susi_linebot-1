'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'hYLoXRWvzVUNc5DtZSRWEhjRKaT2EmOc/d4f1VcowrBddxl2IY1TkHOZn/QHJLxNZEK4nQRrwLlsiKg2f6roBbMDk/4WB4WSqEymrmSwv01oXhgtiZmUXMyGlqXSW0yDdsfUKRWStKUgNdn//a7SYgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '63ab12be6cb1f0c8fc3dafd42455e2fd'
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.get('/',function(req, res){
	res.writeHead(200);
	res.write('Hi User');
	res.end();	
});


// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
var port=Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`listening on ${port}`);
});