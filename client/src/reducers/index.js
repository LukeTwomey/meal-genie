import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import loadingReducer from './loadingReducer';
import mealPlanReducer from './mealPlanReducer';
import searchModalReducer from './searchModalReducer';

export default combineReducers({
    recipes: recipesReducer,
    loading: loadingReducer,
    mealPlan: mealPlanReducer,
    searchModal: searchModalReducer
});