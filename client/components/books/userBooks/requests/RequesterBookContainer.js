import { connect } from 'react-redux';
import { tradeFetch } from '../../../../actions/bookActions';

import RequesterBook from './RequesterBook';

const mapStateToProps = (state, props) => {
    const { books, userInfo , userBooks} = state;
    return {
        userInfo,
        userBooks,
        books
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        trade: function(tradeObj) {
            dispatch(tradeFetch(tradeObj));
        }
    };
};

const RequesterBookContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RequesterBook);

export default RequesterBookContainer;

