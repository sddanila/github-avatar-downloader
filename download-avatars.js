var request = require('request');
var token = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + token.GITHUB_TOKEN
      }
    };
  
    request(options, function(err, res, body) {
      const urlArr = JSON.parse(body);
      console.log(urlArr);
            urlArr.forEach(function(element){
                console.log(element.avatar_url)
            });
        cb(err, body);
    });
  }

  getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });