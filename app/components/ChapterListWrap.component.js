require ("./../components/ChapterList.component.js");
require ("./../components/ChapterButtonsWrap.component.js");

ChapterListWrap = React.createClass({
  propTypes: {
    updateChapterList: React.PropTypes.func.isRequired,
    selectedManga: React.PropTypes.string,
    chapterListJson: React.PropTypes.array.isRequired
  },
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1b6bd5',
      padding: '10px'
    };

    return React.createElement('div', {style: divStyle, className: "chapter-list-wrap", list: this.props.list},
      React.createElement(ChapterButtonsWrap,{
                                          updateChapterList:  this.props.updateMangaList,
                                        }),
      React.createElement(ChapterList, {chapterListJson: this.props.chapterListJson})
    );
  }
});

module.exports = ChapterListWrap;
