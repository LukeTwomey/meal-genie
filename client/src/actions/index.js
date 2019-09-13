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
    console.log(id);
    return (dispatch, getState) => {
        const state = getState();
        const mealPlan = state.mealPlan.recipes;
        // console.log(mealPlan[id]);

        // need to pass in the mealPlan recipes, and the id to lock
        dispatch({ type: 'TOGGLE_MEAL_LOCK', payload: { mealPlan, id }});
    }
}