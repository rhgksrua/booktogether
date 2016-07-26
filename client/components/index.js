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
import AllBookDetailContainer from './books/allBooks/BookDetailContainer';
import UserBooksContainer from './books/userBooks/UserBooksContainer';
import UserBookDetailContainer from './books/userBooks/BookDetailContainer';
import AddBookContainer from './books/addBooks/AddBookContainer';
import MeContainer from './users/MeContainer';

import '../styles/index.scss';

const loggerMiddleware = createLogger();

let store = createStore(bookApp, applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={AppContainer}>
                <IndexRoute component={Home} />
                <Route path='/signup'        component={SignUpContainer} />
                <Route path='/login'         component={LogInContainer} />
                <Route path='/allbooks'      component={AllBooksContainer} />
                <Route path='/allbooks/:id'  component={AllBookDetailContainer} />
                <Route path='/mybooks'       component={UserBooksContainer} />
                <Route path='/mybooks/:id'   component={UserBookDetailContainer} />
                <Route path='/search'        component={AddBookContainer} />
                <Route path='/me'            component={MeContainer} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
