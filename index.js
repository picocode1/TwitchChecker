const fs = require('fs');
const request = require('request');
var tokens = fs.readFileSync('./tokens.txt', 'utf-8');
if(tokens.length == 0)
{
    return console.log('No tokens detected')
}
else
{
    console.clear()
    console.log('Script running')
}

tokens = tokens.split("\r\n")


var counter = 0
var delay = 10
var i = 0;

function Checker(token){
    var options = {
        url: 'https://id.twitch.tv/oauth2/validate',
        headers: {
            'Authorization': 'OAuth ' + token
        }
    }
    function callback(error, response, body) {
        if (counter += 1, console.log(token, counter, body), null == body){
            return fs.appendFileSync("error_logs.txt", token, body + "\n");
        }
        body.includes("client_id") && (console.log("Found token: " + token), 
        fs.appendFileSync("working_token.txt", token + "\n"))
    }
    request(options, callback);
}



function CheckLoop() {
	setTimeout(function() {
		Checker(tokens[i]), ++i < tokens.length && CheckLoop()
	}, delay)
}
CheckLoop();