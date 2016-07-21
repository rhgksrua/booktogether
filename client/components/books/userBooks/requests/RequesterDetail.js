import React from 'react';
import BookContainer from './BookContainer';
import RequesterContainer from './RequesterContainer';

class RequesterDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let book = this.props.bookInfo;
        let requesters = book.requests;
        if (requesters.length === 0) {
            return (
                <div className=''>
                    <h4>Requests</h4>
                    <p>NO ONE WANTS YOUR BOOK!!!</p>
                </div>
            );
        }
        let allRequesters = requesters.map(requester => {
            return (
                <RequesterContainer key={requester.username} requester={requester.username} bookId={this.props.bookId} />
            );
        });
        return (
            <div className=''>
                <h4>Requests</h4>
                <ul>
                    {allRequesters}
                </ul>
            </div>
        );
    }
}

export default RequesterDetail;
