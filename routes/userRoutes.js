'use strict';

const express = require('express');
const router = express.Router();
const isLoggedInAJAX = require('../utils/middlewares').isLoggedInAJAX;

module.exports = function(passport) {
    router.post('/signup', handleSignUpFailure, handleSignUpSuccess);
    router.post('/login', passport.authenticate('local-login'), handleLogInSuccess);
    router.post('/logout', isLoggedInAJAX, handleLogOut);
    
    return router;
    
    function handleLogInSuccess(req, res) {
        let userInfo = {
            email: req.user.local.email,
            first: req.user.local.first,
            last: req.user.local.last,
            username: req.user.local.username
        };
        return res.json(userInfo);
    }
    
    function handleSignUpFailure(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) return res.json({errors: true});
            if (!user) {
                return res.json(info);
            }
            req.user = user;
            next();
        })(req, res, next);
    }
    
    function handleSignUpSuccess(req, res) {
        let userInfo = {
            email: req.user.local.email,
            first: req.user.local.first,
            last: req.user.local.last,
            username: req.user.local.username
        };
        // manually setting cookies for users
        req.logIn(req.user, function(err) {
            if (err) return res.json({error: 'cookie error'});
            return res.json(userInfo);
        });
    }
    
    function handleLogOut(req, res) {
        req.logout();
        res.json({status: 'logged out'});
    }
};

