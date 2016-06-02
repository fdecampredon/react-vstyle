var ReactInjection = require('react/lib/ReactInjection');
var StylesRendererProvider = require('./StylesRendererProvider');
var stylesRendererShape = require('./stylesRendererShape');
var VStyleDOMComponent = require('./VStyleDOMComponent');
var withRenderStyles = require('./withRenderStyles');

exports.StylesRendererProvider = StylesRendererProvider;
exports.stylesRendererShape = stylesRendererShape;
exports.withRenderStyles = withRenderStyles;
exports.injectNativeComponent = function () {
  ReactInjection.NativeComponent.injectGenericComponentClass(VStyleDOMComponent);
};
