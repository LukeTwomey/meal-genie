import { shuffle } from '../helpers';

const initialState = {recipes: []}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PLAN_MEALS':
            const allRecipes = [...action.payload];
            const shuffledRecipes = shuffle(allRecipes);

            // If you don't currently have any meal plan set, simply return 7 recipes from the shuffled array
            // These are already randomly shuffled so you can just splice the first 7 recipes
            if({...state}.recipes.length === 0){
                return { ...state, recipes: shuffledRecipes.slice(0,7) };
            } else {
                // Create an array of all the recipes currently locked in the meal plan
                // These will be used to make sure a duplicate recipe is not added to the plan
                let lockedRecipes = state.recipes.filter(recipe => recipe.locked === true );

                // Create an empty array which will be used to populate the newly generated meal plan, and returned at the end
                let newMealPlan = [];

                // For every single recipe in the current meal plan
                state.recipes.forEach((recipe) => {
                    // Check if recipe is locked. If it is, just push it into the array for the new meal plan as it should be kept with no change
                    if(!recipe.locked) {
                        // If recipe is unlocked, loop over the shuffled recipes array to find a new, replacement recipe
                        for (let i = 0; i < shuffledRecipes.length; i++) {
                            // If the recipe is either a) in the array of locked recipes, or b) the same as the one on the day you are currently replacing, then move onto the next shuffled recipe
                            if (lockedRecipes.some(recipe => recipe._id === shuffledRecipes[i]._id) || shuffledRecipes[i]._id === recipe._id) {
                                // Do nothing. Move onto the next recipe
                            } else {
                                // The new recipe from the shuffled array doesn't exist anywhere in the current plan, it is safe to use it
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