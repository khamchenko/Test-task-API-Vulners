import React, { Component } from 'react';
import { map } from 'lodash';

import VendorItem from './VendorItem';

import './VendorsList.scss';


class VendorsList extends Component {
    render() {
        const { vendors } = this.props;
        return (
            <div className="vendors-list">
                {
                    map(vendors, (vendor) => {
                        return (
                            <VendorItem key={vendor.key} vendor={vendor}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default VendorsList;
