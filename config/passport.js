'use strict';

var LocalStrategy = require('passport-local');
var User = require('../models/User');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            const query = {
                $or: [
                    {'local.email': email},
                    {'local.username': req.body.username}
                ]
            };
            User.find(query).exec()
                .then(function(users) {
                    let errors = {};
                    users.forEach(function(user) {
                        
                        if (user.local.username === req.body.username) {
                            errors.username = 'username exists';
                        }
                        if (user.local.email === req.body.email) {
                            errors.email = 'email exists';
                        }
                    });
                    if (errors.username || errors.email) {
                        return done(null, false, errors);
                    } else {
                        var newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.local.first = req.body.first;
                        newUser.local.last = req.body.last;
                        newUser.local.username = req.body.username;
                        
                        newUser.save(function(err) {
                            if (err) throw err;
                            return done(null, newUser);
                        });
                    }
                    return null;
                })
                .catch(function(err) {
                    done(err);
                });
        });
    }));
    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({'local.email': email}, function(err, user) {
                if (err) return done(err);
                
                if (!user) {
                    return done(null, false);
                }
                if (!user.validPassword(password)) {
                    return done(null, false);
                }
                return done(null, user);
            });
        });
    }));
};