import axios from 'axios';

export const fetchRecipes = () => async dispatch => {
    dispatch(setLoadingStatus(true));
    const response = await axios.get('/api/recipes');
    dispatch({ type: 'FETCH_RECIPES', payload: response.data.reverse() });
    dispatch(setLoadingStatus(false));
};

export const setLoadingStatus = boolean => ({
    type: 'SET_LOADING',
    payload: boolean
});

export const planMeals = () => {
    return (dispatch, getState) => {
        const state = getState();
        const recipes = state.recipes;
        dispatch({ type: 'PLAN_MEALS', payload: recipes });
    }
}

export const toggleMealLock = id => {
    return (dispatch, getState) => {
        const state = getState();
        const mealPlan = state.mealPlan.recipes;
        dispatch({ type: 'TOGGLE_MEAL_LOCK', payload: { mealPlan, id }});
    }
}

export const toggleSearchModal = id => ({
    type: 'TOGGLE_SEARCH_MODAL',
    payload: id
});

export const replaceMealPlanRecipe = id => {
    return (dispatch, getState) => {
        const state = getState();
        const recipes = state.recipes;
        const currentRecipe = state.searchModal.activeRecipeId;
        const newRecipe = id;
        dispatch({ type: 'REPLACE_RECIPE', payload: { recipes, currentRecipe, newRecipe }});
        dispatch({ type: 'TOGGLE_SEARCH_MODAL', payload: { id: null }});
    }
}