import React from 'react';
import { Link } from 'react-router';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddBook = this.handleAddBook.bind(this);
    }
    handleAddBook(e) {
        e.preventDefault();
        this.props.addMyBook(this.props.bookInfo);
    }
    render() {
        let book = this.props.bookInfo;
        console.log('--- book', book);
        return (
            <li className='collection-item avatar'>
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail &&
                <img className='circle' src={book.volumeInfo.imageLinks.smallThumbnail} />
                }
                {!book.volumeInfo.imageLinks &&
                <img className='circle' src='http://placekitten.com/200/300' />
                }
                <span className='title'>{book.volumeInfo.title}</span>
                <p className='add-book'>
                    <a onClick={this.handleAddBook}>ADD</a>
                </p>
            </li>
        );
    }
}

export default Book;

