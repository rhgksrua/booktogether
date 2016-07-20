import { connect } from 'react-redux';
import { removeRequestFetch, userBooksFetch } from '../../../actions/bookActions';
import UserBooks from './UserBooks';

const mapStateToProps = (state, props) => {
    const { books, userBooks, userInfo } = state;
    return {
        userBooks,
        books,
        userInfo
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserBooks: () => {
            dispatch(userBooksFetch());
        },
        removeRequest: (id, username) => {
            dispatch(removeRequestFetch(id, username));
        }
    };
};

const AllBooksContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBooks);

export default AllBooksContainer;
