const initialState = {randomRecipe: 0}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PLAN_MEALS':
            return { ...state, randomRecipe: 3 };
        default:
            return state;
    }
}