import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer';
import loadingReducer from './loadingReducer';
import mealPlanReducer from './mealPlanReducer';
import searchModalReducer from './searchModalReducer';
import groceryListReducer from './groceryListReducer';

export default combineReducers({
    recipes: recipesReducer,
    loading: loadingReducer,
    mealPlan: mealPlanReducer,
    searchModal: searchModalReducer,
    groceryList: groceryListReducer
});