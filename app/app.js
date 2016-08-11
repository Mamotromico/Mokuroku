/*jshint esversion: 6 */

//React cores
var React = require('react');
var ReactDOM = require('react-dom');

//TODO: load these plugins dinamically
var MANGAFOX = require('./../plugins/mangafox.js');

//React Components
// var MangaItem = require( './components/mangaItem.component.js');


MANGAFOX.readCompleteMangaList(false, function (parsedJson) {
  mangaListJson = parsedJson;
  console.log("get");
});

var MangaListItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },
  render: function () {
    var divStyle = {
      boxSizing: 'border-box',
      flex: '1 0 auto',
      backgroundColor: '#b5e0cd',
      padding: '2px',
      margin: '2px'
    }
    console.log(this.props.name);
    return React.createElement('div', {style: divStyle, className: "manga-list-item"},
      this.props.name
    );
  }
});

var MangaList = React.createClass({
  getInitialState: function() {
    return {
      mangaListJson: [];
    }
  }
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flex: '1 1 auto',
      padding: '2px',
      width: '400px',
      flexDirection: 'column',
      alignItems: 'stretch',
      backgroundColor: '#1aac9f',
      overflow: 'auto'
    }
    var mangafoxItemElements = this.props.list.map(function(mangafoxItemElement) {
      return React.createElement(MangaListItem, mangafoxItemElement);
    });
    return React.createElement('div', {style: divStyle, className: "manga-list"},
      mangafoxItemElements
    );
  }
});

// MangaListItem, {name: currentValue.name}

var MangaListContainer = React.createClass({
  render: function() {
    var temp = [];
    return React.createElement(MangaList, { list: temp });
  }
});

var MangaOriginSelect = React.createClass({
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flex: '1 0 auto',
      padding: '2px',
    }
    return React.createElement('select', {style: divStyle, className: "manga-list-origin-select"},
      React.createElement('option', {value: "mangafox"}, "mangafox")
    );
  }
});

var MangaBtnReadOrUpdate = React.createClass({
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      padding: '2px',
      width: '40px',
      contentAlign: 'center'
    }
    return React.createElement('button', {style: divStyle, className: "manga-list-update"},
     "F5"
    );
  }
});

var MangaListFilterBox = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
    }
  }
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      padding: '2px',
      flex: '0 0 auto'
    }
    return React.createElement('div',{className: 'manga-list-filter', style: divStyle},
      React.createElement('div', {style: {
                                          flex:'0 0 auto',
                                          backgroundColor: 'rgba(249, 112, 178, 0.61)',
                                          boxSizing: 'border-box',
                                          padding: '2px'
                                        },
                                  className: 'manga-list-filter-text'}, 'Filter'),
      React.createElement('input',{className: 'manga-list-filter-box', style: {boxSizing: 'border-box',flex:'1 0 auto'}, type: 'text'},null)
    );
  }
});

var MangaButtonsWrap = React.createClass({
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flex: '0 0 auto',
      padding: '2px',
      backgroundColor: 'rgb(19, 194, 63)'
    }
    return React.createElement('div', { style: divStyle, className: "manga-btn-wrap"},
      React.createElement(MangaOriginSelect),
      React.createElement(MangaBtnReadOrUpdate)
    );
  }
});

var MangaListWrap = React.createClass({
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1b6bd5',
      padding: '10px'
    }
    return React.createElement('div', {style: divStyle, className: "manga-list-wrap", list: this.props.list},
      React.createElement(MangaButtonsWrap),
      React.createElement(MangaListFilterBox),
      React.createElement(MangaListContainer)
    );
  }
});

var DownloaderWrap = React.createClass({
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      flex: '1',
      marginTop: '40px',
      backgroundColor: 'rgb(205, 86, 86)',
      padding: '2px',
    }

    return React.createElement('div', {style: divStyle, className: "dl-wrap"},
      React.createElement(MangaListWrap)
    );
  }
});

var AppRoot = React.createClass({
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'stretch',
      alignContent: 'stretch',
      padding: '2px',
      backgroundColor: '#d5bc15',
      width: '100vw',
      minWidth: '100vw',
      height: '100vh',
      minHeigth: '100vh'
    }
    return React.createElement('div', {style: divStyle, className: "appRoot"},
      React.createElement(DownloaderWrap)
    );
  }
});

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
