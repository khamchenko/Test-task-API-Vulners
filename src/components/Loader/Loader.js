import React, { Component } from 'react';

import './Loader.scss';

export default class Loader extends Component {
    constructor() {
        super();
        this.state = {
            counter: 3
        };
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({ counter: (this.state.counter + 1) % 4 })
    }

    render() {
        const { counter } = this.state;
        return (
            <div className="loader">
                <div className="wrapper-loader">
                    Loading
                    {
                        counter == 3
                        ? '...'
                        : counter == 2
                            ? '..'
                            : counter == 1
                                ? '.'
                                : null
                    }
                </div>
            </div>
        );
    }
};
