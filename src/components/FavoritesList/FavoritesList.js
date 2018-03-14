import React, { Component } from 'react';
import { map } from 'lodash';

import FavoritesItem from './FavoritesItem';

import './FavoritesList.scss';


class FavoritesList extends Component {
    render() {
        const { favorites, deleteFavorites, editFavorites } = this.props;
        return (
            <div className="search-list">
                {
                    map(favorites, item => {
                        return (
                            <div key={item._source.id}>
                                <FavoritesItem vulner={item}
                                    deleteFavorites={deleteFavorites}
                                    editFavorites={editFavorites}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default FavoritesList;
