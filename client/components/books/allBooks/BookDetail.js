import React from 'react';
import RequesterDetailContainer from './requests/RequesterDetailContainer.js';

class BookDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log('--- inside book detail props', props);
        this.getBook = this.getBook.bind(this);
        this.checkUserBooks = this.checkUserBooks.bind(this);
        this.userOwned = this.userOwned.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
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
        this.props.request(this.props.params.id);
    }
    render() {
        let id = this.props.params.id;
        let book = this.getBook(id);
        let userOwned = this.userOwned();
        console.log('--- userOwned', userOwned)
        if (!book) {
            return (
                <div className='progress'>
                    <div className='indeterminate'></div>
                </div>
            );
        }
        return (
            <div className=''>
                <div className='card'>
                    <div className='card-content'>
                        <span className='card-title'>{book.volumeInfo.title}<span className='badge'>{userOwned}</span></span>
                        <p>Book Info</p>
                    </div>
                </div>
                {/* mybooks */}
                {this.props.use === 'owner' &&
                <ul className='collection with-header'>
                    <li className='collection-header'><h5>Requests</h5></li>
                    <li className='collection-item'>Name of requester</li>
                </ul>
                }
                {this.props.use === 'requester' &&
                <button className='waves-effect waves-light btn'>REQUEST</button>
                }
                {/* All books */}
                {!userOwned &&
                <p className='btn-container'>
                    <button className='btn' onClick={this.handleRequest}>WANT</button>
                </p>
                }
                {userOwned &&
                <RequesterDetailContainer />
                }
            </div>
        );
    }
}

export default BookDetail;
