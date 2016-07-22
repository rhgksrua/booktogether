'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = mongoose.Schema({
    eTag: String,
    id: String,
    selfLink: String,
    volumeInfo: Schema.Types.Mixed,
    owners: [ 
        {
            id: String,
            username: String,
            date: { type: Date, default: Date.now },
            trade: { type: Boolean, default: false }
        }
    ],
    requests: [
        {
            id: String,
            username: String,
            date: { type: Date, default: Date.now },
            trade: { type: Boolean, default: false }
        }
    ]
});

module.exports = mongoose.model('Book', bookSchema);
