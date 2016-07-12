import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            first: '',
            last: '',
            password: '',
            username: ''
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
            email: e.target.value
        });
    }
    handleFirst(e) {
        this.setState({
            first: e.target.value
        });
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
        this.setState({
            username: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.submitSignUp(this.state);
    }
    render() {
        return (
            <div>
                <h1>Sign Up</h1>
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
                        <label htmlFor='username'>username</label>
                        <input 
                            type='text' 
                            id='username' 
                            value={this.state.username} 
                            onChange={this.handleUsername}
                        />
                    </p>
                    <p>
                        <label htmlFor='first'>first</label>
                        <input 
                            type='text' 
                            id='first' 
                            value={this.state.first} 
                            onChange={this.handleFirst}
                        />
                    </p>
                    <p>
                        <label htmlFor='last'>last</label>
                        <input 
                            type='text' 
                            id='last' 
                            value={this.state.last} 
                            onChange={this.handleLast}
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
                    <input type='submit' value='sign up' />
                </form>
            </div>
        );
    }
}

export default SignUp;