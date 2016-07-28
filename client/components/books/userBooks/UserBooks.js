import React from 'react';
//import UserBookList from './UserBookList';
import UserBookList from './UserBookList';
import TradeListContainer from './trade/TradeListContainer';

class UserBooks extends React.Component {
    constructor(props) {
        super(props);
        this.getRequests = this.getRequests.bind(this);
    }
    getRequests() {
        const books = this.props.books;
        return books.filter(book => {
            if (!book.requests) {
                return false;
            }
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
        let  allReqBooks = reqBooks.map(book => {
            return (
                <li key={book.id}>
                    <p>{book.volumeInfo.title}</p>
                    <button className='btn' onClick={this.removeRequest.bind(this, book.id)}>REMOVE</button>
                </li>
            );
        });
        if (allReqBooks.length === 0) {
            allReqBooks = <li className='collection-item'>You have no requests</li>;
        }
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
                <h5>Your Requests</h5>
                {/* maybe move allReqBooks to a separate component */}
                <ul className='collection'>
                    {allReqBooks}
                </ul>
                <TradeListContainer />
            </div>
        );
    }
}

export default UserBooks;
