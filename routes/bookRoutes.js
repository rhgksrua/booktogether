'use strict';

const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const Trade = require('../models/Trade');
const Promise = require('bluebird');

const router = express.Router();
const isLoggedInAJAX = require('../utils/middlewares').isLoggedInAJAX;

router.put('/add', isLoggedInAJAX, handleAddBook);
router.get('/me', isLoggedInAJAX, handleMyBooks);
router.get('/all', handleAllBooks);
router.delete('/remove', isLoggedInAJAX, handleRemove);
router.post('/request', isLoggedInAJAX, handleRequestBook);
router.delete('/removerequest', isLoggedInAJAX, handleRemoveRequest);
router.put('/trade', isLoggedInAJAX, handleTrade);
router.put('/tradetest', handleTrade);

function handleTrade(req, res) {
    // destructuring not supported in nodejs version < 6
    //console.log('--- tradeobj', req.body);
    const owner = req.body.owner;
    const ownerBookId = req.body.ownerBookId;
    const requester = req.body.requester;
    const requesterBookId = req.body.requesterBookId;
    let requesterId;

    // Basic serverside validation
    if (!owner || !ownerBookId || !requester || !requesterBookId) {
        return res.json({error: 'missing body'});
    }

    const a = User.findOne({'local.username': owner}).exec();
    const b = User.findOne({'local.username': requester}).exec();
    Promise.all([a, b]).then(function(values) {
        if (!values[0] || !values[1]) {
            console.log('user does not exist');
            throw new Error('user does not exist');
        }
        requesterId = values[1]._id;
        return values;
    })
    .then(function(users) {
        const ownerBookQuery = Book.findOne({'id': ownerBookId, 'owners.username': owner}).exec();
        const requesterBookQuery = Book.findOne({'id': requesterBookId, 'owners.username': requester}).exec();

        return Promise.all([ownerBookQuery, requesterBookQuery]);
    })
    .then(function(books) {
        const tradeInfo = {
            owner: {
                id: req.user.id,
                username: owner,
                bookId: ownerBookId
            },
            requester: {
                id: requesterId,
                username: requester,
                bookId: requesterBookId
            }
        }
        const newTrade = new Trade(tradeInfo);
        const tradeQuery = newTrade.save();
        return tradeQuery;
    })
    .then(function(val) {
        console.log(val);
        return res.json({status: 'trade submitted'});
    })
    .catch(function(err) {
        console.log(err);
        return res.json({error: 'error'});
    });
    //res.json({status: 'trading...'});
}

function handleRemoveRequest(req, res) {
    // user
    const user = req.user;
    // bood id
    const bookId = req.body.id;
    const query = {id: bookId};
    Book.findOne(query, function(err, book) {
        if (err) return res.json({error: 'db error'});

        if (!book) return res.json({error: 'book does not exist'});

        const newRequests = book.requests.filter(request => {
            console.log(request.username, user.local.username);
            return request.username !== user.local.username;
        });
        console.log(newRequests);

        book.requests = newRequests;
        book.save(function(err, book) {
            console.log('removed request', book.requests);
            if (err) return ({error: 'db error'});
            return res.json({status: 'removed request'});
        });
    });
}

function handleRequestBook(req, res) {
    const user = req.user;
    const id = req.body.id;
    const query = {'id': id};
    process.nextTick(function() {
        Book.findOne(query, function(err, book) {
            if (err) return res.json({error: 'db error'});
            
            if (!book) return res.json({error: 'book does not exist'});
            
            const userExists = book.requests.some(function(request) {
                return request.id === user._id.toString();
            });
            if (userExists) return res.json({error: 'user already requested this book'});
            
            book.requests.push({
                id: user._id,
                username: user.local.username
            });
            book.save(function(err, book) {
                if (err) return res.json({error: 'db error'});
                
                return res.json({status: 'added user to requests'});
            });
        });
    });
}

function handleRemove(req, res) {
    const userId = req.user._id;
    const id = req.body.id;
    const query = {id: id};
    const update = {
        $pull: {
            owners: {
                id: userId
            }
        }
    };
    const options = {};
    console.log('--- book id remove', id);
    Book.update(query, update, options, function(err, book) {
        if (err) {
            console.log(err);
            return res.json({error: 'db error remove'});
        }
        
        console.log('--- removed book', book);
        return res.json({status: 'removed'});
    });
    
}

function handleAllBooks(req, res) {
    let query = {owners: {$gt: []}};
    let projection = {
        'eTag': 1,
        'id': 1,
        'selfLink': 1,
        'volumeInfo': 1,
        'owners.username': 1,
        'requests.username': 1
    };
    Book.find(query, projection, function(err, books) {
        if (err) return res.json({error: 'db error all books'});
        if (!books) return res.json({books: []});
        return res.json({books: books});
        
    });
}

function handleMyBooks(req, res) {
    let user = req.user;
    process.nextTick(function() {
        let query = {
            'owners.id': user._id
        };
        let projection = {
            'eTag': 1,
            'id': 1,
            'selfLink': 1,
            'volumeInfo': 1,
            'requests.username': 1
        };
        Book.find(query, projection).exec()
            .then(function(book) {
                if (!book) {
                    return res.json({status: 'empty'});
                }
                let userInfo = {
                    email: req.user.local.email,
                    first: req.user.local.first,
                    last: req.user.local.last,
                    username: req.user.local.username
                };
                return res.json({books: book, userInfo: userInfo});
            })
            .catch(function(err) {
                console.log('db error', err);
                return res.json({error: 'db error'});
            });
         
    });

    function getRequesters() {
    }
}


function handleAddBook(req, res) {
    let user = req.user;
    let userBook = req.body.book;
    let query = {'id': req.body.book.id};
    
    process.nextTick(function() {
        Book.findOne(query, function(err, book) {
            if (err) return res.json({error: 'db error'});
            
            if (!book) {
                console.log('---- Adding new book');
                const newBook = new Book();
                newBook.eTag = userBook.eTag;
                newBook.id = userBook.id;
                newBook.selfLink = userBook.selfLink;
                newBook.volumeInfo = userBook.volumeInfo;
                newBook.owners.push({
                    id: user._id,
                    username: user.local.username
                });
                newBook.save(handleSave);
            } else {
                console.log('--- Updating existing book');
                book.owners.push({
                    id: user._id,
                    username: user.local.username
                });
                book.save(handleSave);
            }
            
        });
        
    });
    
    function handleSave(err, book) {
        if (err) return res.json({error: 'db error'});
        return res.json({
            status: 'added book',
            error: false
        });
    }
}


module.exports = router;
