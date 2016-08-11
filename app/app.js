/*jshint esversion: 6 */

//React cores
var React = require('react');
var ReactDOM = require('react-dom');

//TODO:10 Load these plugins dinamically
var MANGAFOX = require('./../plugins/mangafox.js');

//Name plugin pair
var sourceList = new Map();
sourceList.set('mangafox', MANGAFOX);

//React Components
require('./components/MangaListItem.component.js');

// var MangaItem = require( './components/mangaItem.component.js');


MANGAFOX.readCompleteMangaList(false, function (parsedJson) {
  mangaListJson = parsedJson;
});

var MangaList = React.createClass({
  propTypes: {
    mangaListJson: React.PropTypes.array.isRequired
  },
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
    };
    var mangafoxItemElements = this.props.mangaListJson.map(function(mangafoxItemElement) {
      return React.createElement(MangaListItem, mangafoxItemElement);
    });
    return React.createElement('div', {style: divStyle, className: "manga-list"},
      mangafoxItemElements
    );
  }
});

// MangaListItem, {name: currentValue.name}

var MangaListContainer = React.createClass({
  propTypes: {
    mangaListJson: React.PropTypes.array.isRequired
  },
  render: function() {
    return React.createElement(MangaList, {mangaListJson: this.props.mangaListJson});
  }
});

var MangaOriginSelect = React.createClass({
  propTypes: {
    handleSelectChange: React.PropTypes.func.isRequired
  },
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flex: '1 0 auto',
      padding: '2px'
    };
    return React.createElement('select', {style: divStyle,
                                          className: "manga-list-origin-select",
                                          onChange: this.props.handleSelectChange},
      React.createElement('option', {value: "batoto"}, "batoto"),
      React.createElement('option', {value: "mangafox"}, "mangafox")
    );
  }
});

var MangaBtnReadOrUpdate = React.createClass({
  propTypes: {
    updateMangaList: React.PropTypes.func.isRequired,
    selectedWebsite: React.PropTypes.string
  },
  updateMangaListWithPropName: function (syntheticEvent) {
    this.props.updateMangaList(this.props.selectedWebsite);
  },
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      padding: '2px',
      width: '40px',
      contentAlign: 'center'
    };
    return React.createElement('button', {style: divStyle, className: "manga-list-update", onClick: this.updateMangaListWithPropName},
     "F5"
    );
  }
});

var MangaListFilterBox = React.createClass({
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      padding: '2px',
      flex: '0 0 auto'
    };
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
  propTypes: {
    updateMangaList: React.PropTypes.func.isRequired,
    handleSelectChange: React.PropTypes.func.isRequired,
    selectedWebsite: React.PropTypes.string
  },
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flex: '0 0 auto',
      padding: '2px',
      backgroundColor: 'rgb(19, 194, 63)'
    };
    return React.createElement('div', { style: divStyle, className: "manga-btn-wrap"},
      React.createElement(MangaOriginSelect, {
                                              handleSelectChange: this.props.handleSelectChange
                                            }),
      React.createElement(MangaBtnReadOrUpdate, {
                                                  updateMangaList:  this.props.updateMangaList,
                                                  selectedWebsite: this.props.selectedWebsite
                                                })
    );
  }
});

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
      React.createElement(MangaListContainer, {mangaListJson: this.props.mangaListJson})
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
