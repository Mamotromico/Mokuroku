/*jshint esversion: 6 */

//React cores
var React = require('react');
var ReactDOM = require('react-dom');

//TODO: load these plugins dinamically
var MANGAFOX = require('./../plugins/mangafox.js');

//React Components
// var MangaItem = require( './components/mangaItem.component.js');


var MangaListItem = React.createClass({
  render: () {
    React.createElement('li', { className: "manga-list-item"},
      this.props.name
    );
  }
});

var MangaList = React.createClass({
  var mangafoxList = [];
  render() {
    React.createElement('ul', {className: "manga-list"},
      MangaListItem()
    );
  }
});

var MangaListContainer = React.createClass({
  render() {
    React.createElement('div', {className: "manga-list-container"},
      MangaList
    );
  }
});

var MangaOriginSelect = React.createElement('select', {className: "manga-list-origin-select"},

);

var MangaBtnReadOrUpdate = React.createElement('button', {className: "manga-list-update"},

);

var MangaListWrap = React.createElement('div', {className: "manga-list-wrap"},
  MangaOriginSelect,
  MangaBtnReadOrUpdate,
  MangaListContainer
);

var DownloaderWrap = React.createElement('div', {className: "dl-wrap"},
  MangaListWrap
);

var AppRoot = React.createElement('div', {className: 'app'},
  DownloaderWrap
);


ReactDOM.render(
  appRoot,
  document.getElementById('appRoot')
);

// function updateMangafox () {
//   console.time("one");
//   MANGAFOX.readCompleteMangaList(false, function(parsedJson) {
//     console.timeEnd("one");
//     mangafoxList = parsedJson;
//     console.time("two");
//     var mangafoxItemElements = mangafoxList.map(function(mangafoxItemElement) {
//       return React.createElement(MangaItem, mangafoxItemElement);
//     });
//     console.timeEnd("two");
//     console.time("three");
//     var newRootElement =
//       React.createElement('div', {className: ""},
//         React.createElement('button', {type:  "button", onClick : updateMangafox}, "get list"),
//         React.createElement('ul', {}, mangafoxItemElements)
//       );
//       console.timeEnd("three");
//       console.time("four");
//     ReactDOM.render(
//       newRootElement,
//       document.getElementById('appRoot')
//     );
//     console.timeEnd("four");
//   });
// }
