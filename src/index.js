import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { AppContainer } from 'react-hot-loader';

import registerServiceWorker from './registerServiceWorker';

// Wrap the rendering in a function:
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('root')
  );
}

registerServiceWorker();

// First render
render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
