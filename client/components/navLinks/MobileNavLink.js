import React from 'react';
import { Link } from 'react-router';

class MobileNavLink extends React.Component {
    constructor(props) {
        super(props);
        this.closeNav = this.closeNav.bind(this);
    }
    closeNav() {
         window.$(".button-collapse").sideNav('hide');
    }
    render() {
        const liActive = this.context.router.isActive;
        return (
            <li className={liActive(this.props.to) ? '' : ''}>
                <Link 
                    to={this.props.to}
                    activeClassName='active' 
                    onlyActiveOnIndex={this.props.onlyActiveOnIndex} 
                    onClick={this.closeNav}
                >
                    {this.props.name}
                </Link>
            </li>
        );
    }
}

MobileNavLink.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default MobileNavLink;