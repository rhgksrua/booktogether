import React from 'react';
import BookContainer from './BookContainer';

class RequesterDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        /*
        let books = this.props.reqBooks.map(book => {
            return (
                <li>
                    <BookContainer book={book} />
                </li>
            );
        });
        */
        let requesters = this.props.requesters.map(requester => {
            return (
                <li>
                    requester list
                </li>
            );
        })
        return (
            <div className=''>
                <h4>Requests</h4>
                <ul className='requester-list'>
                    <li>
                        <h5>User 1</h5>
                        <ul>
                            <li>List of books owned by requester</li>
                        </ul>
                    </li>
                </ul>
                <ul>
                    <li>
                        <h5>User 2</h5>
                        <ul>
                            <li>List of books owned by requester</li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default RequesterDetail;
