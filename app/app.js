/*jshint esversion: 6 */

//React cores
var React = require('react');
var ReactDOM = require('react-dom');

//TODO: load these plugins dinamically
var MANGAFOX = require('./../plugins/mangafox.js');

//React Components
// var MangaItem = require( './components/mangaItem.component.js');

var MangaListItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },
  render: function () {
    var divStyle = {
      backgroundColor: 'blue'
    }
    return React.createElement('div', {style: divStyle, className: "manga-list-item"},
      this.props.name
    );
  }
});

var MangaList = React.createClass({
  render: function() {
    var divStyle = {
      backgroundColor: 'green'
    }
    return React.createElement('div', {style: divStyle, className: "manga-list"},
      React.createElement(MangaListItem, {name: "hey"}),
      React.createElement(MangaListItem, {name: "whats"}),
      React.createElement(MangaListItem, {name: "up"}),
      React.createElement(MangaListItem, {name: "fam"})
    );
  }
});

var MangaListContainer = React.createClass({
  render: function() {
    var divStyle = {

    }
    return React.createElement('div', {style: divStyle, className: "manga-list-container"},
      React.createElement(MangaList)
    );
  }
});

var MangaOriginSelect = React.createClass({
  render: function() {
    var divStyle = {

    }
    return React.createElement('select', {className: "manga-list-origin-select"},
      React.createElement('option', {value: "mangafox"}, "mangafox")
    );
  }
});

var MangaBtnReadOrUpdate = React.createClass({
  render: function() {
    var divStyle = {

    }
    return React.createElement('button', {className: "manga-list-update"},
     "F5"
    );
  }
});

var MangaListWrap = React.createClass({
  render: function() {
    var divStyle = {

    }
    return React.createElement('div', {className: "manga-list-wrap"},
      React.createElement(MangaOriginSelect),
      React.createElement(MangaBtnReadOrUpdate),
      React.createElement(MangaListContainer)
    );
  }
});

var DownloaderWrap = React.createClass({
  render: function() {
    var divStyle = {
      backgroundColor: 'red'
    }
    return React.createElement('div', {style: divStyle, className: "dl-wrap"},
      React.createElement(MangaListWrap)
    );
  }
});

var AppRoot = React.createClass({
  render: function() {
    var divStyle = {

    }
    return React.createElement('div', {className: "app"},
      React.createElement(DownloaderWrap)
    );
  }
});

ReactDOM.render(
  React.createElement(AppRoot),
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
