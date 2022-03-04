import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
import yajadeReducer from "./reducers/yajadeReducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {loadState,saveState }from './localStorage';
import * as serviceWorker from './serviceWorker';
import { YajadeActionTypes } from "./reducers/yajadeReducer";
import firebase from "firebase";
import config from './config';
firebase.initializeApp(config);

const persistedState = loadState();


  const store =  createStore(yajadeReducer,persistedState)
 
  store.subscribe(() => {
    saveState(store.getState());
    console.log(store.getState())
    // firebase.database().ref('/app').set(store.getState().appsList);
    // firebase.database().ref('/user').set(store.getState().userList);

  })



  
ReactDOM.render(
    <Provider store={store}>
              <App />
          </Provider>,
    document.getElementById("root")
  );
  




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
