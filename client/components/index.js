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
import SignUpContainer from './users/SignUpContainer';
import LogInContainer from './users/LogInContainer';
import AllBooksContainer from './books/AllBooksContainer';
import UserBooksContainer from './books/UserBooksContainer';
import AddBookContainer from './books/AddBookContainer';

const loggerMiddleware = createLogger();

let store = createStore(bookApp, applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home} />
                <Route path='/signup' component={SignUpContainer} />
                <Route path='/login' component={LogInContainer} />
                <Route path='/allbooks' component={AllBooksContainer} />
                <Route path='/mybooks' component={UserBooksContainer} />
                <Route path='/search' component={AddBookContainer} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));