import { AppRegistry } from 'react-native';
import React from 'react';
import App from '../../App';
import { name as appName } from '../app.json';
import { Provider } from 'react-redux';
import store from './redux/store';

const RNRedux = () => {
  return(
    <Provider store={store} >
      <App />
    </Provider>
  )

}

AppRegistry.registerComponent(appName, () => RNRedux);