import { connect } from 'react-redux';
import { addMyBookFetch, removeMyBookFetch } from '../../../actions/bookActions';
import Book from './Book';

const mapStateToProps = (state, props) => {
    const { userInfo } = state;
    return {
        userInfo
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addMyBook: book => {
            console.log('sending to server', book);
            dispatch(addMyBookFetch(book));
        },
        removeMyBook: id => {
            console.log('removing book');
            dispatch(removeMyBookFetch(id));
        }
    };
};

const BookContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Book);

export default BookContainer;
