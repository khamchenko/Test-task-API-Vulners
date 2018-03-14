import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './UnixItem.scss';


class UnixItem extends Component {
    render() {
        const { unix: { data: unix, key: link } } = this.props;
        return (
            <div className="unix-item">
                <Link to={`/search/?query=ostype:${link}`} className="name">{unix.displayName}</Link>
                <div className="statistics">
                    <div>{unix.count}</div>
                </div>
            </div>
        )
    }
}

export default UnixItem;
