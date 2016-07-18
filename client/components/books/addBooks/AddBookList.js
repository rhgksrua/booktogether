import React from 'react';
import BookContainer from './BookContainer';

class AddBookList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let bookList = this.props.bookList ? this.props.bookList : [];
        let books = bookList.map(book => {
            return (
                <BookContainer key={book.id} bookInfo={book} />
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

export default AddBookList;

