import constants from '../../constants'
import { filter, map, orderBy } from 'lodash';

const localStorageFavorites = JSON.parse(localStorage.getItem("favorites"));
const initialState = {
  data: localStorageFavorites,
  isLoading: false,
  error: null,
};

const FavoritesReduser = (state = initialState, action) => {
    switch(action.type) {
        case constants.DELETE_FAVORITES:
            let data = filter(state.data, (elem) => {
                return elem._source.id !== action.payload
            })
            let localStorageDeleteFavorites = JSON.stringify(data);
            localStorage.setItem('favorites', localStorageDeleteFavorites);
            return {
                ...state,
                data: data
            };
        case constants.ADD_FAVORITES:
            let create = state.data.some((elem) => {
                return elem._source.id == action.payload._source.id
            })
            if (create) {
                return state;
            } else {
                let favoritesElem = {
                    _source: {
                        id: action.payload._source.id,
                        vhref: action.payload._source.vhref,
                        title: action.payload._source.title,
                        modified: action.payload._source.modified,
                        type: action.payload._source.type,
                        cvss: {
                            score: action.payload._source.cvss.score
                        }
                    },
                    flatDescription: action.payload.flatDescription
                }
                let favorites = [
                    ...state.data,
                    { ...favoritesElem }
                ];
                let localStorageAddFavorites = JSON.stringify(favorites);
                try {
                    localStorage.setItem('favorites', localStorageAddFavorites);
                } catch (e) {
                    if (e == QUOTA_EXCEEDED_ERR) {
                        alert('localStorage Exceeded Limit');
                    }
                }
                return {
                    ...state,
                    data: favorites
                }
            }
        case constants.EDIT_FAVORITES:
            let editData = map(state.data, (elem) => {
                if (elem._source.id == action.payload._source.id) {
                    return action.payload
                } else {
                    return elem
                }
            })
            let localStorageEditFavorites = JSON.stringify(editData);
            try {
                localStorage.setItem('favorites', localStorageEditFavorites);
            } catch (e) {
                if (e == QUOTA_EXCEEDED_ERR) {
                    alert('localStorage Exceeded Limit');
                }
            }
            return {
                ...state,
                data: editData
            }
        case constants.FILTER_FAVORITES:
            let filterData = state.data;
            if (action.payload.value == 'date') {
                filterData = orderBy(state.data, ['_source.modified'], [action.payload.date])
            }
            if (action.payload.value == 'vendors') {
                filterData = orderBy(state.data, ['_source.type'], [action.payload.vendors])
            }
            if (action.payload.value == 'cvss') {
                filterData = orderBy(state.data, ['_source.cvss.score'], [action.payload.cvss])
            }
            
            return {
                ...state,
                data: filterData
            }
        default:
            return state
    }
};

export default FavoritesReduser;
