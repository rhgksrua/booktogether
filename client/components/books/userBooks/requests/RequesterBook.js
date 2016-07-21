import React from 'react';

class RequesterBook extends React.Component {
    constructor(props) {
        super(props);
        this.handleTrade = this.handleTrade.bind(this);
    }
    handleTrade() {
        const owner = this.props.userInfo.username;
        const ownerBookId = this.props.currentBookId;
        const requester = this.props.requester;
        const requesterBookId = this.props.bookId;
        const tradeObj = {
            owner,
            ownerBookId,
            requester,
            requesterBookId
        };
        this.props.trade(tradeObj);
    }
    render() {
        return (
            <li>
                <p>{this.props.userInfo.username} wants</p>
                <p>{this.props.bookTitle}</p>
                <p>requester is {this.props.requester}</p>
                <button className='btn' onClick={this.handleTrade}>TRADE</button>
            </li>
        );
    }
}

export default RequesterBook;

