import React, { Component } from 'react';

import './Main.scss';

const VulnersLogo = 'https://vulners.com/static/img/logo.png';

class MainContainer extends Component {
  render() {
        return (
            <div className="main">
                <div className="main-wrapper">
                    <a href='https://blog.vulners.com/' target="_blank" className="logo">
                        <img  src={VulnersLogo} alt='' className="img"/>
                    </a>
                    <a href='https://blog.vulners.com/' target="_blank" className="title">VULNERS BLOG</a>
                    <div className="info">Information security news, research, malware analysis</div>
                </div>
            </div>
        );
    }
}

export default MainContainer;
