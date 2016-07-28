import React from 'react';
import RequesterBookContainer from './RequesterBookContainer';

class Requester extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let requesterBook = this.props.books.filter(book => {
            let user = book.owners.find(user => {
                return user.username === this.props.requester;
            });
            if (!user) return false;
            return true;
        });
        let requesterBooks = requesterBook.map(book => {
            return (
                <RequesterBookContainer key={book.id} bookTitle={book.volumeInfo.title} bookId={book.id} requester={this.props.requester}  currentBookId={this.props.bookId} bookInfo={this.props.bookInfo} requesterBookTitle={book.volumeInfo.title} />
            );
        });
        return (
            <li>
                <h5>From <span className='request-username'>{this.props.requester}:</span></h5>
                <ul className='collection'>
                    {requesterBooks}
                </ul>
            </li>
        );
    }
}

export default Requester;
