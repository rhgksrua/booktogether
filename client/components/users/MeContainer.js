import { connect } from 'react-redux';
import { addAddressFetch } from '../../actions/actions';

import Me from './Me';

const mapStateToProps = (state, props) => {
    const { userInfo } = state;
    return {
        userInfo
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateAddress: function(address) {
            dispatch(addAddressFetch(address));
        }
    };
};

const MeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Me);

export default MeContainer;

