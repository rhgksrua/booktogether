import { combineReducers } from 'redux';
import {
    ADD_USER_INFO,
    ADD_ADDRESS,
    LOG_OUT,
    ADD_ALL_BOOKS,
    ADD_SEARCH_RESULTS,
    ADD_MY_BOOK,
    ADD_ALL_MY_BOOKS,
    REMOVE_MY_BOOK,
    REMOVE_REQUEST,
    UPDATE_BOOK,
    TRADE
} from '../actions/actionTypes';

function books(state = [], action) {
    let newBooks = [];
    switch(action.type) {
        case ADD_ALL_BOOKS:
            return action.books;
        case ADD_MY_BOOK:
            // check for dup
            const exists = state.some(book => {
                return book.id === action.book.id;
            });
            if (exists) return state;
            return state.concat(action.book);
        case REMOVE_REQUEST:
            newBooks = state.map(book => {
                if (book.id === action.id) {
                    let newReq = book.requests.filter(req => {
                        return req.username !== action.username;
                    });
                    book.requests = newReq;
                }
                return book;
            });
            return newBooks;
        case UPDATE_BOOK:
            newBooks = state.map(book => {
                if (book.id === action.id) {
                    let newReq = book.requests.concat({username: action.username});
                    book.requests = newReq;
                }
                return book;
            });
            return newBooks;
        default:
            return state;
    }
}

function userBooks(state = [], action) {
    switch(action.type) {
        case ADD_MY_BOOK:
            const exists = state.some(book => {
                return book.id === action.book.id;
            });
            if (exists) return state;
            return state.concat(action.book);
        case ADD_ALL_MY_BOOKS:
            return action.books;
        case REMOVE_MY_BOOK:
            return state.filter(book => {
                return book.id !== action.id;
            });
        case LOG_OUT:
            return [];
        default:
            return state;
    }
}

function booksResult(state = [], action) {
    switch(action.type) {
        case ADD_SEARCH_RESULTS:
            return action.books;
        default:
            return state;
    }
}

const userInfoState = {
    username: '',
    first: '',
    last: '',
    email: '',
    street: '',
    city: '',
    zip: ''
};

function userInfo(state = userInfoState, action) {
    switch(action.type) {
        case ADD_USER_INFO:
            return action.userInfo;
        case LOG_OUT:
            return {};
        case ADD_ADDRESS:
            return state;
        default:
            return state;
    }
}

function userTrade(state = [], action) {
    switch(action.type) {
        case TRADE:
            const tradeExists = state.some(trade => {
                trade._id === action.tradeObj._id;
            });
            if (tradeExists) return state;
            return state.concat(action.tradeObj);
        default:
            return state;
    }
}

export default combineReducers({
    books,
    userBooks,
    booksResult,
    userInfo,
    userTrade
});
