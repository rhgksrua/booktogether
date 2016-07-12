import React from 'react';
import BookList from './BookList';

class UserBooks extends React.Component {
    render() {
        return (
            <div>
                User Books
                <BookList />
            </div>
        );
    }
}

export default UserBooks;