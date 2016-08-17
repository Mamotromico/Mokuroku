/*jshint esversion: 6 */

//React cores
React = require('react');
ReactDOM = require('react-dom');

//TODO:10 Load these plugins dinamically
var MANGAFOX = require('./../plugins/mangafox.js');
var MANGAREADER = require('./../plugins/mangareader.js');

//Name plugin pair
var sourceList = new Map();
sourceList.set('mangafox', MANGAFOX);
sourceList.set('mangareader', MANGAREADER);

//React Components
require('./components/AppRoot.component.js');


ReactDOM.render(
  React.createElement(AppRoot),
  document.getElementById('app')
);
