import constants from '../constants';

export const deleteFavorites = (id) => dispatch => {
    dispatch({
        type: constants.DELETE_FAVORITES,
        payload: id,
    })
};

export const addFavorites = (vulner) => dispatch => {
    dispatch({
        type: constants.ADD_FAVORITES,
        payload: vulner,
    })
};

export const editFavorites = (vulner) => dispatch => {
    dispatch({
        type: constants.EDIT_FAVORITES,
        payload: vulner,
    })
};
export const filterFavorites = (filter, value) => dispatch => {
    dispatch({
        type: constants.FILTER_FAVORITES,
        payload: {
            ...filter,
            value: value
        },
    })
};
