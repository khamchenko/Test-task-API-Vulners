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
            let unix = [];
            forEach(vendorsKeys, key => {
                if (data[key].bulletinFamily !== 'unix') {
                    vendors.push({ key: key, data: data[key] })
                } else {
                    unix.push({ key: key, data: data[key] })
                }
            })
            return {
                ...state,
                data: {
                    vendors: vendors,
                    unix: unix
                },
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
