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
        const username = this.props.userInfo.username;
        let trades = userTrade.map(trade => {
            const owned = username === trade.owner.username ? true : false;
            return (
                <Trade
                    key={trade._id} 
                    tradeId={trade._id}
                    owner={trade.owner.username} 
                    ownerBookTitle={trade.owner.bookTitle}
                    requester={trade.requester.username}
                    requesterBookTitle={trade.requester.bookTitle}
                    completeTrade={this.props.completeTrade}
                    owned={owned}
                    complete={trade.complete}
                    completeDate={trade.completeDate}
                />
            );
        });
        if (trades.length === 0) {
            trades = <li className='collection-item'>You have no trades</li>;
        }
        return (
            <div>
                <h5>Your Trades</h5>
                <ul className='collection'>
                    {trades}
                </ul>
            </div>
        );
    }
}

export default TradeList;
