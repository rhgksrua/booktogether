import React from 'react';
import { Link } from 'react-router';
import MobileNavLink from './navLinks/MobileNavLink';
import NavLink from './navLinks/NavLink';

class App extends React.Component {
    constructor(props, context) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }
    componentDidMount() {
         window.$(".button-collapse").sideNav();
         
         // check cookie for log in and get books if logged in
         this.props.getUserInfo();
         this.props.getAllBooks();
    }
    handleLogOut(e) {
         this.props.logout();
         window.$(".button-collapse").sideNav('hide');
    }
    render() {
        const user = this.props.userInfo;
        const books = this.props.userBooks;
        return (
            <div className='container'>
                <header>
                    <h3>
                        <i className='medium material-icons nav-icon'>library_books</i>
                        BookTogether
                    </h3>
                </header>
                <nav>
                    <div className='nav-wrapper'>
                        <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                        <Link to='/' className='brand-logo' name='BookTogether' onlyActiveOnIndex={true}>BookTogether</Link>
                        <ul id='nav-mobile' className='right hide-on-med-and-down'>
                            <NavLink to='/allbooks' name='All Books' />
                            {user && user.username &&
                            <NavLink to='/mybooks' name='My Books' />
                            }
                            {user && user.username &&
                            <NavLink to='/search' name='Add Book' />
                            }
                            {user && !user.username &&
                            <NavLink to='/signup' name='Sign Up' />
                            }
                            {user && !user.username &&
                            <NavLink to='/login' name='Log In' />
                            }
                            {user && user.username &&
                            <li>
                                <a onClick={this.handleLogOut}>Log Out</a>
                            </li>
                            }
                        </ul>
                        <ul id='mobile-demo' className='side-nav'>
                            <MobileNavLink
                                to='/'
                                onlyActiveOnIndex={true}
                                name={'BOOKTOGETHER'}
                            />
                            <MobileNavLink to='/allbooks' name={'ALL BOOKS'} />
                            <MobileNavLink to='/mybooks' name={'MY BOOKS'} />
                            <MobileNavLink to='/search' name={'ADD BOOK'} />
                            {user && !user.username &&
                            <MobileNavLink to='/signup' name={'SIGN UP'} />
                            }
                            {user && !user.username &&
                            <MobileNavLink to='/login' name={'LOG IN'} />
                            }
                            {user && user.username &&
                            <li>
                                <a onClick={this.handleLogOut}>Log Out</a>
                            </li>
                            }
                        </ul>
                    </div>
                </nav>
                <div className='card-panel user-info'>
                    {user && user.username &&
                    <div>
                        <p>Hi, <Link to='/me'>{user.username}</Link>. You own {books.length} books.&nbsp;&nbsp;
                        {user && !user.street &&
                            <Link to='/me'>Need your address to trade!</Link>
                        }
                        </p>
                    </div>
                    }
                    {user && !user.username &&
                    <p>Welcome! Log in or sign up to start!</p>
                    }
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default App;
