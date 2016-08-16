import React from 'react';


/**
 * SignUp component contains user sign up.
 *
 * The state keeps track of 'dirty' property to detect any changes in user input.
 * Error message does not fire off until the user form has been 'dirtied'.
 *
 * @returns {undefined}
 */
class SignUp extends React.Component {
    constructor(props) {
        super();
        this.state = {
            dirty: false,
            email: '',
            first: '',
            last: '',
            password: '',
            username: '',
            emailError: '',
            firstError: '',
            usernameError: '',
            lastError: '',
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFirst = this.handleFirst.bind(this);
        this.handleLast = this.handleLast.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({
            first: e.target.value,
            dirty: true
        });
        if (!/[A-Za-z\s]/.test(e.target.value.trim())) {
            this.setState({
                firstError: 'Invalid name',
            });
        } else {
            this.setState({
                firstError: '',
            });
        }
    }
    handleLast(e) {
        this.setState({
            last: e.target.value
        });
    }
    handlePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleUsername(e) {
        let username = e.target.value.trim();
        console.log(username.length);
        this.setState({
            username: e.target.value.trim(),
            dirty: true
        });
        if (username.length < 4) {
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
        return (
            <div>
                <h5>Sign Up</h5>
                <form className='signup' onSubmit={this.handleSubmit}>
                    <div className='input-field'>
                        <label htmlFor='email'>email <span className='input-error'>{this.state.dirty && this.state.emailError}</span></label>
                        <input 
                            type='text' 
                            id='email' 
                            value={this.state.email} 
                            onChange={this.handleEmail}
                        />
                    </div>
                    <div className='input-field'>
                        <label htmlFor='username'>username <span className='input-error'>{this.state.dirty && this.state.usernameError}</span></label>
                        <input 
                            type='text' 
                            id='username' 
                            value={this.state.username} 
                            onChange={this.handleUsername}
                        />
                    </div>
                    <div className='input-field'>
                        <label htmlFor='first'>first <span className='input-error'>{this.state.dirty && this.state.usernameError}</span></label>
                        <input 
                            type='text' 
                            id='first' 
                            value={this.state.first} 
                            onChange={this.handleFirst}
                        />
                    </div>
                    <div className='input-field'>
                        <label htmlFor='last'>last <span className='input-error'>{this.state.dirty && this.state.last}</span></label>
                        <input 
                            type='text' 
                            id='last' 
                            value={this.state.last} 
                            onChange={this.handleLast}
                        />
                    </div>
                    <div className='input-field'>
                        <label htmlFor='password'>password</label>
                        <input 
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
