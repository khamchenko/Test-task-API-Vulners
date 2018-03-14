import { RSAA } from 'redux-api-middleware';

import { API, PROXY_CORS } from '../../../config.js';

import constants from '../constants';

export const loadVenders = () => {
    return {
        [RSAA]: {
            endpoint: `${PROXY_CORS}${API}search/stats/`,
            method: 'GET',
            types: [
                `${constants.LOAD_VENDERS_REQUEST}`,
                `${constants.LOAD_VENDERS_SUCCESS}`,
                `${constants.LOAD_VENDERS_FAIL}`
            ]
        }
    };
};
