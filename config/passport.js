var LocalStrategy = require('passport-local');
var User = require('../models/User');

module.exports = function(passport) {
    passport.serializeuser(function(user, done) {
        done(null, user.id);
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
            User.findOne({'local.email': email}, function(err, user) {
                if (err) return done(err);
                
                if(user) {
                    // Email exists.
                    return done(null, false);
                } else {
                    var newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.first = req.body.first;
                    newUser.local.last = req.body.last;
                    
                    newUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};