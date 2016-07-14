function isLoggedInAJAX(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('---- user authenticated')
        return next();
    } else {
        console.log('---- user not authenticated');
        res.json({error: 'authentication failure'});
    }
}

module.exports = {
    isLoggedInAJAX: isLoggedInAJAX
};