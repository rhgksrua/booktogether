import React from 'react';
import { Link } from 'react-router';

class NavLink extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const liActive = this.context.router.isActive;
        return (
            <li className={liActive(this.props.to) ? '' : ''}>
                <Link 
                    to={this.props.to}
                    activeClassName='active' 
                    onlyActiveOnIndex={this.props.onlyActiveOnIndex} 
                >
                    {this.props.name}
                </Link>
            </li>
        );
    }
}

NavLink.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default NavLink;