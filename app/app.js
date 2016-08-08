/*jshint esversion: 6 */
var MANGAFOX = require('./../plugins/mangafox.js');

var React = require('react');
var ReactDOM = require('react-dom');

var mangafoxList = [];

var MangaItem = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  },
  onClick: function(syntheticEvent) {
    console.log(this.props.url);
  },
  render: function() {
    return (
      React.createElement('li', {},
        // React.createElement('div', {}, this.props.name)
        React.createElement('button', {type: "button", onClick: this.onClick}, this.props.name)
      )
    );
  }
});

var rootElement =
  React.createElement('div', {className: ""},
    React.createElement('button', {type:  "button", onClick : updateMangafox}, "get list")
  );

ReactDOM.render(
  rootElement,
  document.getElementById('appRoot')
);

function updateMangafox () {
  MANGAFOX.readCompleteMangaList(false, function(parsedJson) {
    mangafoxList = parsedJson;
    var mangafoxItemElements = mangafoxList.map(function(mangafoxItemElement) {
      return React.createElement(MangaItem, mangafoxItemElement);
    });
    var newRootElement =
      React.createElement('div', {className: ""},
        React.createElement('button', {type:  "button", onClick : updateMangafox}, "get list"),
        React.createElement('ul', {}, mangafoxItemElements)
      );
    ReactDOM.render(
      newRootElement,
      document.getElementById('appRoot')
    );
  });
}
