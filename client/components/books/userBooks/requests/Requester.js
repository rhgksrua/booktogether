import React from 'react';
import RequesterBook from './RequesterBook';

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
                <RequesterBook key={book.id} bookTitle={book.volumeInfo.title} />
            );
        });
        return (
            <li>
                <h5>{this.props.requester}</h5>
                <ul>
                    {requesterBooks}
                </ul>
            </li>
        );
    }
}

export default Requester;
