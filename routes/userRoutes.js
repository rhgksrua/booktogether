'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const isLoggedInAJAX = require('../utils/middlewares').isLoggedInAJAX;

module.exports = function(passport) {

    // All signups go through handleSignUpFailure middleware. handleSignUpFailure checks for
    // any errors and if any errors are returned from passport.js, errors are returned
    // to the client.
    router.post('/signup', handleSignUpFailure, handleSignUpSuccess);

    router.post('/login', passport.authenticate('local-login'), handleLogInSuccess);
    router.post('/logout', isLoggedInAJAX, handleLogOut);
    router.put('/address', isLoggedInAJAX, handleAddAddress);
    
    return router;

    function handleAddAddress(req, res) {
        const address =  req.body;

        // Adress validation
        if (!address.street.trim() ||
            !address.city.trim() ||
            !address.city.trim())
        {
            return res.json({error: 'validation fail'});
        }

        const userId = req.user._id;
        const query = {
            '_id': userId
        };
        const update = {
            'local.street': address.street,
            'local.city': address.city,
            'local.zip': address.zip
        };
        const options = {
            'new': true
        };

        User.findOneAndUpdate(query, update, options, function(err, doc) {
            if (err) return res.json({error: 'db error'});
            const userInfo = {
                email: req.user.local.email,
                first: req.user.local.first,
                last: req.user.local.last,
                username: req.user.local.username,
                street: address.street,
                city: address.city,
                zip: address.zip
            };
            return res.json(userInfo);
        });
    }
    
    function handleLogInSuccess(req, res) {
        const user = req.user.local;
        let userInfo = {
            email: req.user.local.email,
            first: req.user.local.first,
            last: req.user.local.last,
            username: req.user.local.username,
            street: req.user.local.street,
            city: user.city,
            zip: user.zip
        };
        return res.json(userInfo);
    }
    
    /**
     * handleSignUpFailure
     *
     * this is a middleware for all signup requests.  Mostly checks for
     * existing username and email.  Returns JSON with errors to client
     * if any passport or user input errors are detected.
     *
     * @param req
     * @param res
     * @param next
     * @returns {undefined}
     */
    function handleSignUpFailure(req, res, next) {
        passport.authenticate('local-signup', function(err, user, customErrors) {
            // err - passport errors.
            // user - user info is sucessful.
            // customErrors - username/email exits.
            if (err) return res.json({error: true});
            if (!user) {
                return res.json({errors: customErrors});
            }
            req.user = user;
            next();
        })(req, res, next);
    }
    
    /**
     * handleSignUpSuccess
     *
     * @param req
     * @param res
     * @returns {undefined}
     */
    function handleSignUpSuccess(req, res) {
        console.log('handle signup');
        let userInfo = {
            email: req.user.local.email,
            first: req.user.local.first,
            last: req.user.local.last,
            username: req.user.local.username
        };
        // manually setting cookies for users
        req.logIn(req.user, function(err) {
            console.log('__________________________');
            console.log('error from passport:', err);
            if (err) {
                // err contains error message from passport.js
                // err.username - username exists.
                // err.email - email exists.
                return res.json({error: err});
            }
            return res.json(userInfo);
        });
    }
    
    function handleLogOut(req, res) {
        req.logout();
        res.json({status: 'logged out'});
    }
};

