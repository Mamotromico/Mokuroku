/*jshint esversion: 6 */

//React cores
React = require('react');
ReactDOM = require('react-dom');



//React Components
require('./components/AppRoot.component.js');


ReactDOM.render(
  React.createElement(AppRoot),
  document.getElementById('app')
);
