import { connect } from 'react-redux';
import { searchBookFetch } from '../../../actions/bookActions';
import AddBook from './AddBook';

const mapStateToProps = (state, props) => {
    const { booksResult } = state;
    return {
        booksResult
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        searchBook: (title) => {
            dispatch(searchBookFetch(title));
        }
    };
};

const AddBookContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBook);

export default AddBookContainer;
