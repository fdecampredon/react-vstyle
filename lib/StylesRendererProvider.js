var React = require('react');
var stylesRendererShape = require('./stylesRendererShape');

var StylesRendererProvider = React.createClass({

  propTypes: {
    stylesRenderer: stylesRendererShape.isRequired,
    children: React.PropTypes.element.isRequired
  },

  childContextTypes: {
    _stylesRenderer: stylesRendererShape.isRequired
  },

  getChildContext: function () {
    return { _stylesRenderer: this.props.stylesRenderer };
  },

  componentWillReceiveProps: function (props) {
    if (props.stylesRenderer !== this.props.stylesRenderer) {
      throw new Error(
        '<StylesRendererProvider> does not support changing `stylesRenderer` on the fly.'
      );
    }
  },

  render: function () {
    return React.Children.only(this.props.children);
  }
});

module.exports = StylesRendererProvider;
