import { connect } from 'react-redux';
import { signUpFetch } from '../../actions/actions';
import SignUp from './SignUp';

const mapStateToProps = (state, props) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // need to trim strings before sending to server or server needs
        // to trim before saving.
        submitSignUp: (userInfo) => {
            dispatch(signUpFetch(userInfo));
        }
    };
};

const SignUpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);

export default SignUpContainer;
