import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import bookApp from '../reducers/bookApp';
import Home from './Home';
import App from './App';

const loggerMiddleware = createLogger();

let store = createStore(bookApp, applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));