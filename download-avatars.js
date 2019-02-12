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
var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + token.GITHUB_TOKEN
    }
};

function getRepoContributors(repoOwner, repoName, cb) {
    // Make avatars folder, if it doesn't exist already
    if(!fs.existsSync('./avatars')){
        fs.mkdirSync('./avatars')
    }
    // make a request for JSON and parse data into the arrays
    request(options, function(err, res, body) {
        if (err){
            console.log(err);
        }
        var parsedArr = JSON.parse(body);
        parsedArr.forEach(function(element){
            urlArr.push(element.avatar_url);
            loginArr.push(element.login);
        });
    // loop through each array and create custom filepath and pass url to the callback function
        for(var i = 0; i < urlArr.length; i++){
            var filePath = './avatars/' + loginArr[i] + '.jpg';
            // console.log(filePath);
            cb(urlArr[i], filePath);
        }
    });
}
    
    
function downloadImageByURL(url, filePath){
    // get image urls and make image file from the picture
        request.get(url)
        .pipe(fs.createWriteStream(filePath))
}


getRepoContributors("jquery", "jquery", downloadImageByURL)
