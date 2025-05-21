import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from './Router';
import store01 from './store/Store01';
import store02 from './store/Store02';
import store03 from './store/Store03';
import store04 from './store/Store04';
import store05 from './store/Store05';
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const root = ReactDOM.createRoot(document.getElementById('root'))

const rootReducer = combineReducers({
  ...store01,
  ...store02,
  ...store03,
  ...store04,
  ...store05,
});

const store = configureStore({reducer: rootReducer});


root.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
