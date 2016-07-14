import { connect } from 'react-redux';
//import { searchBookFetch } from '../../actions/bookActions';
import BookDetail from './BookDetail';

const mapStateToProps = (state, props) => {
    const { userBooks, books } = state;
    return {
        userBooks,
        books
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

const BookDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(BookDetail);

export default BookDetailContainer;
