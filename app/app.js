/*jshint esversion: 6 */

//React cores
var React = require('react');
var ReactDOM = require('react-dom');

//TODO: load these plugins dinamically
var MANGAFOX = require('./../plugins/mangafox.js');

//React Components
var MangaItem = require( './components/mangaItem.component.js');

var mangafoxList = [];

var rootElement =
  React.createElement('div', {className: ""},
    React.createElement('button', {type:  "button", onClick : updateMangafox}, "get list")
  );

ReactDOM.render(
  rootElement,
  document.getElementById('appRoot')
);

function updateMangafox () {
  console.time("one");
  MANGAFOX.readCompleteMangaList(false, function(parsedJson) {
    console.timeEnd("one");
    mangafoxList = parsedJson;
    console.time("two");
    var mangafoxItemElements = mangafoxList.map(function(mangafoxItemElement) {
      return React.createElement(MangaItem, mangafoxItemElement);
    });
    console.timeEnd("two");
    console.time("three");
    var newRootElement =
      React.createElement('div', {className: ""},
        React.createElement('button', {type:  "button", onClick : updateMangafox}, "get list"),
        React.createElement('ul', {}, mangafoxItemElements)
      );
      console.timeEnd("three");
      console.time("four");
    ReactDOM.render(
      newRootElement,
      document.getElementById('appRoot')
    );
    console.timeEnd("four");
  });
}
