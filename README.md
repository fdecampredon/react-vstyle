# react-vstyle

> React bindings for [VStyle](https://github.com/fdecampredon/vstyle)


## Install
You can install react-vstyle through npm: 
```
npm install react-vstyle
```

## Usage

### StylesRendererProvider

react-vstyle let you inject a VStyle `StylesRenderer` in the react context with the `StylesRendererProvider` component: 

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStylesRenderer } from 'vstyle';
import { StylesRendererProvider } from 'react-vstyle';
import MyComponent from './myComponent';

const stylesRenderer = createStylesRenderer();

ReactDOM.render(
  <StylesRendererProvider stylesRenderer={stylesRenderer}>
    <MyComponent />
  </StylesRendererProvider>,
  docuent.getElementById('root')
);
```

once you have injected your `StylesRenderer` into the context you can consume your styles in 2 ways :

## withRenderStyles

`withRenderStyles` is an higher order component that will inject the `renderStyles`
function of the `StylesRenderer` to the props of the wrapped component:

```javascript
import React from 'react';
import { StyleSheet } from 'vstyle';
import { withRenderStyles } from 'react-vstyle';

const styles = StyleSheet.create({
  button: {
    color: 'blue',
  },
});

function MyComponent({ renderStyles, styles: otherStyles }) {
  return <Button className={renderStyles(styles.button, otherStyles)} />;
}

export default withRenderStyles(MyComponent)
```

## Navive component injection

Alternatively you can use the experimental `injectNativeComponent` function of react-vstyle,
then you can drop your styles in the `styles` (notice the _s_) property of your DOM components:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStylesRenderer } from 'vstyle';
import { StylesRendererProvider, injectNativeComponent  } from 'react-vstyle';
import MyComponent from './myComponent';

injectNativeComponent();

const stylesRenderer = createStylesRenderer();

ReactDOM.render(
  <StylesRendererProvider stylesRenderer={stylesRenderer}>
    <MyComponent />
  </StylesRendererProvider>,
  docuent.getElementById('root')
);
```

```javascript
import React from 'react';
import { StyleSheet } from 'vstyle';
import { withRenderStyles } from 'react-vstyle';

const styles = StyleSheet.create({
  button: {
    color: 'blue',
  },
});

export default function MyComponent({ styles: otherStyles }) {
  return <Button styles={[styles.button, otherStyles]} />;
}
```
