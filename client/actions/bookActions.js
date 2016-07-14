import fetch from 'isomorphic-fetch';

import {
    ADD_ALL_BOOKS,
    ADD_SEARCH_RESULTS,
    ADD_MY_BOOK,
    ADD_ALL_MY_BOOKS,
    ADD_USER_INFO,
    REMOVE_MY_BOOK
} from './actionTypes';

import { addUserInfo } from './actions';

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
            console.log('---- all books', books);
            dispatch(addAllBooks(books.books));
        })
        .catch(err => {
            console.warn(err);
        });
    };
};

export const addSearchResults = books => {
    return {
        type: ADD_SEARCH_RESULTS,
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
            console.log('---- search results');
            dispatch(addSearchResults(books.items));
        })
        .catch(err => {
            console.warn(err);
        });
    };
};

export const addMyBook = book => {
    return {
        type: ADD_MY_BOOK,
        book
    };
};

export const addMyBookFetch = book => {
    const URL = `${window.location.protocol}//${window.location.host}/books/add`;
    return dispatch => {
        return fetch(
            URL,
            {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({ book })
            }
        )
        .then(data => {
            return data.json();
        })
        .then(status => {
            if (book.error) {
                throw new Error(book.error);
            }
            console.log('book add ajax response', status);
            dispatch(addMyBook(book));
        })
        .catch(err => {
            console.warn(err);
        });
    };
};

export const addAllMyBooks = (books) => {
    return {
        type: ADD_ALL_MY_BOOKS,
        books
    };
};

export const userBooksFetch = () => {
    const URL = `${window.location.protocol}//${window.location.host}/books/me`;
    return dispatch => {
        return fetch(
            URL,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            }
        )
        .then(data => {
            return data.json();
        })
        .then(books => {
            if (books.error) {
                throw new Error(books.error);
            }
            console.log('book fetch ajax response', books.books);
            dispatch(addUserInfo(books.userInfo));
            dispatch(addAllMyBooks(books.books));
        })
        .catch(err => {
            console.warn(err);
        });
    };
};

export const removeMyBook = id => {
    return {
        type: REMOVE_MY_BOOK,
        id
    };
}

export const removeMyBookFetch = id => {
    const URL = `${window.location.protocol}//${window.location.host}/books/remove`;
    return dispatch => {
        return fetch(
            URL,
            {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin',
                body: JSON.stringify({ id })
            }
        )
        .then(data => {
            return data.json();
        })
        .then(books => {
            if (books.error) {
                throw new Error(books.error);
            }
            console.log('book fetch ajax response', books.books);
            dispatch(removeMyBook(id));
        })
        .catch(err => {
            console.warn(err);
        });
    };
    
}




