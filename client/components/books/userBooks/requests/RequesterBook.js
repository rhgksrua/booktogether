import React from 'react';

class RequesterBook extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <li>
                {this.props.bookTitle}
            </li>
        );
    }
}

export default RequesterBook;

