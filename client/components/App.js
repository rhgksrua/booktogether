import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    handleLogOut(e) {
        e.preventDefault();
    }
    render() {
        return (
            <div>
                <h3>App</h3>
                <header>
                    <div>
                        <Link to='/allbooks' activeClassName='active'>All Books</Link>
                        <Link to='/mybooks' activeClassName='active'>My Books</Link>
                        <Link to='/search' activeClassName='active'>Add Book</Link>
                        <p>YOUR BOOKS</p>
                    </div>
                    <div>
                        <Link to='/' activeClassName='active'>Home</Link>
                        <Link to='/signup' activeClassName='active'>Sign Up</Link>
                        <Link to='/login' activeClassName='active'>Log In</Link>
                        <Link to='/' onClick={this.handleLogOut} activeClassName='active'>Log Out</Link>
                    </div>
                </header>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;