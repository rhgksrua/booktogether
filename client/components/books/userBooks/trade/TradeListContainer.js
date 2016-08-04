import { connect } from 'react-redux';
import { getTradeFetch } from '../../../../actions/bookActions';
import { completeTradeFetch } from '../../../../actions/bookActions';

import TradeList from './TradeList';

const mapStateToProps = (state, props) => {
    const { userTrade, userInfo } = state;
    return {
        userTrade,
        userInfo
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTrade: function() {
            dispatch(getTradeFetch());
        },
        completeTrade: function(tradeId, owned) {
            dispatch(completeTradeFetch(tradeId, owned));
        }
    };
};

const TradeListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeList);

export default TradeListContainer;


