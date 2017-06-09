require('./MangaOriginSelect.component.js');
require('./MangaButtonReadOrUpdate.component.js');

MangaButtonsWrap = React.createClass({
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
      React.createElement(MangaButtonReadOrUpdate, {
                                                  updateMangaList:  this.props.updateMangaList,
                                                  selectedWebsite: this.props.selectedWebsite
                                                })
    );
  }
});

module.exports = MangaButtonsWrap;
