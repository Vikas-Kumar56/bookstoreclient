import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import reduxThunk from 'redux-thunk';
import reducers from '../module';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const renderWithRedux = (
  ui,
  { initialState, store = createStoreWithMiddleware(reducers, initialState) }
) => ({
  ...render(
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>{ui}</SnackbarProvider>
    </Provider>
  ),
});

export default renderWithRedux;
