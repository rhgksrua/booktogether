import React from 'react';

class Trade extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        const owner = this.props.owner;
        const ownerBookTitle = this.props.ownerBookTitle;

        const requester = this.props.requester;
        const requesterBookTitle = this.props.requesterBookTitle;
        return (
            <li>
                <p>Owner: {owner} trading {ownerBookTitle}</p>
                <p>Requester: {requester} trading {requesterBookTitle}</p>
            </li>
        );
    }
}

export default Trade;
