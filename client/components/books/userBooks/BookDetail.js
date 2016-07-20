import React from 'react';
import RequesterDetailContainer from './requests/RequesterDetailContainer.js';

class BookDetail extends React.Component {
    constructor(props) {
        super(props);
        this.getBook = this.getBook.bind(this);
        this.checkUserBooks = this.checkUserBooks.bind(this);
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
    handleRequest() {
        // send book id to server
        this.props.request(this.props.params.id, this.props.userInfo.username);
    }
    render() {
        let id = this.props.params.id;
        let book = this.getBook(id);
        if (!book) {
            return (
                <div className='progress'>
                    <div className='indeterminate'></div>
                </div>
            );
        }
        return (
            <div className=''>
                <h4>Your Book</h4>
                <div className='card'>
                    <div className='card-content'>
                        <span className='card-title'>{book.volumeInfo.title}</span>
                        <p>Book Info</p>
                    </div>
                </div>
                <RequesterDetailContainer bookId={this.props.params.id} bookInfo={book} />
            </div>
        );
    }
}

export default BookDetail;

