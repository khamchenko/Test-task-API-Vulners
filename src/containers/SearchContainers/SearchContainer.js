import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, forEach } from 'lodash';

import arrow from '../../components/picture/arrow.svg';

import EntryField from '../../components/EntryField';
import SearchList from '../../components/SearchList';
import Loader from '../../components/Loader';
import Notice from '../../components/Notice';

import { loadVulnerability, editQuerySearch } from '../../redux/actions/SearchActions';
import { addFavorites, deleteFavorites } from '../../redux/actions/FavoritesActions';

import './Search.scss';

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: props.vulnerability.meta.query
        }
        this.handlerOStypeValue = this.handlerOStypeValue.bind(this);
        this.handleVendorValue = this.handleVendorValue.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handlerParination = this.handlerParination.bind(this);
    }


    componentDidMount() {
        this.handlerSearchLocation();
    }

    componentWillUnmount() {
        const { query } = this.state;
        this.props.editQuerySearch(query);
    }

    handlerSearchLocation() {
        let index = location.search.indexOf("?query=");
        if (index == 0) {
            let search = location.search;
            let query = {
                ostype: '',
                vendor: '',
                paginator: 1
            }
            search = search.slice(7).split('&');

            forEach(search, elem => {
                if (elem.indexOf("ostype:") !== -1) {
                    query.ostype = elem.slice(7);
                }
                if (elem.indexOf("vendor:") !== -1) {
                    query.vendor = elem.slice(7);
                }
                if (elem.indexOf("paginator=") !== -1) {
                    query.paginator = elem.slice(10);
                }
            })
            this.setState({
                query: query
            })
            this.searchVulnerability(query)
        }

    }

    handlerOStypeValue(value) {
        this.setState({
            query: {
                ostype: value,
                vendor: '',
                paginator: 1
            }
        })
    }
    handleVendorValue(value) {
        this.setState({
            query: {
                ostype: '',
                vendor: value,
                paginator: 1
            }
        })
    }

    handleClickSearch(e) {
        e.preventDefault();

        const { query } = this.state;

        this.historyReplaceState(query);
        this.props.searchVulnerability(query)
    }

    historyReplaceState(query) {
        let search = '';
        if (query.ostype.length !== 0) {
            search = `?query=ostype:${query.ostype.toLowerCase()}&paginator=${query.paginator}`
        } else if (query.vendor.length !== 0) {
            search = `?query=vendor:${query.vendor.toLowerCase()}&paginator=${query.paginator}`
        } else {
            search = '/'
        }
        history.replaceState(null, null, search)
    }

    handlerParination(value) {
        let total = this.props.vulnerability.meta.total;
        let paginator = this.state.query.paginator;
        if (paginator !== 1 && value == 'prev') {
            let query = {
                ...this.state.query,
                paginator: --paginator
            }
            this.searchVulnerability(query);
            this.historyReplaceState();
        } else if (paginator !== total && value == 'next') {
            let query = {
                ...this.state.query,
                paginator: ++paginator
            }
            this.historyReplaceState(query);
            this.searchVulnerability(query)
        }
    }

    searchVulnerability(query) {
        this.setState({ query: query })
        this.props.searchVulnerability(query)
    }

    render() {
        const {
            vendors: { data: vendors },
            vulnerability: {
                data: vulner,
                meta: metaVulner,
                isLoading: loaderVulnerability,
                error: errorVulnerability
            },
            favorites: { data: favorites },
            deleteFavorites,
            addFavorites
        } = this.props;
        const { query } = this.state;

        return (
            <div>
                <div className="search">
                    <form autoComplete='off'>
                        <div className="search-field">
                            <EntryField
                                data={vendors}
                                CheckValueSearch={this.handlerOStypeValue}
                                placeholder="OS Type"
                                text={query.ostype}
                            />
                            <span>{'OR'}</span>
                            <EntryField
                                data={vendors}
                                CheckValueSearch={this.handleVendorValue}
                                placeholder="Vendor"
                                text={query.vendor}
                            />
                        </div>
                        <button type="submit" className="btn" onClick={this.handleClickSearch}>search</button>
                    </form>
                </div>
                {
                    metaVulner.total &&
                    <div className='pagination'>
                        <div className='btn' onClick={() => this.handlerParination('prev')}>
                            <img className="icon arrow-left" src={arrow} alt=''/>
                        </div>
                        <div className='value'>{this.state.query.paginator}</div>
                        <span>/</span>
                        <div className='value'>{metaVulner.total}</div>
                        <div className='btn' onClick={() => this.handlerParination('next')}>
                            <img className="icon arrow-right" src={arrow} alt=''/>
                        </div>
                    </div>
                }
                {
                    loaderVulnerability
                        ? <Loader />
                        : errorVulnerability
                            ? <Notice error={errorVulnerability}/>
                            : <SearchList
                                    vulner={vulner}
                                    deleteFavorites={deleteFavorites}
                                    addFavorites={addFavorites}
                                    favorites={favorites}
                                />
                }
            </div>
        );
    }
}

const mapStateToProps = ( { vendors, vulnerability, favorites } ) => {
    return {
        vendors: vendors || [],
        vulnerability: vulnerability || [],
        favorites: favorites || []
    };
}

const mapDispatchToProps = dispatch => {
    return {
        searchVulnerability: (query) => {
            dispatch(loadVulnerability(query));
        },
        editQuerySearch: (query) => {
            dispatch(editQuerySearch(query));
        },
        addFavorites: (vulner) => {
            dispatch(addFavorites(vulner));
        },
        deleteFavorites: (id) => {
            dispatch(deleteFavorites(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
