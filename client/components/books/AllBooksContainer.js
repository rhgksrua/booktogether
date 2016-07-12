import { connect } from 'react-redux';
import { allBooksFetch } from '../../actions/actions';
import AllBooks from './AllBooks';

const mapStateToProps = (state, props) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllBooks: () => {
            dispatch(allBooksFetch());
        }
    };
};

const AllBooksContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AllBooks);

export default AllBooksContainer;
