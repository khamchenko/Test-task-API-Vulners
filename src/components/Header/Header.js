import React, { Component } from 'react';
import './Header.scss';
import VulnersLogo from '../picture/vulners_logo.png'

const Header = () => (
    <header className="header">
        <img className="logo" src={VulnersLogo} alt=''/>
        <div className="title">Vulners Service</div>
    </header>
);

export default Header;
