var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');
var repoOwner = process.argv[2];
var repoName = process.argv[3]

console.log('Welcome to the GitHub Avatar Downloader!');

if(!repoOwner || ! repoName){
    console.log("You need to pass a valid repo owner and repo name!")
}

var urlArr = [];
var loginArr = [];
function getRepoContributors(repoOwner, repoName, cb) {
    if(!fs.existsSync('./avatars')){
        fs.mkdirSync('./avatars')
    }
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + token.GITHUB_TOKEN
        }
    };
    
    request(options, function(err, res, body) {
        if (err){
            console.log(err);
        }
        var parsedArr = JSON.parse(body);
        // console.log(parsedArr);
        // console.log(parsedArr);
        parsedArr.forEach(function(element){
            urlArr.push(element.avatar_url);
            loginArr.push(element.login);
        });
        // console.log(urlArr);
        // console.log(loginArr);
        for(var i = 0; i < urlArr.length; i++){
            var filePath = './avatars/' + loginArr[i] + '.jpg';
            // console.log(filePath);
            cb(urlArr[i], filePath);
        }
    });
}
    
    
function downloadImageByURL(url, filePath){
        request.get(url)
        .pipe(fs.createWriteStream(filePath))
}


getRepoContributors("jquery", "jquery", downloadImageByURL)
