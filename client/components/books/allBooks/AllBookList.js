import React from 'react';
import BookContainer from './BookContainer';

class BookList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let bookList = this.props.bookList ? this.props.bookList : [];
        let books = bookList.map(book => {
            
            console.log(book, this.props.add, this.props.remove);
            return (
                <BookContainer 
                    key={book.id} 
                    bookInfo={book} 
                    add={this.props.add} 
                    remove={this.props.remove} 
                    detail={this.props.detail} 
                    link={this.props.link}
                    owner={this.props.owner}
                />
            );
        });
        return (
            <div>
                {bookList.length > 0 &&
                <ul className='collection'>
                    {books}
                </ul>
                }
            </div>
        );
    }
}

export default BookList;