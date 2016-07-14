'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var bookSchema = mongoose.Schema({
    eTag: String,
    id: String,
    selfLink: String,
    volumeInfo: Schema.Types.Mixed,
    owners: [ 
        {
            id: String,
            date: { type: Date, default: Date.now },
            username: String
        }
    ],
    requests: [
        {
            id: String,
            username: String,
            date: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Book', bookSchema);