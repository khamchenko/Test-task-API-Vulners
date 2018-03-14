import React from 'react';
import { connect } from 'react-redux';

import UnixList from '../../components/UnixList';
import Loader from '../../components/Loader';
import Notice from '../../components/Notice';

const UnixContainer = (props) => (
    <div className="unix">
        {
            props.isLoading
                ? <Loader />
                : props.error
                    ? <Notice error={props.error}/>
                    : <UnixList unix={props.unix}/>
        }
    </div>
);

const mapStateToProps = ({ vendors: { error, data , isLoading }}) => {
    return {
        unix: data.unix,
        isLoading: isLoading,
        error: error || false
    };
}

export default connect(mapStateToProps)(UnixContainer);
