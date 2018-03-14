import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { IS_DEV } from '../utils/env';

import createStore from './redux/store/createStore';
import routes from './routes';

import App from './App';

const rootReact = document.getElementById('root');
const store = createStore();

const renderApp = (Component, appRoutes) => {
  render(
    <Provider store={store}>
      <Component routes={appRoutes}/>
    </Provider>, rootReact
  );
};

renderApp(App, routes);;

if (IS_DEV && module.hot) {
  module.hot.accept('./App', () => {
    import('./App').then(({ default: NextApp }) => {
      renderApp(NextApp, routes);
    });
  });

  module.hot.accept('./routes', () => {
    import('./routes').then(({ default: nextRoutes }) => {
      renderApp(App, nextRoutes);
    });

  });
}
