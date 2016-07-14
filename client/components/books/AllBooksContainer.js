import { connect } from 'react-redux';
import { allBooksFetch } from '../../actions/bookActions';
import AllBooks from './AllBooks';

const mapStateToProps = (state, props) => {
    const { books } = state;
    return { books };
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
