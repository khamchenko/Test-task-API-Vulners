import React, { Component } from 'react';
import { map, forEach, forIn } from 'lodash';

import VendorItem from './VendorItem';

import './VendorsList.scss';

class VendorsList extends Component {
    constructor() {
        super()
        this.state = {
            SecurityVendors: []
        }
    }

    componentDidMount() {
        let SecurityVendors = [];
        forEach(this.props.vendors, (elem) => {
            let bulletinFamily = elem.data.bulletinFamily;
            if ( SecurityVendors.indexOf(bulletinFamily) == -1 ) {
                SecurityVendors.push(bulletinFamily)
            }
        })
        this.setState({ SecurityVendors: SecurityVendors })
    }

    render() {
        const { SecurityVendors } = this.state;
        return (
            <div className="vendors-list">
                {
                    map(SecurityVendors, (vendor) => {
                        return (
                            <div key={vendor} className="type">
                                <div className="type-name">{vendor}</div>
                                <div className='list-vendor'>
                                    {
                                        map(this.props.vendors, (elem) => {
                                            let bulletinFamily = elem.data.bulletinFamily;
                                            if (vendor.indexOf(bulletinFamily) !== -1) {
                                                return (
                                                    <VendorItem key={elem.key} vendor={elem} className='list-vendor'/>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default VendorsList;
