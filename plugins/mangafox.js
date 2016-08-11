/*jshint esversion: 6 */

//TODO:0 Refactor with promises

var UTIL        = require('./../js/utils');
var REQUEST     = require('request');
var CHEERIO     = require('cheerio');
var URL         = require('url-parse');
var FS          = require('fs');

//Get every manga available on the site. Not sure if it should be used/needed
function getCompleteMangaList (fixing = false, callback = null) {
  console.log("Downloadan");

  //Request the manga directory. This will probably always be hardcoded
  REQUEST('http://mangafox.me/manga/', function(error, response, body) {
    //Treat request error
    if (response.statusCode !== 200) {
      console.log("Error loading manga list, code "+ response.statusCode);
      return;
    }

    //Create a map with all manga names and URL, then turn them into a json object
    var $ = CHEERIO.load(body);
    var mangaLinkList = [];
    var mangaKey = 1;
    $('.series_preview').each(function() {
      // mangaLinkList.set($(this).text(),this.attribs.href);
      mangaLinkList.push({'key': mangaKey.toString(), 'name':$(this).text(), "url":this.attribs.href});
      mangaKey++;
    });
    var jsonList = mangaLinkList;

    //Write the json file to disk
    FS.writeFile("MangafoxList.json", JSON.stringify(jsonList), function (err) {
      if(err){
        console.log("An error ocurred creating the Mangafox file "+ err.message);
      }
      console.log("Mangafox list has been succesfully saved");
      //If this call was made while trying to read a list that don't exist yet
      if (fixing) {
        readCompleteMangaList(true, callback);
      }
    });
    console.log("download done");
  });
}

//Promise version
function getCompleteMangaListPromise (fixing = false) {
  console.log("Downloadan");
  return new Promise(function(resolve, reject) {

    //Request the manga directory. This will probably always be hardcoded
    REQUEST('http://mangafox.me/manga/', function(error, response, body) {
      //Treat request error
      if (error) {
        return reject(error);
      }
      if (response.statusCode !== 200) {
        console.log("Error loading manga list, code "+ response.statusCode);
        return reject(response.statusCode);
      }

      //Create a map with all manga names and URL, then turn them into a json object
      var $ = CHEERIO.load(body);
      var mangaLinkList = [];
      var mangaKey = 1;
      $('.series_preview').each(function() {
        // mangaLinkList.set($(this).text(),this.attribs.href);
        mangaLinkList.push({'key': mangaKey.toString(), 'name':$(this).text(), "url":this.attribs.href});
        mangaKey++;
      });
      var jsonList = mangaLinkList;

      //Write the json file to disk
      FS.writeFile("MangafoxList.json", JSON.stringify(jsonList), function (err) {
        if(err){
          console.log("An error ocurred creating the Mangafox file "+ err.message);
        }
        console.log("Mangafox list has been succesfully saved");
        //If this call was made while trying to read a list that don't exist yet
        if (fixing) {
          readCompleteMangaList(true, callback);
        }
      });
      console.log("download done");
      resolve();
    });

  });
}

function readCompleteMangaList(fixed = false, callback = null) {
  //Check if the mangafox file exists, if not it will download it.
  FS.stat('MangafoxList.json', function (err, stats) {
    if(err) {
      //If already tried to fix the file by downloading it and got another error
      if(fixed) {
        console.log("Can't read file again, please report: "+ err);
        return;
      }
      console.log("Can't read mangafoxlist file, trying to fix");
      getCompleteMangaList(true, callback);
      return;
    }
    //Confirm its a file and read it
    if (stats.isFile()) {
      FS.readFile('MangafoxList.json', 'utf8', function(err, data) {
       if (err) {
         console.log("Error reading mangafoxlist file: +" + err);
         return;
       }
       //Return the JSON object properly parsed\
       var parsedJson = JSON.parse(data);
       console.log("Successfully read");
       if(callback) {
         callback(parsedJson);
       }
      });
    }
  });
}

//Promise version
function readCompleteMangaListPromise(fixed = false) {
  return new Promise(function(resolve, reject) {
    //Check if the mangafox file exists, if not it will download it.
    FS.stat('MangafoxList.json', function (err, stats) {
      if(err) {
        //If already tried to fix the file by downloading it and got another error
        if(fixed) {
          console.log("Can't read file again, please report: "+ err);
          reject(err);
          return;
        }
        console.log("Can't read mangafoxlist file, trying to fix");
        getCompleteMangaListPromise(true);
        reject(err);
        return;
      }
      //Confirm its a file and read it
      if (stats.isFile()) {
        FS.readFile('MangafoxList.json', 'utf8', function(err, data) {
         if (err) {
           console.log("Error reading mangafoxlist file: +" + err);
           reject(err);
           return;
         }
         //Return the JSON object properly parsed\
         var parsedJson = JSON.parse(data);
         console.log("Successfully read");
         resolve(parsedJson);
        });
      }
    });
  });
}

//Get every chapter available from the manga
//Returns a javascript Set() with all links (href)
function getChapterList (urlArg) {

  //change to mobile URL
  var url = urlArg.replace('http://ma', 'http://m.ma');

  //Request the manga page
  REQUEST(url, function (error, response, body) {
    //Error treatment
    if (response.statusCode !== 200) {
      console.log("Failed to load page, code: " + response.statusCode);
      return;
    }

    //Create and fill the list with all chap links
    var $ = CHEERIO.load(body);
    var chapLinkList = new Set();
    $('.chlist a').each(function() {
      console.log(this.attribs.href);
      chapLinkList.add(this.attribs.href);
    });

    return chapLinkList;
  });
}

//Download every image on the chapter and save to system on path
function downloadChapter (urlArg, path) {

  //change to mobile URL
  var url = urlArg.replace('http://ma', 'http://m.ma');

  //Page request
  REQUEST(url, function(error, response, body) {
    $ = CHEERIO.load(body);

    //Find the number of pages from the dropdown page list
    var numPages = $('.mangaread-page option').length;

    //Create and fill an array with all the required page links
    var pagesLinksArr = [];
    $('.mangaread-page option').each(function () {
      console.log($(this).val());
      pagesLinksArr.push($(this).val());
    });

    //Start a download process for each page
    curPage = 1;
    pagesLinksArr.forEach(function (item, index, array) {
      downloadPage(item, path, ("00"+curPage).slice(-3));
      curPage++;
    });
  });
}

//Get the page image from the page html
function downloadPage (url, fPath, fileName) {
  REQUEST(url, function (er, rp, bd) {
    //treating errors
    if (rp.statusCode !== 200) {
      console.log("Error on page load:"+rp.statusCode);
      return;
    }

    //Find the image link
    $ = CHEERIO.load(bd);
    url = $('#image').attr('src');

    //Request image and write to file
    REQUEST(url).pipe(FS.createWriteStream(fPath+fileName+'.jpg'));
  });
}

/*
███████ ██   ██ ██████   ██████  ██████  ████████ ███████
██       ██ ██  ██   ██ ██    ██ ██   ██    ██    ██
█████     ███   ██████  ██    ██ ██████     ██    ███████
██       ██ ██  ██      ██    ██ ██   ██    ██         ██
███████ ██   ██ ██       ██████  ██   ██    ██    ███████
*/

module.exports.getCompleteMangaList = getCompleteMangaList;
module.exports.readCompleteMangaList = readCompleteMangaList;
module.exports.getCompleteMangaListPromise = getCompleteMangaListPromise;
module.exports.readCompleteMangaListPromise = readCompleteMangaListPromise;
module.exports.getChapterList = getChapterList;
module.exports.downloadChapter = downloadChapter;
