React = require('react');
MangaItem = require('./../components/mangaItem.js');

module.exports = React.createClass({
  propTypes: {

  },
  getInitialState: function() {
    return {
      mangaList : []
    };
  },
  render: function() {
    return (
      React.createElement('div', {className: 'mangalist'},
        mangaList.forEach(function(mangaPair) {
          React.createElement(MangaItem, mangaPair);
        })
      )
    );
  }
});
