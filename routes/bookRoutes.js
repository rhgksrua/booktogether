'use strict';

const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const Trade = require('../models/Trade');
const Promise = require('bluebird');

const router = express.Router();
const isLoggedInAJAX = require('../utils/middlewares').isLoggedInAJAX;

// parent url '/books'

router.put('/add', isLoggedInAJAX, handleAddBook);
router.get('/me', isLoggedInAJAX, handleMyBooks);
router.get('/all', handleAllBooks);
router.delete('/remove', isLoggedInAJAX, handleRemove);
router.post('/request', isLoggedInAJAX, handleRequestBook);
router.delete('/removerequest', isLoggedInAJAX, handleRemoveRequest);
router.put('/trade', isLoggedInAJAX, handleTrade);
router.put('/tradetest', handleTrade);
router.get('/trade', isLoggedInAJAX, handleGetTrade);
router.get('/tradetest', handleGetTrade);
router.put('/trade/complete', isLoggedInAJAX, handleComplete);

function handleComplete(req, res) {
    const user = req.user;
    const tradeId = req.body.tradeId;
    const owned = req.body.owned;

    let update;
    let userRole;
    let bookId;

    const query = {
        _id: tradeId
    };
    if (owned) {
        update = {
            $set: {'owner.status': true}
        };
        userRole = 'owner';
    } else {
        update = {
            $set: {'requester.status': true}
        };
        userRole = 'requester';
    }

    const options = {'new': true};
    Trade.findOneAndUpdate(query, update, options).exec()
        .then(trade => {
            if (trade.complete) {
                // Errors on trying to complete already complete trade.
                // Users should not be able to see the 'COMPLETE' button at all.
                throw new Error('error');
            }
            return trade;
        })
        .then(trade => {

            // bookId needed to remove books from user after completing trade.
            bookId = trade[userRole].bookId;
            if (trade.requester.status && trade.owner.status) {
                // Use this bookId to remove user from Book.users
                

                trade.complete = true;
                trade.completeDate = new Date;

                return trade.save();
            }
            return false; //res.json({status: 'waiting for other trader'});
        })
        .then(trade => {
            // Need to remove user from Book.owners
            const query = { id: bookId };
            const update = {
                $pull: {
                    owners: {
                        $elemMatch: {
                            id: user._id
                        }
                    }
                }
            };
            Book.findOneAndUpdate(query, update, {new: true}, function(err, doc) {
                if (err) throw new Error('db error trade');
                return res.json({status: 'trade complete'});
            });
        })
        .catch(err => {
            return res.json({error: err.message});
        });
}

function handleGetTrade(req, res) {
    const user = req.user;
    const query = {
        $or: [ 
            { 'requester.id': user._id }, 
            { 'owner.id': user._id } 
        ]
    };
    Trade.find(query).exec()
        .then(trades => {
            return trades;
        })
        .then(trades => {
            return res.json({trades: trades});
        })
        .catch(err => {
            if (err) {
                console.log(err);
            }
            return res.json({error: 'db error'});
        })
        


}

function handleTrade(req, res) {
    const owner = req.body.owner;
    const ownerBookId = req.body.ownerBookId;
    const ownerBookTitle = req.body.ownerBookTitle;

    const requester = req.body.requester;
    const requesterBookId = req.body.requesterBookId;
    const requesterBookTitle = req.body.requesterBookTitle;

    let requesterId;
    let completedTrade;

    // Basic serverside validation
    if (!owner || !ownerBookId || !requester || !requesterBookId) {
        return res.json({error: 'missing body'});
    }

    const a = User.findOne({'local.username': owner}).exec();
    const b = User.findOne({'local.username': requester}).exec();
    Promise.all([a, b]).then(function(values) {
        if (!values[0] || !values[1]) {
            throw new Error('user does not exist');
        }
        // Address does not exist.
        let owner = values[0];
        let requester = values[0];
        if (!owner.local.street ||
            !owner.local.city ||
            !owner.local.zip ||
            !requester.local.street ||
            !requester.local.city ||
            !requester.local.zip) {
            throw new Error('address does not exist');
        }
        requesterId = values[1]._id;
        return values;
    })
    .then(function(users) {
        // Get books for trade
        const ownerQuery = {
            'id': ownerBookId,
            'owners.username': owner,
            'owners.trade': { $ne: true }
        };
        const ownerDoc = {
            $set: {'owners.$.trade': true}
        };
        const ownerBookQuery = Book.findOneAndUpdate(ownerQuery, ownerDoc).exec();

        const requesterQuery = {
            'id': requesterBookId,
            'owners.username': requester,
            'owners.trade': { $ne: true }
        };
        const requesterDoc = {
            $set: {'owners.$.trade': true}
        };
        const requesterBookQuery = Book.findOneAndUpdate(requesterQuery, requesterDoc).exec();
        return Promise.all([ownerBookQuery, requesterBookQuery]);
    })
    .then(function(books) {
        if (!books[0]) {
            throw new Error('owner book up for trade');
        }
        if (!books[1]) {
            throw new Error('requester book up for trade');
        }
        // Save trade info
        const tradeInfo = {
            owner: {
                id: req.user.id,
                username: owner,
                bookId: ownerBookId,
                bookTitle: ownerBookTitle
            },
            requester: {
                id: requesterId,
                username: requester,
                bookId: requesterBookId,
                bookTitle: requesterBookTitle
            }
        }
        const newTrade = new Trade(tradeInfo);
        const tradeQuery = newTrade.save();
        return tradeQuery;
    })
    .then(function(trade) {
        // need to remove requests
        // Get owner book. Remove requester from requesters.

        completedTrade = trade;

        const removeQuery = {
            'id': ownerBookId
        };
        const removeUpdate = {
            '$pull': {'requests': {'username': requester}}
        };
        return Book.findOneAndUpdate(removeQuery, removeUpdate).exec();
    })
    .then(function(trade) {
        // Update user books
        return res.json(completedTrade);
    })
    .catch(function(err) {
        return res.json({error: err.message});
    });
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
            return request.username !== user.local.username;
        });

        book.requests = newRequests;
        book.save(function(err, book) {
            if (err) return ({error: 'db error'});
            return res.json({status: 'removed request'});
        });
    });
}

function handleRequestBook(req, res) {
    const user = req.user;

    // Address check
    if (!user.local.street ||
        !user.local.city ||
        !user.local.zip) {
        return res.json({error: 'address does not exist'});
    }

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
    Book.update(query, update, options, function(err, book) {
        if (err) {
            return res.json({error: 'db error remove'});
        }
        
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
                    email: user.local.email,
                    first: user.local.first,
                    last: user.local.last,
                    username: user.local.username,
                    street: user.local.street,
                    city: user.local.city,
                    zip: user.local.zip
                };
                return res.json({books: book, userInfo: userInfo});
            })
            .catch(function(err) {
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
