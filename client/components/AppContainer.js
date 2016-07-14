import { connect } from 'react-redux';
import { logOutFetch } from '../actions/actions';
import { userBooksFetch, allBooksFetch } from '../actions/bookActions';

import App from './App';

const mapStateToProps = (state, props) => {
    const { userInfo , userBooks} = state;
    return {
        userInfo,
        userBooks
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserInfo: function() {
            dispatch(userBooksFetch());
        },
        getAllBooks: function() {
            dispatch(allBooksFetch());
        },
        logout: function() {
            dispatch(logOutFetch());
        }
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;