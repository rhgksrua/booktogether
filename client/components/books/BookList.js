import React from 'react';
import Book from './Book';

class BookList extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <Book />
                    <Book />
                    <Book />
                    <Book />
                    <Book />
                    <Book />
                    <Book />
                </ul>
            </div>
        );
    }
}

export default BookList;