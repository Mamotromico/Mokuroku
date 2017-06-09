require('./../components/chapter/ChapterListWrap.component.js');

ChapterListWrapContainer = React.createClass({
  getInitialState: function() {
    return {
      selectedManga: '',
      chapterListJson: [],
    };
  },
  render:function() {
    return React.createElement(ChapterListWrap, {
                                                  updateChapterList: this.updateChapterList,
                                                  selectedManga: this.selectedManga,
                                                  chapterListJson: this.chapterListJson
                                                });
  }
});

module.exports = ChapterListWrapContainer;
