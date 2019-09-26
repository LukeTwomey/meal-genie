export default (state = [], action) => {
    switch (action.type) {
        case 'CLEAR_GROCERY_LIST':
            return [];
        case 'CREATE_GROCERY_LIST':
            const groceryList = [];
            const mealPlan = action.payload.recipes;

            mealPlan.forEach((mealPlanRecipe) => {
                mealPlanRecipe.ingredients.forEach((ingredient) => {
                    if (groceryList.some(groceryListItem => groceryListItem.ingredient === ingredient.ingredient)) {
                        let index = groceryList.findIndex((groceryListItem) => {
                            return groceryListItem.ingredient === ingredient.ingredient;
                        })
                        groceryList[index].quantity += ingredient.quantity;
                    } else {
                        // Need to use spread to clone the object getting pushed to the array
                        // otherwise updating it will also affect the original mealPlan array, due to reference
                        groceryList.push({ ...ingredient }); 
                    }
                })
            });

            return groceryList;
        default:
            return state;
    }
}