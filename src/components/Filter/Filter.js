import React, { Component } from 'react';
import './Filter.scss';
import arrow from '../picture/sort-down.svg';

export default class Filter extends Component {
    constructor() {
        super();
        this.state = {
            filter: {
                date: 'desc',
                vendors: 'desc',
                cvss: 'desc'
            }
        }
        this.handlerFilter = this.handlerFilter.bind(this);
    }

    handlerFilter(value) {
        let sort = this.state.filter[value] == 'desc' ? 'asc' : 'desc';
        let filter = {
            ...this.state.filter,
            [value]: sort
        }
        this.setState({
            filter: filter
        });
        this.props.filterDate(filter, value)
    }

    render() {
        const { filter: { date, vendors, cvss } } = this.state;
        return (
            <div className="filter">
                <div className="wrapper-filter">
                    <div className="title">Filter</div>
                    <div className="filter-elements">
                        <div className="filter-elem" onClick={() => this.handlerFilter('date')}>
                            Date
                            <img src={arrow} className={date == 'desc' ? "icon" : "icon arrow-up"} alt=''/>
                        </div>
                        <div className="filter-elem" onClick={() => this.handlerFilter('vendors')}>
                            Vendors
                            <img src={arrow} className={vendors == 'desc' ? "icon" : "icon arrow-up"} alt=''/>
                        </div>
                        <div className="filter-elem" onClick={() => this.handlerFilter('cvss')}>
                            CVSS
                            <img src={arrow} className={cvss == 'desc' ? "icon" : "icon arrow-up"} alt=''/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
