import { combineReducers } from 'redux';
import {
    ADD_USERINFO,
    LOG_OUT,
    ADD_ALL_BOOKS
} from '../actions/actionTypes';

function books(state = [], action) {
    switch(action.type) {
        case ADD_ALL_BOOKS:
            return action.books;
        default:
            return state;
    }
}

function userBooks(state = [], action) {
    switch(action.type) {
        case 'TEST':
            return state;
        default:
            return state;
    }
}

function userInfo(state = {}, action) {
    switch(action.type) {
        case ADD_USERINFO:
            return action.userInfo;
        case LOG_OUT:
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    books,
    userBooks,
    userInfo
});