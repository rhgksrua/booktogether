import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    render() {
        return (
            <div>
                <h3>App</h3>
                <Link to='/' activeClassName='active'>Home</Link>
                <Link to='/signup' activeClassName='active'>Sign Up</Link>
                <Link to='/login' activeClassName='active'>Log In</Link>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;