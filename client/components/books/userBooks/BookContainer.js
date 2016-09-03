import { connect } from 'react-redux';
import { addMyBookFetch, removeMyBookFetch } from '../../../actions/bookActions';
import Book from './Book';

const mapStateToProps = (state, props) => {
    return props;
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addMyBook: book => {
            dispatch(addMyBookFetch(book));
        },
        removeMyBook: id => {
            dispatch(removeMyBookFetch(id));
        }
    };
};

const BookContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Book);

export default BookContainer;

