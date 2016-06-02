var React = require('react');
var assign = require('object-assign');
var stylesRendererShape = require('./stylesRendererShape');

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withRenderStyles(WrappedComponent) {
  var WithRenderStyles = React.createClass({

    contextTypes: {
      _stylesRenderer: stylesRendererShape.isRequired
    },

    render: function () {
      return React.createElement(
        WrappedComponent,
        assign(
          {},
          this.props,
          { renderStyles: this.context._stylesRenderer.renderStyles }
        )
      );
    }
  });

  WithRenderStyles.displayName = 'withRenderStyles(' + getDisplayName(WrappedComponent) + ')';
  WithRenderStyles.WrappedComponent = WrappedComponent;

  return WithRenderStyles;
}

module.exports = withRenderStyles;
