import React from 'react';
//import UserBookList from './UserBookList';
import UserBookList from './UserBookList';

class UserBooks extends React.Component {
    constructor(props) {
        super(props);
        this.getRequests = this.getRequests.bind(this);
    }
    componentDidMount() {
        //this.props.getUserBooks();
    }
    getRequests() {
        const books = this.props.books;
        return books.filter(book => {
            const hasRequested = book.requests.some(req => {
                return req.username === this.props.userInfo.username;
            });
            if (!hasRequested) return false;
            return true;
        });
    }
    removeRequest(id) {
        this.props.removeRequest(id, this.props.userInfo.username);
    }
    render() {
        let reqBooks = this.getRequests();
        const allReqBooks = reqBooks.map(book => {
            return (
                <li key={book.id}>
                    <p>{book.volumeInfo.title}</p>
                    <button className='btn' onClick={this.removeRequest.bind(this, book.id)}>REMOVE</button>
                </li>
            );
        });
        return (
            <div>
                <h5>Your Books</h5>
                <UserBookList 
                    bookList={this.props.userBooks} 
                    use={'owner'}
                    add={false} 
                    remove={true} 
                    detail={true} 
                    link={'mybooks'}
                />
                <p>Your requests</p>
                <ul>
                    {allReqBooks}
                </ul>
            </div>
        );
    }
}

export default UserBooks;
