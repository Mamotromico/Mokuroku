require('map.prototype.tojson');
var REQUEST     = require('request');
var CHEERIO     = require('cheerio');
var URL         = require('url-parse');
var FS          = require('fs');
var HTTP        = require('http');

//Get every manga available on the site. Not sure if it should be used/needed
function getCompleteMangaList () {
  console.log("Downloadan");
  REQUEST('http://mangafox.me/manga/', function(error, response, body) {
    if (response.statusCode !== 200) {
      console.log("Error loading manga list, code "+ response.statusCode);
      return;
    }
    var $ = CHEERIO.load(body);
    var mangaLinkList = new Map();
    $('.manga_open').each(function() {
      mangaLinkList.set($(this).text(),this.attribs.href);
    });
    var jsonList = mangaLinkList.toJSON();
    console.log(jsonList);
    FS.writeFile("MangafoxList.json", JSON.stringify(jsonList), function (err) {
      if(err){
        console.log("An error ocurred creating the Mangafox file "+ err.message);
      }
      console.log("Mangafox list has been succesfully saved");
    });
  });
}

function readCompleteMangaList() {
  FS.stat('MangafoxList.json', function (err, stats) {
    if(err) {
      console.log("Can't read mangafoxlist file, trying to fix");
      getCompleteMangaList();
      return;
    }
    if (stats.isFile()) {
      FS.readFile('MangafoxList.json', 'utf8', function(err, data) {
       if (err) {
         console.log("Error reading mangafoxlist file: +" + err);
         return;
       }
       console.log(JSON.parse(data));
       console.log("Successfully read");
      });
    }
  });
}

//Get manga page. Use name as a search term? not sure yet
function getManga () {

}

//Get every chapter available from the manga
//Returns a javascript Set() with all links (href)
function getChapterList (urlArg) {
  var url = urlArg.replace('http://ma', 'http://m.ma');
  REQUEST(url, function (error, response, body) {
    if (response.statusCode !== 200) {
      console.log("Failed to load page, code: " + response.statusCode);
      return;
    }
    var $ = CHEERIO.load(body);
    var chapLinkList = new Set();

    $('.chlist a').each(function() {
      console.log(this.attribs.href);
      chapLinkList.add(this.attribs.href);
    });
    return chapLinkList;
  });
}

//Get manga metada available.
//Ideally it should crossreference mangaupdates for more complete metadata
function getMangaData () {

}

//Download every image on the chapter and save to system
function downloadChapter () {

}
