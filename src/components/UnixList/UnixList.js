import React, { Component } from 'react';
import { map } from 'lodash';

import UnixItem from './UnixItem';

import './UnixList.scss';


class UnixList extends Component {
    render() {
        const { unix } = this.props;
        return (
            <div className="unix-list">
                {
                    map(unix, (item) => {
                        return (
                            <UnixItem key={item.key} unix={item}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default UnixList;
