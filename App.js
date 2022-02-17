import MainNavigator from './src/navigation';
import {Provider} from 'react-redux';
import React from 'react';
import {init} from './src/database/database';
import store from './src/store/store';

init()
  .then(() => {
    console.log('DB initialized');
  })
  .catch(err => {
    console.log('DB initialization failed', err);
  });

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
