require('./../components/manga/MangaListWrap.component.js');

//TODO:10 Load these plugins dinamically
var MANGAREADER = require('./../../plugins/mangareader.js');
var MANGAFOX = require('./../../plugins/mangafox.js');


//Name plugin pair
var sourceList = new Map();
sourceList.set('mangareader', MANGAREADER);
sourceList.set('mangafox', MANGAFOX);

MangaListWrapContainer = React.createClass({
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

module.exports = MangaListWrapContainer;
