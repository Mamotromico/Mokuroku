
ChapterList = React.createClass({
  propTypes: {
    chapterListJson: React.PropTypes.array.isRequired
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
    // var chapterItemElements = this.props.chapterListJson.map(function(chapterItemElement) {*/
    //   return React.createElement(ChapterListItem/*, chapterItemElement*/);
    // });
    return React.createElement('div', {style: divStyle, className: "chapter-list"}
      // chapterItemElements
    );
  }
});

module.exports = ChapterList;
