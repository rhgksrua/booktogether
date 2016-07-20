import { connect } from 'react-redux';
import { removeRequestFetch, requestBookFetch } from '../../../actions/bookActions';
import BookDetail from './BookDetail';

const mapStateToProps = (state, props) => {
    const { userBooks, books, userInfo } = state;
    return {
        userBooks,
        books,
        userInfo
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        request: (id, username) => {
            dispatch(requestBookFetch(id, username));
        },
        removeRequest: (id, username) => {
            dispatch(removeRequestFetch(id, username));
        }
    };
};

const BookDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BookDetail);

export default BookDetailContainer;
