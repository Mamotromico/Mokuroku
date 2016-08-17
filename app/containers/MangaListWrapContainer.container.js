require('./../components/MangaListWrap.component.js');

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
    console.log(source);
    console.log(sourceList.get(source));
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
