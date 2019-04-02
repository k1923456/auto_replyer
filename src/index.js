"use strict";

const line = require("@line/bot-sdk");
const express = require("express");

// create LINE SDK config from env variables
const config = {
  channelAccessToken:
    "4xq9WmyWQzOGrhvZRtLkCTr8vDYxtkQNeqvnKIKJCI6kSDM+JzggaBHFP5o0ncVGdQ2ru4cErcnOJ0ZGq93iN3olbGWFDg78SCvEQzbyfIeKr7uOykH6bQ1rmlEgzw0c2alJ9VZF2EL5+/w9OrFqGgdB04t89/1O/w1cDnyilFU=",
  channelSecret: "fbb5f1e4634b0b0789605a2ed161f539"
};

// create LINE SDK client
const client = new line.Client(config);

// Raine keywords

const raineArray = [
  "蕊尼",
  "蕊泥",
  "蕊倪",
  "蕊霓",
  "蕊妮",
  "蕊膩",
  "瑞尼",
  "瑞妮",
  "芮尼",
  "芮妮",
  "芮泥",
  "蕊逆",
  "Raine",
  "Rainie",
  "raine",
  "rainie"
];

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    console.log("===================================================");
    console.log("This is not a message/text type event, Do nothing!!");
    console.log("===================================================");
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  if (
    (event.message.text.length == 5 || event.message.text.length == 6) &&
    event.message.text.match(/[Rr]?aini?e/gm)
  ) {
    console.log("===================================================");
    console.log("Exactly 'Raine/Rainie/raine/rainie', Do nothing!!");
    console.log("===================================================");
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  console.log("I got some msg: ", event.message.text);

  // create a echoing text message

  const echo = { type: "text", text: "乾你屁事" };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

