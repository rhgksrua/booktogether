import React from 'react';

class Trade extends React.Component {
    constructor(props) {
        super(props);
        this.completeTrade = this.completeTrade.bind(this);
    }
    completeTrade(e) {
        this.props.completeTrade(this.props.tradeId, this.props.owned);
    }
    render() {
        const owner = this.props.owner;
        const ownerBookTitle = this.props.ownerBookTitle;

        const requester = this.props.requester;
        const requesterBookTitle = this.props.requesterBookTitle;
        return (
            <li className='collection-item'>
                <p>Owner: <span className='trade-owner'>{owner}</span> - <span className='trade-book'>{ownerBookTitle}</span></p>
                <p>Requester: <span className='trade-owner'>{requester}</span> trading <span className='trade-book'>{requesterBookTitle}</span></p>
                {!this.props.complete &&
                <button className='btn' onClick={this.completeTrade}>Complete!</button>
                }
                {this.props.complete &&
                <p>Trade Completed on {this.props.completeDate}</p>
                }

            </li>
        );
    }
}

export default Trade;
