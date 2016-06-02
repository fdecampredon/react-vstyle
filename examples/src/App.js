// this example has been taken from aphrodite: https://github.com/Khan/aphrodite

import React from 'react';
import { StyleSheet, registerPlugin } from 'vstyle';
import defaultUnitPlugin from 'vstyle/lib/plugins/default-unit';
import { withRenderStyles } from 'react-vstyle';

registerPlugin(defaultUnitPlugin());


const styles = StyleSheet.create({
  blue: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 20,
  },
  red: {
    backgroundColor: 'red',
  },
  code: {
    backgroundColor: 'white',
    color: 'black',  
    padding: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
    borderRadius: 4,
  },
});

const WithRenderStylesDiv = withRenderStyles(({ renderStyles: r, red }) => (
  <div className={r(styles.blue, red && styles.red)}>
    I render my style using the <span className={r(styles.code)}>widthRenderStyles</span> HOC
  </div>
));

const InjectNativeDiv = ({ red }) => (
  <div styles={[styles.blue, red && styles.red]}>
    I render my style using the <span styles={styles.code}>styles</span> property and
    {' '}
    <span styles={styles.code}>injectNativeComponent</span>
  </div>
);

export default class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = { timer: false };
  }

  componentDidMount() {
    setInterval(() => this.setState({ timer: !this.state.timer }), 500);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <WithRenderStylesDiv red={timer} />
        <InjectNativeDiv red={!timer} />
      </div>
    );
  }
}
