import React, { Component } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import AppContent from './AppContent';
import store from './redux';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StoreProvider store={store}>
        <AppContent />
      </StoreProvider>
    );
  }
}
