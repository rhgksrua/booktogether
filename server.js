var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);
var favicon = require('serve-favicon');

mongoose.Promise = require('bluebird');

require('dotenv').config({silent: true});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//app.use(favicon(__dirname + '/dist/favicon.ico'));

require('./config/passport')(passport);


var port = process.env.PORT || 3000;

var MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.IP + "/booktogether";

mongoose.connect(MONGO_URI);

app.use(morgan('combined'));

app.use(session({
    secret: 'booktogethersecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 * 365 },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static(__dirname + '/build'));


const userRoute = require('./routes/userRoute.js')(passport);
app.use('/user', userRoute);

app.get('/*', function(req, res) {
    res.render('index');
});

app.listen(port, function() {
    console.log('http://localhost:' + port);
});