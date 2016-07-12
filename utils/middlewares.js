function isLoggedInAJAX(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.json({error: 'authentication failure'});
    }
}

module.exports = {
    isLoggedInAJAX: isLoggedInAJAX
};