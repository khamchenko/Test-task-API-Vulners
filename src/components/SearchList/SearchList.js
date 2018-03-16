import React, { Component } from 'react';
import { map } from 'lodash';

import SearchItem from './SearchItem';

import './SearchList.scss';

class SearchList extends Component {
    render() {
        const {
            vulner,
            favorites,
            deleteFavorites,
            addFavorites
        } = this.props;

        return (
            <div className="search-list">
                {
                    map(vulner, item => {
                        let like = favorites.some((elem) => {
                            return elem._source.id == item._source.id
                        })
                        return (
                            <div key={item._source.id}>
                                <SearchItem
                                    vulner={item}
                                    deleteFavorites={deleteFavorites}
                                    addFavorites={addFavorites}
                                    like={like}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SearchList;
