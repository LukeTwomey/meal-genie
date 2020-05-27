import axios from "axios";
import history from "../history";

export const createRecipe = (formData, config) => async (dispatch) => {
  const response = await axios.post("/api/recipes", formData, config);
  dispatch({ type: "CREATE_RECIPE", payload: response.data });
};

export const fetchRecipes = () => async (dispatch) => {
  dispatch(setLoadingStatus(true));
  const response = await axios.get("/api/recipes");
  dispatch({ type: "FETCH_RECIPES", payload: response.data.reverse() });
  dispatch(setLoadingStatus(false));
  history.push("/recipes");
};

export const fetchRecipe = (id) => async (dispatch) => {
  const response = await axios.get(`/api/recipes/${id}`);
  dispatch({ type: "FETCH_RECIPE", payload: response.data });
};

export const editRecipe = (id, formData, config) => async (dispatch) => {
  const response = await axios.put(`/api/recipes/${id}`, formData, config);
  dispatch({ type: "EDIT_RECIPE", payload: response.data });
};

export const deleteRecipe = (id) => async (dispatch) => {
  await axios.delete(`/api/recipes/${id}`);
  dispatch({ type: "DELETE_RECIPE", payload: id });
};

export const setLoadingStatus = (boolean) => ({
  type: "SET_LOADING",
  payload: boolean,
});

export const clearGroceryList = () => ({
  type: "CLEAR_GROCERY_LIST",
});

export const createGroceryList = () => {
  return (dispatch, getState) => {
    const state = getState();
    const mealPlan = state.mealPlan;
    dispatch({ type: "CREATE_GROCERY_LIST", payload: mealPlan });
  };
};

export const planMeals = () => {
  return (dispatch, getState) => {
    const state = getState();
    const recipes = state.recipes;
    dispatch({ type: "PLAN_MEALS", payload: recipes });
    dispatch(clearGroceryList());
  };
};

export const toggleMealLock = (arrayIndex) => (dispatch) => {
  dispatch({ type: "TOGGLE_MEAL_LOCK", payload: { arrayIndex } });
};

export const toggleSearchModal = (arrayIndex) => ({
  type: "TOGGLE_SEARCH_MODAL",
  payload: arrayIndex,
});

export const toggleShareModal = () => ({
  type: "TOGGLE_SHARE_MODAL",
});

export const replaceMealPlanRecipe = (id) => (dispatch, getState) => {
  const state = getState();
  const recipes = state.recipes;
  const currentRecipe = state.searchModal.activeArrayIndex;
  const newRecipe = id;
  dispatch({
    type: "REPLACE_RECIPE",
    payload: { recipes, currentRecipe, newRecipe },
  });
  dispatch({ type: "TOGGLE_SEARCH_MODAL", payload: { id: null } });
  dispatch(clearGroceryList());
};
