import React from 'react';
import { Link } from 'react-router';
import MobileNavLink from './navLinks/MobileNavLink';
import NavLink from './navLinks/NavLink';

class App extends React.Component {
    constructor(props, context) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.closeNav = this.closeNav.bind(this)
    }
    componentDidMount() {
         window.$(".button-collapse").sideNav();
         
         // check cookie for log in and get books if logged in
         this.props.getUserInfo();
         //this.props.getAllBooks();
    }
    closeNav(e) {
         window.$(".button-collapse").sideNav('hide');
    }
    handleLogOut(e) {
        this.props.logout();
    }
    render() {
        const user = this.props.userInfo;
        const books = this.props.userBooks;
        console.log('--- total num of user books', books);
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
                        <ul id='nav-mobile' className='right hide-on-med-and-down'>
                            <NavLink to='/' name='BookTogether' />
                            <NavLink to='/allbooks' name='All Books' />
                            <NavLink to='/mybooks' name='My Books' />
                            <NavLink to='/search' name='Add Book' />
                            {user && !user.username &&
                            <NavLink to='/signup' name='Sign Up' />
                            }
                            {user && !user.username &&
                            <NavLink to='/login' name='Log In' />
                            }
                            {user && user.username &&
                            <NavLink to ='/logout' name='Log Out' />
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
                            <MobileNavLink to='/logout' name={'LOG OUT'} />
                            }
                        </ul>
                    </div>
                </nav>
                <div className='card-panel user-info'>
                    {user && user.username &&
                    <p>Hi, {user.username}. You own {books.length} books.</p>
                    }
                    {user && !user.username &&
                    <p>Welcome! Sign In to start!</p>
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