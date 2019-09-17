import { shuffle } from '../helpers';

const initialState = {recipes: []}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PLAN_MEALS':

            const allRecipes = [...action.payload];
            const shuffledRecipes = shuffle(allRecipes);

            if({...state}.recipes.length === 0){
                return { ...state, recipes: shuffledRecipes.slice(0,7) };
            } else {
                let lockedRecipes = state.recipes.filter(recipe => recipe.locked === true );
                let newMealPlan = [];

                state.recipes.forEach((recipe) => {
                    // Check if recipe is locked
                    if(!recipe.locked) {
                        for (let i = 0; i < shuffledRecipes.length; i++) {
                            // If our lockedRecipes array contains this recipe already, OR it is the same as what is already there on the plan, move onto the next one in the shuffled list
                            if (lockedRecipes.some(recipe => recipe._id === shuffledRecipes[i]._id) || shuffledRecipes[i]._id === recipe._id) {
                                // already exists - either as locked recipe, OR the one on the day we are currently replacing
                            } else {
                                newMealPlan.push(shuffledRecipes[i]);
                                shuffledRecipes.splice(i, 1);
                                break;
                            }
                        }

                    } else {
                        newMealPlan.push(recipe);
                    }
                })

                return { ...state, recipes: newMealPlan };
            }

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