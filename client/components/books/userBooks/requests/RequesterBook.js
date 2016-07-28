import React from 'react';

class RequesterBook extends React.Component {
    constructor(props) {
        super(props);
        this.handleTrade = this.handleTrade.bind(this);
    }
    handleTrade() {
        const owner = this.props.userInfo.username;
        const ownerBookId = this.props.currentBookId;
        const ownerBookTitle = this.props.bookInfo.volumeInfo.title;

        const requester = this.props.requester;
        const requesterBookId = this.props.bookId;
        const requesterBookTitle = this.props.requesterBookTitle;

        const tradeObj = {
            owner,
            ownerBookId,
            ownerBookTitle,
            requester,
            requesterBookId,
            requesterBookTitle
        };
        this.props.trade(tradeObj);
    }
    render() {
        return (
            <li className='collection-item'>
                <p>{this.props.bookTitle}</p>
                <button className='btn' onClick={this.handleTrade}>TRADE</button>
            </li>
        );
    }
}

export default RequesterBook;

