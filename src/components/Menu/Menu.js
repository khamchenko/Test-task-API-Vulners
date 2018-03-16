import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Menu.scss';

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <Link to="/" className="menu-elem">Main</Link>
                <Link to="/search" className="menu-elem">Search</Link>
                <Link to="/vendors" className="menu-elem">Security vendors</Link>
                <Link to="/favorites" className="menu-elem">Favorites</Link>
            </div>
        );
    }
}

export default Menu;
