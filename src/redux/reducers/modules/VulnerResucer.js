import constants from '../../constants'
import { forEach, keys } from 'lodash';

const initialState = {
  data: [],
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
            let data = action.payload.data.search;
            return {
                ...state,
                data: data,
                isLoading: false
            };
        case constants.LOAD_VULNER_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state
    }
};

export default VulnerReducer;
