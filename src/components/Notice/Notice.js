import React, { Component } from 'react';

import './Notice.scss';

const Notice = (props) => (
    <div className="notice">
        {props.error.message}
    </div>
);
export default Notice;
