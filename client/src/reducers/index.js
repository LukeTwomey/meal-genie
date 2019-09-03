import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
    recipes: recipesReducer,
    loading: loadingReducer
});