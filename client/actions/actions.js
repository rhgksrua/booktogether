import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import { userBooksFetch } from './bookActions';

import {
    SIGN_UP,
    LOG_IN,
    LOG_OUT,
    ADD_USER_INFO,
    ADD_ADDRESS,
    SIGN_UP_ERRORS,
    CLEAR_ERRORS,
} from './actionTypes';

export const signUp = (userInfo) => {
    return {
        type: SIGN_UP,
        userInfo
    };
};

export const addUserInfo = userInfo => {
    return {
        type: ADD_USER_INFO,
        userInfo
    };
};

export const addAddressFetch = address => {
    return dispatch => {
        return fetch(
            `${window.location.protocol}//${window.location.host}/user/address`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                method: 'put',
                body: JSON.stringify(address)
            }
        )
        .then(data => {
            return data.json();
        })
        .then(userInfo => {
            if (userInfo.error) {
                throw new Error(userInfo.error);
            }
            dispatch(addUserInfo(userInfo));
            browserHistory.push('/mybooks');
        })
        .catch(err => {
            console.warn(err);
        });
    };

}

export const logOut = () => {
    return {
        type: LOG_OUT
    };
};

export const signUpErrors = (errors) => {
    return {
        type: SIGN_UP_ERRORS,
        errors
    };
}

export const clearAccountErrors = () => {
    return {
        type: CLEAR_ERRORS,
    }
}

export const signUpFetch = userInfo => {
    return dispatch => {
        // Clear errors before another attemp at sign up is made.
        dispatch(clearAccountErrors());
        return fetch(
            `${window.location.protocol}//${window.location.host}/user/signup`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                method: 'post',
                body: JSON.stringify(userInfo)
            }
        )
        .then(data => {
            return data.json();
        })
        .then(userInfo => {
            if (userInfo.errors) {
                dispatch(signUpErrors(userInfo.errors));
                throw new Error('sign up errors');
            }
            dispatch(addUserInfo(userInfo));
            browserHistory.push('/mybooks');
        })
        .catch(err => {
            console.warn(err.message);
        });
    };
};

export const logInFetch = userInfo => {
    return dispatch => {
        return fetch(
            `${window.location.protocol}//${window.location.host}/user/login`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                method: 'post',
                body: JSON.stringify(userInfo)
            }
        )
        .then(data => {
            return data.json();
        })
        .then(userInfo => {
            if (userInfo.error) {
                throw new Error(userInfo.error);
            }
            console.log('---- login fetch', userInfo);
            dispatch(userBooksFetch());
            browserHistory.push('/mybooks');
        })
        .catch(err => {
            console.warn(err);
        });
    };
};

export const logOutFetch = () => {
    return dispatch => {
        return fetch(
            `${window.location.protocol}//${window.location.host}/user/logout`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                method: 'post'
            }
        )
        .then(data => {
            return data.json();
        })
        .then(userInfo => {
            if (userInfo.error) {
                throw new Error(userInfo.error);
            }
            dispatch(logOut());
            browserHistory.push('/login');
        })
        .catch(err => {
            console.warn(err);
        });
    };
};


export const checkLogInStatusFetch = (currentPath) => {
    return dispatch => {
        return fetch(
            `${window.location.protocol}//${window.location.host}/user/status`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                method: 'post'
            }
        )
        .then(data => {
            return data.json();
        })
        .then(userInfo => {
            if (userInfo.error) {
                throw new Error(userInfo.error);
            }
            /*
            if (currentPath === '/login' || currentPath === '/signup') {
                browserHistory.push('/');
            }
            */
            dispatch(addUserInfo(userInfo));
        })
        .catch(err => {
            console.warn(err);
        });
        
    }
}
