import React from 'react';

class LogIn extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: ''
        };
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    handlePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.submitLogIn(this.state);
    }
    render() {
        return (
            <div>
                <h1>Log In</h1>
                <form className='signup' onSubmit={this.handleSubmit}>
                    <p>
                        <label htmlFor='email'>email</label>
                        <input 
                            type='text' 
                            id='email' 
                            value={this.state.email} 
                            onChange={this.handleEmail}
                        />
                    </p>
                    <p>
                        <label htmlFor='password'>password</label>
                        <input 
                            type='password' 
                            id='password' 
                            value={this.state.password} 
                            onChange={this.handlePassword}
                        />
                    </p>
                    <input type='submit' value='log in' />
                </form>
            </div>
        );
    }
}

export default LogIn;