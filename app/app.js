/*jshint esversion: 6 */

//React cores
React = require('react');
ReactDOM = require('react-dom');

//TODO:10 Load these plugins dinamically
var MANGAFOX = require('./../plugins/mangafox.js');

//Name plugin pair
var sourceList = new Map();
sourceList.set('mangafox', MANGAFOX);

//React Components
require('./components/AppRoot.component.js');


ReactDOM.render(
  React.createElement(AppRoot),
  document.getElementById('app')
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
