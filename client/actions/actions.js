import fetch from 'isomorphic-fetch';

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const SET_USER_INFO = 'SET_USER_INFO';

export const signUp = (userInfo) => {
    return {
        type: SIGN_UP,
        userInfo
    };
};

export const addUserInfo = userInfo => {
    return {
        type: SET_USER_INFO,
        userInfo
    };
};

export const signUpFetch = userInfo => {
    return dispatch => {
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
            if (userInfo.error) {
                throw new Error(userInfo.error);
            }
            dispatch(addUserInfo(userInfo));
        })
        .catch(err => {
            console.warn(err);
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
            dispatch(addUserInfo(userInfo));
        })
        .catch(err => {
            console.warn(err);
        });
    };
};