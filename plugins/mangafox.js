var request     = require('request');
var cheerio     = require('cheerio');
var URL         = require('url-parse');
var fs          = require('fs');

//Get every manga available on the site. Not sure if it should be used/needed
function getCompleteMangaList () {

}

//Get manga page. Use name as a search term? not sure yet
function getManga () {

}

//Get every chapter available from the manga
function getChapterList (url) {
  request(url, function (error, response, body) {
    if (response.statusCode !== 200) {
      console.log("Failed to load page, code: " + response.statusCode);
      return;
    }
    var $ = cheerio.load(body);
    var linkList = new Set();
    //linkList.add($('.chlist > a').attr('href'));
    console.log("aight, look for a");
    $('.chlist a').each(function() {
      console.log(this.attribs.href);
      linkList.add(this.attribs.href);
    });
    for (let item of linkList) {
      console.log(item);
      var a = document.createElement('a');
      a.href = item;
      a.innerHTML = item;
      document.body.appendChild(a);
      document.body.appendChild(document.createElement('br'));
    }
  });
}

//Get manga metada available.
//Ideally it should crossreference mangaupdates for more complete metadata
function getMangaData () {

}

//Download every image on the chapter and save to system
function downloadChapter () {

}
