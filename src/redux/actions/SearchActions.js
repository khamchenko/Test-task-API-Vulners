import { RSAA } from 'redux-api-middleware';
import { forIn } from 'lodash';

import { API, PROXY_CORS } from '../../../config.js';

import constants from '../constants';

export const loadVulnerability = (query) => {
    let search = '[]';
    if (query.ostype.length !== 0) {
        search = `${query.ostype.toLowerCase()}`;
    }
    if (query.vendor.length !== 0) {
        search = `type:${query.vendor.toLowerCase()}`;
    }
    let skip = `skip=${(query.paginator - 1) * 20}`;
    return {
        [RSAA]: {
            endpoint: `${PROXY_CORS}${API}search/lucene/?query=${search}&${skip}`,
            method: 'GET',
            types: [
                `${constants.LOAD_VULNER_REQUEST}`,
                `${constants.LOAD_VULNER_SUCCESS}`,
                `${constants.LOAD_VULNER_FAIL}`
            ]
        }
    };
};

export const editQuerySearch = (query) => dispatch => {
    dispatch({
        type: constants.EDIT_QUERY_SEARCH,
        payload: query,
    })
};
