import MainNavigator from './src/navigation';
import {Provider} from 'react-redux';
import React from 'react';
import store from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
