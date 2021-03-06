import { connect } from 'react-redux';
//import { addMyBookFetch, removeMyBookFetch } from '../../../../actions/bookActions';
import Requester from './Requester';

const mapStateToProps = (state, props) => {
    const { books, userBooks } = state;
    return {
        books,
        userBooks
    };
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

const RequesterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Requester);

export default RequesterContainer;

