import axios from 'axios';

// just defining a function that is going to return a function (made possible by using thunk)
export const fetchRecipes = () => async dispatch => {
    const response = await axios.get('/api/recipes');
    dispatch({ type: 'FETCH_RECIPES', payload: response.data })
};