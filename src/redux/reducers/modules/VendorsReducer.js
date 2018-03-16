import constants from '../../constants'
import { forEach, keys } from 'lodash';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const VendorsReducer = (state = initialState, action) => {
    switch(action.type) {
        case constants.LOAD_VENDERS_REQUEST:
            return {
                ...state,
                isLoading: !action.payload,
                error: action.payload,
            };
        case constants.LOAD_VENDERS_SUCCESS:
            let data = action.payload.data.type_results;
            let vendorsKeys = keys(data);
            let vendors = [];
            forEach(vendorsKeys, key => {
                vendors.push({ key: key, data: data[key] })
            })
            return {
                ...state,
                data: vendors,
                isLoading: false
            };
        case constants.LOAD_VENDERS_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state
    }
};

export default VendorsReducer;
