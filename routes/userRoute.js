'use strict';

const express = require('express');
const router = express.Router();

module.exports = function(passport) {
    router.post('/signup', passport.authenticate('local-signup'),
        function(req, res) {
            // user info in req.user
            console.log('req user', req.user);
            let userInfo = {
                email: req.user.local.email,
                first: req.user.local.first,
                last: req.user.local.last,
                username: req.user.local.username
            };
            return res.json(userInfo);
        }
    );
    
    router.post('/login', passport.authenticate('local-login'),
        function(req, res) {
            return res.json({status: 'login'});
        }
    );
    return router;
};