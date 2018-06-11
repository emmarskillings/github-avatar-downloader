var GITHUB_TOKEN = require('./secrets.js');

var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var obj = JSON.parse(body);
    cb(err, obj);
  });
}

function callback(err, result) {
  for (var i = 0; i < result.length; i++) {
    console.log(result[i]['avatar_url']);
  }
};

getRepoContributors("jquery", "jquery", callback);

