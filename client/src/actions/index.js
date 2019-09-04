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

export const planMeals = () => ({
    type: 'PLAN_MEALS'
});