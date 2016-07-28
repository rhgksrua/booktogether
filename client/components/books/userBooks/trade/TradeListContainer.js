import { connect } from 'react-redux';
import { getTradeFetch } from '../../../../actions/bookActions';

import TradeList from './TradeList';

const mapStateToProps = (state, props) => {
    const { userTrade, userInfo } = state;
    return {
        userTrade
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTrade: function() {
            dispatch(getTradeFetch());
        }
    };
};

const TradeListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeList);

export default TradeListContainer;


