import { combineReducers } from 'redux';

function bookApp(state = {}, action) {
    switch(action.type) {
        case 'TEST':
            return state;
        default:
            return state;
    }
}

export default bookApp;