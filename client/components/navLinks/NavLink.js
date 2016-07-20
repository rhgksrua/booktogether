import React from 'react';
import { Link } from 'react-router';

class NavLink extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const isActive = this.context.router.isActive;
        return (
            <li className={isActive(this.props.to, this.props.onlyActiveOnIndex) ? 'active' : ''}>
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
