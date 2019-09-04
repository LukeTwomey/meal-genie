import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import loadingReducer from './loadingReducer';
import mealPlanReducer from './mealPlanReducer';

export default combineReducers({
    recipes: recipesReducer,
    loading: loadingReducer,
    mealPlan: mealPlanReducer
});