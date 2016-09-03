import React from 'react';
import { Link } from 'react-router';

class Book extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let book = this.props.bookInfo;
        if (!book) {
            return (
                <div>NO BOOKS YET</div>
            );
        }
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
                <button className='btn'>TRADE</button>
            </li>
        );
    }
}

export default Book;
