import React, { Component } from 'react';
import { connect } from 'react-redux';

import { renderRoutes } from 'react-router-config';

import { loadVenders } from '../../redux/actions/VendorsActions';

import Header from '../../components/Header';
import Menu from '../../components/Menu';

import './RootLayout.scss'

class RootLayout extends Component {
    componentDidMount() {
        this.props.loadVenders();
    }

    render() {
        const { route: { routes } } = this.props;
        return (
            <div>
                <Header />
                <Menu />
                <div id="content">{renderRoutes(routes)}</div>
            </div>
        );
    }
}

export default connect(null, { loadVenders: loadVenders })(RootLayout);
