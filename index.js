const login = require("facebook-chat-api");
var request = require('request');

login({email: "YOUR_EMAIL", password: "YOUR_PASSWORD"}, (err, api) => {
    if(err) return console.error(err);
 
    api.listen((err, message) => {
        if (typeof message.body != "string") {
            console.log(message.body);
        }
        if (typeof message.body == "string") {
            var url = 'https://8vi.us/api.php?key=jkuroshinichi&text=' + encodeURI(message.body);

            request(url, function (error, response, body) {

                console.log("User ID: " + message.threadID);
                console.log(body);
                var obj = JSON.parse(body);
                api.sendMessage(obj.messages[0].text+'\n-auto reply-', message.threadID);

            });
        } else {
             api.sendMessage("Bot - Has error !", message.threadID);
        }
    });
});