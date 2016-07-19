import React from 'react';
import BookContainer from './BookContainer';
import Requester from './Requester';

class RequesterDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        

        console.log('--- user books', this.props.userBooks);

        console.log('--- book id from request detail', this.props.bookId);
        try {
            let requesters = this.props.requesters.map(requester => {
                return (
                    <li>
                        requester list
                    </li>
                );
            })
        }
        catch (e) {
            console.log('requesters error');
            console.error(e);
        }
        return (
            <div className=''>
                <h4>Requests</h4>
                <Requester />
                <ul className='requester-list'>
                    {/* requester  */}
                    <li>
                        <h5>User 1</h5>
                        <ul>
                            {/* requester book */}
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
