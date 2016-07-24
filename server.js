'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const mongo_express = require('mongo-express/lib/middleware');
const mongo_express_config = require('./mongoExpressConfig')

mongoose.Promise = require('bluebird');

require('dotenv').config({silent: true});

const app = express();

app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./config/passport')(passport);

const port = process.env.PORT || 3000;

let MONGO_URI;
if (process.env.NODE_ENV === 'development') {
    MONGO_URI = 'localhost:27017/booktogether';
} else {
    MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.IP + "/booktogether";
}

mongoose.connect(MONGO_URI);

app.use(session({
    secret: 'booktogethersecret', // need to replace this with env var
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 365 * 1000},
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static(__dirname + '/build'));

const userRoutes = require('./routes/userRoutes')(passport);
const bookRoutes = require('./routes/bookRoutes');

app.use('/user', userRoutes);
app.use('/books', bookRoutes);
app.use('/mongoexpress', mongo_express(mongo_express_config));

app.get('/*', function(req, res) {
    res.render('index');
});

app.listen(port, function() {
    console.log('http://localhost:' + port);
});

