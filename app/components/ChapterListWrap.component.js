require ("./../components/ChapterList.component.js");

ChapterListWrap = React.createClass({
  propTypes: {

  },
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1b6bd5',
      padding: '10px'
    };

    return React.createElement('div', {style: divStyle, className: "chapter-list-wrap", list: this.props.list}
      // React.createElement(ChapterList, {chapterListJson: this.props.chapterListJson})
    );
  }
});

module.exports = ChapterListWrap;
