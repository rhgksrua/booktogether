'use strict';

const express = require('express');
const Book = require('../models/Book');

const router = express.Router();
const isLoggedInAJAX = require('../utils/middlewares').isLoggedInAJAX;

router.put('/add', isLoggedInAJAX, handleAddBook);
router.get('/me', isLoggedInAJAX, handleMyBooks);
router.get('/all', handleAllBooks);
router.delete('/remove', isLoggedInAJAX, handleRemove);

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
        'owners': 1
    };
    Book.find(query, projection, function(err, books) {
        if (err) return res.json({error: 'db error all books'});
        
        if (!books) return res.json({books: []});
        
        return res.json({books: books});
        
    });
}

function handleMyBooks(req, res) {
    let user = req.user;
    console.log('---- user', user);
    process.nextTick(function() {
        let query = {
            'owners.id': user._id
        };
        let projection = {
            'eTag': 1,
            'id': 1,
            'selfLink': 1,
            'volumeInfo': 1,
            'requests': 1
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
}


function handleAddBook(req, res) {
    //console.log('in handle add book', req.body.book);
    console.log('user', req.user);
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