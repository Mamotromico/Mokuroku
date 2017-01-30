ChapterButtonReadOrUpdate = React.createClass({
  propTypes: {
    updateChapterList: React.PropTypes.func.isRequired,
    selectedManga: React.PropTypes.string
  },
  updateChapterList: function (syntheticEvent) {
    this.props.updateChapterList(this.props.selectedManga);
  },
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      padding: '2px',
      width: '40px',
      contentAlign: 'center'
    };
    return React.createElement('button', {style: divStyle, className: "chapter-list-update", onClick: this.updateChapterList},
     "F5"
    );
  }
});

module.exports = ChapterButtonReadOrUpdate;
