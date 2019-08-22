import { combineReducers } from 'redux';
import recipesReducers from './recipesReducer';

export default combineReducers({
    recipes: recipesReducers
});