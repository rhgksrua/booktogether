'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TradeSchema = mongoose.Schema({
    owner: {
        id: String,
        username: String,
        bookId: String,
        bookTitle: String
    },
    requester: {
        id: String,
        username: String,
        bookId: String,
        bookTitle: String
    },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trade', TradeSchema);

