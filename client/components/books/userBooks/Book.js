import React from 'react';
import { Link } from 'react-router';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddBook = this.handleAddBook.bind(this);
        this.handleRemoveBook = this.handleRemoveBook.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
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
    render() {
        let book = this.props.bookInfo;
        //console.log('---- user books props', this.props)
        return (
            <li className='collection-item avatar'>
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail &&
                <img className='circle' src={book.volumeInfo.imageLinks.smallThumbnail} />
                }
                {!book.volumeInfo.imageLinks &&
                <img className='circle' src='http://placekitten.com/200/300' />
                }
                <span className='title'>{book.volumeInfo.title}</span>
                {this.props.add &&
                <p onClick={this.handleAddBook}>ADD</p>
                }
                <p>
                    <a className='remove-book' onClick={this.handleRemoveBook}>REMOVE</a>
                </p>
                <p>
                    <Link to={`/mybooks/${book.id}`}>DETAIL</Link>
                </p>
            </li>
        );
    }
}

export default Book;

