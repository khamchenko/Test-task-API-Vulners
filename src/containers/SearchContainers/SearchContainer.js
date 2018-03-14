import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, forEach } from 'lodash';

import EntryField from '../../components/EntryField';
import SearchList from '../../components/SearchList';
import Loader from '../../components/Loader';
import Notice from '../../components/Notice';

import { loadVulnerability } from '../../redux/actions/SearchActions';
import { addFavorites, deleteFavorites } from '../../redux/actions/FavoritesActions';

import './Search.scss';

class SearchContainer extends Component {
    constructor() {
        super();
        this.state = {
            query: {
                ostype: [],
                vendor: []
            }
        }
        this.handlerOStypeValue = this.handlerOStypeValue.bind(this);
        this.handleVendorValue = this.handleVendorValue.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
    }


    componentDidMount() {
        this.handlerSearchLocation()
    }

    handlerSearchLocation() {
        let index = location.search.indexOf("?query=");
        let search = location.search;
        if (index == 0) {
            search = search.slice(7);
            if (search.indexOf("ostype:") !== -1) {
                let query = {
                    ostype: search.slice(7),
                    vendor: ''
                }
                this.setState({ query: query });
                this.props.searchVulnerability(query);
            }
            if (search.indexOf("vendor:") !== -1) {
                let query = {
                    ostype: search.slice(7),
                    vendor: ''
                }
                this.setState({ query: query });
                this.props.searchVulnerability(query);
            }
        }
    }

    handlerOStypeValue(value) {
        this.setState({
            query: {
                ostype: value,
                vendor: ''
            }
        })
    }
    handleVendorValue(value) {
        this.setState({
            query: {
                ostype: '',
                vendor: value
            }
        })
    }

    handleClickSearch() {
        const { query } = this.state;
        let search = '';
        if (query.ostype.length !== 0) {
            search = `?query=ostype:${query.ostype}`
        } else if (query.vendor.length !== 0) {
            search = `?query=vendor:${query.vendor}`
        } else {
            search = '/'
        }
        history.replaceState(null, null, search)
        this.props.searchVulnerability(query)
    }

    render() {
        const {
            vendors: { data: { unix, vendors } },
            vulnerability: { data: vulner, isLoading: loaderVulnerability, error: errorVulnerability},
            favorites: { data: favorites },
            deleteFavorites,
            addFavorites
        } = this.props;
        const { query } = this.state;
        return (
            <div>
                <div className="search">
                    <div className="search-field">
                        <EntryField
                            data={unix}
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
                    <button className="btn" onClick={this.handleClickSearch}>search</button>
                </div>
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
        addFavorites: (vulner) => {
            dispatch(addFavorites(vulner));
        },
        deleteFavorites: (id) => {
            dispatch(deleteFavorites(id));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
