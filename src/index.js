import "./styles/styles.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import {applyMiddleware, createStore} from "redux";
import {operation, reducer} from "./reducer";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import createAPI from "./api";

const api = createAPI();

const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));

store.dispatch(operation.getUserData())

const init = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.body.querySelector('#root')
  )
};

init();
