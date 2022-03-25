import axios from "axios";
import history from "../history";

export const createRecipe = (formValues, image) => async (dispatch) => {
  let uploadConfig = null;

  // Only do this if a new image file has been added with the file input field
  if (image) {
    uploadConfig = await axios.post("/api/upload", {
      imageFilename: image.name,
    });

    await axios.put(uploadConfig.data.url, image, {
      headers: {
        "Content-Type": image.type,
      },
    });
  }

  const currentNewRecipeName = formValues.name;
  const prettifiedRecipeName = currentNewRecipeName.replace(
    /(^\w|\s\w)/g,
    (m) => m.toUpperCase()
  );

  formValues.name = prettifiedRecipeName;

  const response = await axios.post("/api/recipes", {
    ...formValues,
    image: uploadConfig ? uploadConfig.data.key : "placeholder.jpg",
  });

  dispatch({ type: "CREATE_RECIPE", payload: response.data });
  history.push("/recipes");
};

export const fetchRecipes = () => async (dispatch) => {
  dispatch(setLoadingStatus(true));
  const response = await axios.get("/api/recipes");
  dispatch({ type: "FETCH_RECIPES", payload: response.data.reverse() });
  dispatch(setLoadingStatus(false));
};

export const fetchRecipe = (name) => async (dispatch) => {
  const response = await axios.get(`/api/recipes/${name}`);
  dispatch({ type: "FETCH_RECIPE", payload: response.data });
};

export const editRecipe = (id, formValues, image) => async (dispatch) => {
  let uploadConfig = null;

  // Only do this if a new image file has been added with the file input field
  if (image) {
    uploadConfig = await axios.post("/api/upload", {
      imageFilename: image.name,
    });

    await axios.put(uploadConfig.data.url, image, {
      headers: {
        "Content-Type": image.type,
      },
    });
  }

  const currentNewRecipeName = formValues.name;
  const prettifiedRecipeName = currentNewRecipeName.replace(
    /(^\w|\s\w)/g,
    (m) => m.toUpperCase()
  );

  formValues.name = prettifiedRecipeName;

  const response = await axios.put("/api/recipes", {
    id,
    ...formValues,
    image: uploadConfig ? uploadConfig.data.key : formValues.image,
  });

  dispatch({ type: "EDIT_RECIPE", payload: response.data });
  history.push("/recipes");
};

export const deleteRecipe = () => async (dispatch, getState) => {
  const state = getState();
  const recipeId = state.deleteModal.activeRecipeId;
  await axios.delete(`/api/recipes/${recipeId}`);
  dispatch({ type: "DELETE_RECIPE", payload: recipeId });
  dispatch({ type: "TOGGLE_DELETE_MODAL", payload: null });
  history.push("/recipes");
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

export const toggleDeleteModal = (recipeId) => ({
  type: "TOGGLE_DELETE_MODAL",
  payload: recipeId,
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
