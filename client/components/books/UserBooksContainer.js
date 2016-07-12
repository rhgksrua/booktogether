import { connect } from 'react-redux';
import { userBooksFetch } from '../../actions/bookActions';
import UserBooks from './UserBooks';

const mapStateToProps = (state, props) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUserBooks: () => {
            dispatch(userBooksFetch());
        }
    };
};

const AllBooksContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBooks);

export default AllBooksContainer;
