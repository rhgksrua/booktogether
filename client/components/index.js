import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import bookApp from '../reducers/bookApp';
import Home from './Home';
import AppContainer from './AppContainer';
import SignUpContainer from './users/SignUpContainer';
import LogInContainer from './users/LogInContainer';
import AllBooksContainer from './books/allBooks/AllBooksContainer';
import UserBooksContainer from './books/userBooks/UserBooksContainer';
import AddBookContainer from './books/addBooks/AddBookContainer';
import BookDetailContainer from './books/addBooks/BookDetailContainer';

import '../styles/index.scss';

const loggerMiddleware = createLogger();

let store = createStore(bookApp, applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={AppContainer}>
                <IndexRoute component={Home} />
                <Route path='/signup' component={SignUpContainer} />
                <Route path='/login' component={LogInContainer} />
                <Route path='/allbooks' component={AllBooksContainer} />
                <Route path='/allbooks/:id' component={BookDetailContainer} />
                <Route path='/mybooks' component={UserBooksContainer} />
                <Route path='/mybooks/:id' component={BookDetailContainer} />
                <Route path='/search' component={AddBookContainer} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
