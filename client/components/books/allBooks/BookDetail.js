import React from 'react';

class BookDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log('--- inside book detail props', props);
        this.getBook = this.getBook.bind(this);
        this.checkUserBooks = this.checkUserBooks.bind(this);
        this.userOwned = this.userOwned.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.handleRemoveRequest = this.handleRemoveRequest.bind(this);
        this.hasRequested = this.hasRequested.bind(this);
        this.checkAddress = this.checkAddress.bind(this);
    }
    checkAddress() {
        const user = this.props.userInfo;

        if (!user.street || !user.city || !user.zip) {
            return false;
        }
        return true;
    }
    getBook(id) {
        let books = this.props.books;
        return books.find(book => {
            return book.id === id;
        });
    }
    checkUserBooks(id) {
        let books = this.props.userBooks;
        return books.find(book => {
            return book.id === id;
        });
    }
    userOwned() {
        if (this.checkUserBooks(this.props.params.id)) {
            return 'OWNED';
        }
        return '';
    }
    handleRequest() {
        // send book id to server
        this.props.request(this.props.params.id, this.props.userInfo.username);
    }
    handleRemoveRequest() {
        this.props.removeRequest(this.props.params.id, this.props.userInfo.username);
    }
    hasRequested(book) {
        const requesters = book.requests;
        return requesters.some(requester => {
            return requester.username === this.props.userInfo.username;
        });
    }
    render() {
        let id = this.props.params.id;
        let book = this.getBook(id);
        let userOwned = this.userOwned();
        const addressExists = this.checkAddress();
        console.log('address exists', addressExists);
        if (!book) {
            return (
                <div className='progress'>
                    <div className='indeterminate'></div>
                </div>
            );
        }
        // Book found or added through ajax
        let requesters = book.requests;
        let hasRequested = false;
        if (requesters.length !== 0) {
            // check if book has been requested by user
            hasRequested = this.hasRequested(book);
        }
        return (
            <div className=''>
                <div className='card'>
                    <div className='card-content'>
                        <span className='card-title'>{book.volumeInfo.title}<span className='badge'>{userOwned}</span></span>
                        {book.volumeInfo.pageCount &&
                        <p>{book.volumeInfo.pageCount} pages</p>
                        }
                        {book.volumeInfo.publishedDate &&
                        <p>{book.volumeInfo.publishedDate}</p>
                        }
                    </div>
                </div>
                {/* All books */}
                {!userOwned && !hasRequested && addressExists &&
                <p className='btn-container'>
                    <button className='btn' onClick={this.handleRequest}>WANT</button>
                </p>
                }
                {!addressExists &&
                    <p>Address required to trade</p>
                }
                {hasRequested && 
                <div>
                    <p className=''>You have requested this book!</p>
                    <button className='btn' onClick={this.handleRemoveRequest}>REMOVE</button>
                </div>
                }
            </div>
        );
    }
}

export default BookDetail;
