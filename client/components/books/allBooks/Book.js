import React from 'react';
import { Link } from 'react-router';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddBook = this.handleAddBook.bind(this);
        this.handleRemoveBook = this.handleRemoveBook.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
        this.hasRequested = this.hasRequested.bind(this);
    }
    handleAddBook(e) {
        this.props.addMyBook(this.props.bookInfo);
    }
    handleRemoveBook(e) {
        e.preventDefault();
        this.props.removeMyBook(this.props.bookInfo.id);
        return;
    }
    handleDetail(e) {
        return;
    }
    hasRequested() {
        const requesters = this.props.bookInfo.requests;
        return requesters.some(requester => {
            return requester.username === this.props.userInfo.username;
        });
    }
    render() {
        
        let book = this.props.bookInfo;
        let requesters = this.props.bookInfo.requests;
        let hasRequested = false;
        if (requesters.length !== 0) {
            // check if book has been requested by user
            hasRequested = this.hasRequested();
        }
        console.log('hasrequested', hasRequested);
        return (
            <li className='collection-item avatar'>
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail &&
                <img className='circle' src={book.volumeInfo.imageLinks.smallThumbnail} />
                }
                {!book.volumeInfo.imageLinks &&
                <img className='circle' src='http://placekitten.com/200/300' />
                }
                <span className='title'>{book.volumeInfo.title}
                    {hasRequested &&
                    <span className='badge'>You have requested this book</span>
                    }
                </span>
                <p>
                    <Link to={`/${this.props.link}/${book.id}`}>DETAIL</Link>
                </p>
            </li>
        );
    }
}

export default Book;
