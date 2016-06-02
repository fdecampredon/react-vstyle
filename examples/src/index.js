import React from 'react';
import ReactDOM from 'react-dom';
import { createStylesRenderer } from 'vstyle';
import { StylesRendererProvider, injectNativeComponent } from 'react-vstyle';
import App from './App';

injectNativeComponent();

const stylesRenderer = createStylesRenderer(window.STYLES_RENDERER_STATES);
stylesRenderer.attach(document.getElementById('style'));

ReactDOM.render(
  <StylesRendererProvider stylesRenderer={stylesRenderer}>
    <App stylesRenderer={stylesRenderer} />
  </StylesRendererProvider>,
  document.getElementById('content')
);
