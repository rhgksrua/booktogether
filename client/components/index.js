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
//let store = createStore(bookApp, applyMiddleware(thunkMiddleware));

const auth = (nextState, replace) => {
    // Need to check for user token.
    // However, token isn't implemented right now.
    // 
    // All the routes that need user authentication will not be seen by unregistered users
    // unless they type thr url in the browser.
};

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={AppContainer}>
                <IndexRoute component={Home} />
                <Route path='/signup'        component={SignUpContainer} />
                <Route path='/login'         component={LogInContainer} />
                <Route path='/allbooks'      component={AllBooksContainer} />
                <Route path='/allbooks/:id'  component={AllBookDetailContainer} />
                <Route path='/mybooks'       component={UserBooksContainer} onEnter={auth} />
                <Route path='/mybooks/:id'   component={UserBookDetailContainer} onEnter={auth} />
                <Route path='/search'        component={AddBookContainer} onEnter={auth}/>
                <Route path='/me'            component={MeContainer} onEnter={auth} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));



