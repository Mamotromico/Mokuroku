require('./../containers/DownloaderWrapContainer.container.js');

AppRoot = React.createClass({
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
    };
    return React.createElement('div', {style: divStyle, className: "appRoot"},
      React.createElement(DownloaderWrapContainer)
    );
  }
});

module.exports = AppRoot;
