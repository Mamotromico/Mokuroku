require('./ChapterListFilterBox.component.js');
require('./ChapterButtonReadOrUpdate.component.js');

ChapterButtonsWrap = React.createClass({
  propTypes: {
    updateChapterList: React.PropTypes.func.isRequired
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
      React.createElement(ChapterButtonReadOrUpdate, {
                                                updateChapterList:  this.props.updateChapterList
                                              }),
      React.createElement(ChapterListFilterBox)
    );
  }
});

module.exports = ChapterButtonsWrap;
