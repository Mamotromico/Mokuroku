require('./../components/ChapterListWrap.component.js');

ChapterListWrapContainer = React.createClass({
  getInitialState: function() {
    return {

    };
  },
  render:function() {
    return React.createElement(ChapterListWrap);
  }
});

module.exports = ChapterListWrapContainer;
