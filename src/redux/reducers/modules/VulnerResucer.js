import constants from '../../constants'
import { forEach, keys } from 'lodash';

const initialState = {
    data: [],
    meta: {
        query: {
            ostype: '',
            vendor: '',
            paginator: 1
        }
    },
    isLoading: false,
    error: null,
};

const VulnerReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.LOAD_VULNER_REQUEST:
            return {
                ...state,
                isLoading: !action.payload,
                error: action.payload,
            };
        case constants.LOAD_VULNER_SUCCESS:
            if (action.payload.data.search.length !==0) {
                let data = action.payload.data.search;
                let total = Math.ceil(action.payload.data.total/20);
                return {
                    ...state,
                    data: data,
                    meta: {
                        ...state.meta,
                        total: total
                    },
                    isLoading: false
                };
            } else {
                return {
                    ...state,
                    error: new Error('Nothing found'),
                    isLoading: false
                };
            }
        case constants.LOAD_VULNER_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case constants.EDIT_QUERY_SEARCH:
            return {
                ...state,
                meta: {
                    ...state.meta,
                    query: action.payload
                },
            };
        default:
            return state
    }
};

export default VulnerReducer;
