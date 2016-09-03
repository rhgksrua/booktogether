import { connect } from 'react-redux';
import { logInFetch } from '../../actions/actions';
import LogIn from './LogIn';

const mapStateToProps = (state, props) => {
    const { accountErrors } = state;
    return {
        accountErrors,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitLogIn: (userInfo) => {
            dispatch(logInFetch(userInfo));
        }
    };
};

const SignUpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogIn);

export default SignUpContainer;
