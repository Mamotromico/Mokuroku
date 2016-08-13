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
require('./components/MangaList.component.js');
require('./components/MangaListFilterBox.component.js');
require('./components/MangaButtonsWrap.component.js');


var MangaListWrap = React.createClass({
  propTypes: {
    updateMangaList: React.PropTypes.func.isRequired,
    handleSelectChange: React.PropTypes.func.isRequired,
    selectedWebsite: React.PropTypes.string,
    mangaListJson: React.PropTypes.array.isRequired
  },
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1b6bd5',
      padding: '10px'
    };

    return React.createElement('div', {style: divStyle, className: "manga-list-wrap", list: this.props.list},
      React.createElement(MangaButtonsWrap,{
                                            updateMangaList:  this.props.updateMangaList,
                                            handleSelectChange: this.props.handleSelectChange,
                                            selectedWebsite: this.props.selectedWebsite
                                          }),
      React.createElement(MangaListFilterBox),
      React.createElement(MangaList, {mangaListJson: this.props.mangaListJson})
    );
  }
});

var MangaListWrapContainer = React.createClass({
  getInitialState: function() {
    return {
      selectedWebsite: '',
      mangaListJson: [],
      filterText: ''
    };
  },
  handleFilterChange: function (newFilter) {
    this.setState({
      selectedWebsite: this.state.selectedWebsite,
      mangaListJson: this.state.mangaListJson,
      filterText: newFilter
    });
  },
  handleSelectChange: function(newOption) {
    var newSourceWebsite = newOption.target.value;
    console.log(newSourceWebsite);
    var bindThis = this;
    sourceList.get(newSourceWebsite).readCompleteMangaListPromise(false)
    .then(function(parsedJson) {
      bindThis.setState({
        selectedWebsite: newSourceWebsite,
        mangaListJson: parsedJson,
        filterText: bindThis.state.filterText
      });
    })
    .catch(function(err) {
      console.log("error caught:");
      console.error(err);
    });
  },
  updateMangaList: function updateMangaList(source) {
    sourceList.get(source).getCompleteMangaList(false, function (parsedJson) {
      this.setState({
        selectedWebsite: this.state.selectedWebsite,
        mangaListJson: parsedJson,
        filterText: this.state.filterText
      });
    });
  },
  render: function() {
    return React.createElement(MangaListWrap, {
                                                updateMangaList:  this.updateMangaList,
                                                handleSelectChange: this.handleSelectChange,
                                                selectedWebsite: this.state.selectedWebsite,
                                                mangaListJson: this.state.mangaListJson
                                              });
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
    };

    return React.createElement('div', {style: divStyle, className: "dl-wrap"},
      React.createElement(MangaListWrapContainer)
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
    };
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
