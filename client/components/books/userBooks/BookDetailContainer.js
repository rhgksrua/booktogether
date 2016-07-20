import { connect } from 'react-redux';
import { requestBookFetch } from '../../../actions/bookActions';
import BookDetail from './BookDetail';

const mapStateToProps = (state, props) => {
    const { userInfo, userBooks, books } = state;
    return {
        userBooks,
        books,
        userInfo
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        request: id => {
            dispatch(requestBookFetch(id));
        }
    };
};

const BookDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BookDetail);

export default BookDetailContainer;

