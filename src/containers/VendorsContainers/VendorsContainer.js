import React from 'react';
import { connect } from 'react-redux';

import VendorsList from '../../components/VendorsList';
import Loader from '../../components/Loader';
import Notice from '../../components/Notice';

const VendorsContainer = (props) => (
    <div className="vendors">
        {
            props.isLoading
                ? <Loader />
                : props.error
                    ? <Notice error={props.error}/>
                    : <VendorsList vendors={props.vendors}/>
        }
    </div>
);

const mapStateToProps = ({ vendors: { error, data , isLoading }}) => {
    return {
        vendors: data.vendors || [],
        isLoading: isLoading,
        error: error || false
    };
}

export default connect(mapStateToProps)(VendorsContainer);
