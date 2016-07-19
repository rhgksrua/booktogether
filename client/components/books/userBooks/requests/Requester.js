import React from 'react';
import RequesterBook from './RequesterBook';

class Requester extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li>
                <h5>username 1</h5>
                <ul>
                    <RequesterBook />
                </ul>
            </li>
        );
    }
}

export default Requester;
