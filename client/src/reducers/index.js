import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import recipesReducer from "./recipesReducer";
import loadingReducer from "./loadingReducer";
import mealPlanReducer from "./mealPlanReducer";
import searchModalReducer from "./searchModalReducer";
import shareModalReducer from "./shareModalReducer";
import deleteModalReducer from "./deleteModalReducer";
import groceryListReducer from "./groceryListReducer";

export default combineReducers({
  recipes: recipesReducer,
  loading: loadingReducer,
  mealPlan: mealPlanReducer,
  searchModal: searchModalReducer,
  shareModal: shareModalReducer,
  deleteModal: deleteModalReducer,
  groceryList: groceryListReducer,
  form: formReducer,
});
