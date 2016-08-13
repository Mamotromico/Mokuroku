MangaListFilterBox = React.createClass({
  render: function() {
    var divStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      padding: '2px',
      flex: '0 0 auto'
    };
    return React.createElement('div',{className: 'manga-list-filter', style: divStyle},
      React.createElement('div', {style: {
                                          flex:'0 0 auto',
                                          backgroundColor: 'rgba(249, 112, 178, 0.61)',
                                          boxSizing: 'border-box',
                                          padding: '2px'
                                        },
                                  className: 'manga-list-filter-text'}, 'Filter'),
      React.createElement('input',{className: 'manga-list-filter-box', style: {boxSizing: 'border-box',flex:'1 0 auto'}, type: 'text'},null)
    );
  }
});

module.exports = MangaListFilterBox;
