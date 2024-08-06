function doPost(e) {
  var CHANNEL_ACCESS_TOKEN = '4xq9WmyWQzOGrhvZRtLkCTr8vDYxtkQNeqvnKIKJCI6kSDM+JzggaBHFP5o0ncVGdQ2ru4cErcnOJ0ZGq93iN3olbGWFDg78SCvEQzbyfIeKr7uOykH6bQ1rmlEgzw0c2alJ9VZF2EL5+/w9OrFqGgdB04t89/1O/w1cDnyilFU=';

  // line webhook 資料
  var msg = JSON.parse(e.postData.contents);
  var event = msg.events[0];
  // ignore non-text-message event
  if (event.type !== "message" || event.message.type !== "text") {
    return
  }

  // 檢查 reply token
  var replyToken = event.replyToken;
  // use reply API
  if (typeof replyToken === 'undefined') {
    return;
  }

  var userMessage = event.message.text;
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
  ];
  // 查看是否有英文關鍵字
  if (userMessage.match(/[Rr]?aini?e/gm)) {
    sendReply(CHANNEL_ACCESS_TOKEN, replyToken);
    return;
  }

  // 查看是否有中文關鍵字
  raineArray.map((val) => {
    if (userMessage.includes(val)) {
      sendReply(CHANNEL_ACCESS_TOKEN, replyToken);
      return;
    }
  })
}

function sendReply(CHANNEL_ACCESS_TOKEN, replyToken) {
  // create a echoing text message
  const echo = { type: "text", text: "R小姐乾你屁事" };
  const newGirl = { type: "text", text: "介紹一下現任啊～" };
  const url = 'https://api.line.me/v2/bot/message/reply';

  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [
        echo,
        newGirl,
      ],
    }),
  });
}