import { connect } from 'react-redux';
import { addMyBookFetch, removeMyBookFetch } from '../../../../actions/bookActions';
import RequesterDetail from './RequesterDetail';

const mapStateToProps = (state, props) => {
    const { userBooks } = state;
    return {
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

const RequesterDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RequesterDetail);

export default RequesterDetailContainer;
