import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css.map';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'
import configureStore from './store/store';

ReactDOM.render(
    <Provider store={configureStore()}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
