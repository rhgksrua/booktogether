import React from 'react';
import classNames from 'classnames';


/**
 * SignUp component contains user sign up.
 *
 * The state keeps track of 'dirty' property to detect any changes in user input.
 * Error message does not fire off until the user form has been 'dirtied'.
 *
 * Currently, inputs are controlled by React.  Using 'refs' might be little bit
 * easier because each input does not need its own method.
 *
 * @returns {undefined}
 */
class SignUp extends React.Component {
    constructor(props) {
        super();
        this.state = {
            dirty: false,
            email: '',
            emailError: '',
            first: '',
            firstError: '',
            last: '',
            lastError: '',
            password: '',
            passwordError: '',
            username: '',
            usernameError: '',
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('will update account errors', this.props.accountErrors);
        console.log('will update next props', nextProps);
        if (nextProps.accountErrors && nextProps.accountErrors.errorsExist) {
            this.setState({
                emailError: nextProps.accountErrors.email || '',
                usernameError: nextProps.accountErrors.username || '',
            });
        }
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value,
            dirty: true
        });
        if (!/\S+@\S+/.test(e.target.value)) {
            this.setState({
                emailError: 'Invalid email',
            });
        } else {
            this.setState({
                emailError: '',
            });
        }
    }
    handleFirst(e) {
        let first = e.target.value;
        let firstError;
        this.setState({
            first,
            dirty: true
        });
        if (first.trim().length < 1) {
            firstError = 'too short';
        } else if (!/[A-Za-z\s]/.test(e.target.value.trim())) {
            firstError= 'Invalid name';
        } else {
            firstError= ''
        }
        this.setState({ firstError });
    }
    handleLast(e) {
        let last = e.target.value;
        let lastError;
        this.setState({ last });
        if (!/[A-Za-z\s]/.test(last)) {
            lastError = 'Invalid name';
        } else {
            lastError = '';
        }
        this.setState({ lastError });
    }
    handlePassword(e) {
        let password = e.target.value;
        let passwordError;
        this.setState({
            password,
            dirty: true
        });
        if (password.trim().length < 5) {
            passwordError= 'password too short';
        } else if (/\s+/.test(password)) {
            passwordError = 'space not allowed';
        } else {
            passwordError = '';
        }
        this.setState({ passwordError });
    }
    handleUsername(e) {
        let username = e.target.value;
        this.setState({
            username,
            dirty: true
        });
        if (username.trim().length < 4) {
            this.setState({
                usernameError: 'Username too short (at least 5 characters)'
            });
        } else if (!/[\w\d]+/.test(e.target.value.trim())) {
            this.setState({
                usernameError: 'Invalid name',
            });
        } else {
            this.setState({
                usernameError: '',
            });
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.submitSignUp(this.state);
    }
    render() {
        const emailClass = classNames({'invalid': this.state.emailError});
        const usernameClass = classNames({'invalid': this.state.usernameError});
        const firstClass = classNames({'invalid': this.state.firstError});
        const lastClass = classNames({'invalid': this.state.lastError});
        const passwordClass = classNames({'invalid': this.state.passwordError});

        // accounts Error
        console.log('*** accountErrors', this.props.accountErrors.errorsExist);


        return (
            <div>
                <h5>Sign Up</h5>
                <div className='white-text card-panel red lighten-2'>Even though you get a error message, you can still can register with invalid info. This should be removed before production.</div>
                <form className='signup' onSubmit={this.handleSubmit}>
                    <div className='input-field'>
                        <label htmlFor='email'>email <span className='input-error'>{this.state.dirty && this.state.emailError}</span></label>
                        <input 
                            className={emailClass}
                            type='text' 
                            id='email' 
                            value={this.state.email} 
                            onChange={this.handleEmail}
                        />
                    </div>
                    <div className='input-field'>
                        <label htmlFor='username'>username <span className='input-error'>{this.state.dirty && this.state.usernameError}</span></label>
                        <input 
                            className={usernameClass}
                            type='text' 
                            id='username' 
                            value={this.state.username} 
                            onChange={this.handleUsername}
                        />
                    </div>
                    <div className='input-field'>
                        <label htmlFor='first'>first <span className='input-error'>{this.state.dirty && this.state.firstError}</span></label>
                        <input 
                            className={firstClass}
                            type='text' 
                            id='first' 
                            value={this.state.first} 
                            onChange={this.handleFirst}
                        />
                    </div>
                    <div className='input-field'>
                        <label htmlFor='last'>last <span className='input-error'>{this.state.dirty && this.state.lastError}</span></label>
                        <input 
                            className={lastClass}
                            type='text' 
                            id='last' 
                            value={this.state.last} 
                            onChange={this.handleLast}
                        />
                    </div>
                    <div className='input-field'>
                        <label htmlFor='password'>password <span className='input-error'>{this.state.dirty && this.state.passwordError}</span></label>
                        <input 
                            className={passwordClass}
                            type='password' 
                            id='password' 
                            value={this.state.password} 
                            onChange={this.handlePassword}
                        />
                    </div>
                    <button className='btn waves-effect waves-light' type='submit' value='sign up'>Submit</button>
                </form>
            </div>
        );
    }
}

export default SignUp;
