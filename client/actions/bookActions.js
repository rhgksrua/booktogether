import fetch from 'isomorphic-fetch';

import {
    ADD_ALL_BOOKS,
    ADD_SEAERCH_RESULTS
} from './actionTypes';

export const addAllBooks = (books) => {
    return {
        type: ADD_ALL_BOOKS,
        books
    };
};

export const allBooksFetch = () => {
    return dispatch => {
        return fetch(
            `${window.location.protocol}//${window.location.host}/books/all`,
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
        .then(books => {
            if (books.error) {
                throw new Error(books.error);
            }
            dispatch(addAllBooks(books));
        })
        .catch(err => {
            console.warn(err);
        });
    };
};

export const addSearchResults = books => {
    return {
        type: ADD_SEAERCH_RESULTS,
        books
    };
};

export const searchBookFetch = title => {
    const BROWSER_KEY = 'AIzaSyDVntFyQgC3VgT9uTJ6meXzXPLGQMG-W84';
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${BROWSER_KEY}`;
    const URL_NO_KEY = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&printType=books`;
    return dispatch => {
        return fetch(
            URL_NO_KEY,
            {
                method: 'get'
            }
        )
        .then(data => {
            return data.json();
        })
        .then(books => {
            if (books.error) {
                throw new Error(books.error);
            }
            console.log(books);
        })
        .catch(err => {
            console.warn(err);
        });
    };
};






