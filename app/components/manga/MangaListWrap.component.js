require('./MangaList.component.js');
require('./MangaListFilterBox.component.js');
require('./MangaButtonsWrap.component.js');

MangaListWrap = React.createClass({
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

module.exports = MangaListWrap;
