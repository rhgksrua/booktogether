import { connect } from 'react-redux';
import { signUpFetch } from '../../actions/actions';
import SignUp from './SignUp';

const mapStateToProps = (state, props) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
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