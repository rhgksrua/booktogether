import React from 'react';

import Trade from './Trade';

class TradeList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getTrade();
    }
    render() {
        const userTrade = this.props.userTrade;
        const trades = userTrade.map(trade => {
            console.log(trade);
            return (
                <Trade
                    key={trade._id} 
                    owner={trade.owner.username} 
                    ownerBookTitle={trade.owner.bookTitle}
                    requester={trade.requester.username}
                    requesterBookTitle={trade.requester.bookTitle}
                />
            );
        });
        return (
            <div>
                <h5>Your Trades</h5>
                <ul>
                    {trades}
                </ul>
            </div>
        );
    }
}

export default TradeList;
