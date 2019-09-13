const initialState = {recipes: []}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PLAN_MEALS':

            var shuffledRecipes = [...action.payload];
            var m = shuffledRecipes.length, t, i;

            // While there remain elements to shuffle…
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);
                // And swap it with the current element.
                t = shuffledRecipes[m];
                shuffledRecipes[m] = shuffledRecipes[i];
                shuffledRecipes[i] = t;
            }

            return { ...state, recipes: shuffledRecipes.slice(0,7) };
        case 'TOGGLE_MEAL_LOCK':
            return { 
                ...state, 
                recipes: state.recipes.map((recipe) => {
                    // Find the recipe with the matching id
                    if(recipe._id === action.payload.id) {
                        // Return a new object
                        return {
                            ...recipe,  // copy the existing recipe
                            locked: (recipe.locked === undefined || recipe.locked === false ? true : false)  // toggle the locked status
                        }
                    }
                
                    // Leave every other item unchanged
                    return recipe;
                })
            }
        default:
            return state;
    }
}