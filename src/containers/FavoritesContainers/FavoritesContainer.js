import React, { Component } from 'react';
import { connect } from 'react-redux';

import FavoritesList from '../../components/FavoritesList';
import Filter from '../../components/Filter';
import Loader from '../../components/Loader';
import Notice from '../../components/Notice';

import {
    deleteFavorites,
    editFavorites,
    filterFavorites
} from '../../redux/actions/FavoritesActions';

const FavoritesContainer = (props) => (
    <div className="favorites">
        {
            props.isLoading
                ? <Loader />
                : props.error
                    ? <Notice error={props.error}/>
                    : <div>
                        <Filter
                            filterDate={props.filterFavorites}
                        />
                        <FavoritesList
                            favorites={props.favorites}
                            deleteFavorites={props.deleteFavorites}
                            editFavorites={props.editFavorites}
                        />
                    </div>
        }
    </div>
)


const mapStateToProps = ( { favorites: { error, data , isLoading } } ) => {
    return {
        favorites: data,
        isLoading: isLoading,
        error: error || false
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteFavorites: (id) => {
            dispatch(deleteFavorites(id));
        },
        editFavorites: (vulner) => {
            dispatch(editFavorites(vulner));
        },
        filterFavorites: (filter, value) => {
            dispatch(filterFavorites(filter, value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);
