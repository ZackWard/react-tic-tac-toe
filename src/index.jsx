import React from "react";
import ReactDOM from "react-dom";

import {Provider} from "react-redux";
import store from "./stateManagement";

import TicTacToe from "./containers/GameContainer.js";

ReactDOM.render(
    <Provider store={store}>
        <TicTacToe />
    </Provider>,
  document.getElementById('root')
);