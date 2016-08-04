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
//Returns a javascript Set() with all links (href)
function getChapterList (urlArg) {
  var url = urlArg.replace('http://ma', 'http://m.ma');
  request(url, function (error, response, body) {
    if (response.statusCode !== 200) {
      console.log("Failed to load page, code: " + response.statusCode);
      return;
    }
    var $ = cheerio.load(body);
    var linkList = new Set();

    $('.chlist a').each(function() {
      console.log(this.attribs.href);
      linkList.add(this.attribs.href);
    });
    return linkList;
  });
}

//Get manga metada available.
//Ideally it should crossreference mangaupdates for more complete metadata
function getMangaData () {

}

//Download every image on the chapter and save to system
function downloadChapter () {

}
