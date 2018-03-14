import { RSAA } from 'redux-api-middleware';
import { forIn } from 'lodash';

import { API, PROXY_CORS } from '../../../config.js';

import constants from '../constants';

export const loadVulnerability = (query) => {
    let search = [];
    if (query.ostype.length !== 0) {
        search.push([`type:${query.ostype}&bulletinFamily:unix`]);
    }
    if (query.vendor.length !== 0) {
        search.push([`type:${query.vendor}`]);
    }

    return {
        [RSAA]: {
            endpoint: `${PROXY_CORS}${API}search/lucene/?query=${search}`,
            method: 'GET',
            types: [
                `${constants.LOAD_VULNER_REQUEST}`,
                `${constants.LOAD_VULNER_SUCCESS}`,
                `${constants.LOAD_VULNER_FAIL}`
            ]
        }
    };
};
