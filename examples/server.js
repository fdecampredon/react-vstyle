import http from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import browserify from 'browserify';
import serialize from 'serialize-javascript';
import { createStylesRenderer } from 'vstyle';
import { StylesRendererProvider, injectNativeComponent } from 'react-vstyle';
import App from './src/App';

injectNativeComponent();

http.createServer((req, res) => {
  if (req.url === '/bundle.js') {
    res.setHeader('content-type', 'application/javascript');
    const b = browserify(`${__dirname}/src/index.js`).transform('babelify').bundle();
    b.pipe(res);
  } else {
    const stylesRenderer = createStylesRenderer();
    const markup = ReactDOMServer.renderToString(
      <StylesRendererProvider stylesRenderer={stylesRenderer}>
        <App stylesRenderer={stylesRenderer} />
      </StylesRendererProvider>
    );
    const styles = stylesRenderer.renderToString();
    const rendererStates = stylesRenderer.serialize();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!doctype html>
      <html>
          <head>
              <meta charset="utf-8">
              <style id="style">${styles}</style>
          </head>
          <body>
              <div id="content">${markup}</div>
              <script>
                window.STYLES_RENDERER_STATES = ${serialize(rendererStates)}
              </script>
              <script src="./bundle.js"></script>
          </body>
      </html>
    `);
  }
}).listen(3000);
