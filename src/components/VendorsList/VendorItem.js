import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './VendorItem.scss';


class VendorItem extends Component {
    render() {
        const { vendor: { data: vendor, key: link } } = this.props;
        return (
            <div className="vendor-item">
                <Link to={`/search/?query=vendor:${link}`} className="name">{vendor.displayName}</Link>
                <div className="statistics">
                    <div>{vendor.bulletinFamily}</div>
                    <div>{vendor.count}</div>
                </div>
            </div>
        )
    }
}

export default VendorItem;
