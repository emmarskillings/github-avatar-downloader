var request = require('request');
var fs = require('fs');
var GITHUB_TOKEN = require('./secrets.js');
var owner = process.argv[2];
var repo = process.argv[3];

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

function downloadImageByURL(url, filepath) {
  request.get(url)
         .on('error', function(err) {
          throw err;
         })
         .on('response', function(response) {
          console.log("Downloading Images");
         })
         .on('end', function(end) {
          console.log("Download Complete");
         })
         .pipe(fs.createWriteStream(filepath));
}

function callback(err, result) {
  for (var i = 0; i < result.length; i++) {
    downloadImageByURL(result[i]['avatar_url'], './avatars/' + result[i]['login'] + ".jpg");
  }
}

if(owner && repo) {
  getRepoContributors(owner, repo, callback);
}
else {
  console.log("ERROR: owner or repo name not specified.");
};

