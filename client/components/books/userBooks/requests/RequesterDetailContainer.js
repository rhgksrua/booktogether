import { connect } from 'react-redux';
import { addMyBookFetch, removeMyBookFetch } from '../../../actions/bookActions';
import RequesterDetail from './RequesterDetail';

const mapStateToProps = (state, props) => {
    return props;
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

const RequesterDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RequesterDetail);

export default RequesterDetailContainer;