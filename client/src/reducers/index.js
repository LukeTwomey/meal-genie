import { combineReducers } from "redux";
import recipesReducer from "./recipesReducer";
import loadingReducer from "./loadingReducer";
import mealPlanReducer from "./mealPlanReducer";
import searchModalReducer from "./searchModalReducer";
import shareModalReducer from "./shareModalReducer";
import groceryListReducer from "./groceryListReducer";

export default combineReducers({
  recipes: recipesReducer,
  loading: loadingReducer,
  mealPlan: mealPlanReducer,
  searchModal: searchModalReducer,
  shareModal: shareModalReducer,
  groceryList: groceryListReducer,
});
