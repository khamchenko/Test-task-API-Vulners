import { combineReducers } from 'redux';
import vendors from './modules/VendorsReducer';
import vulnerability from './modules/VulnerResucer';
import favorites from './modules/FavoritesReduser';

const rootReducer = combineReducers({
  vendors,
  vulnerability,
  favorites
});

export default rootReducer;
