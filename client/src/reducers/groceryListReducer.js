export default (state = [], action) => {
  switch (action.type) {
    case "CLEAR_GROCERY_LIST":
      return [];
    case "CREATE_GROCERY_LIST":
      const groceryList = [];
      const mealPlan = action.payload;

      mealPlan.forEach((mealPlanRecipe) => {
        mealPlanRecipe.ingredients.forEach((ingredient) => {
          if (
            groceryList.some(
              (groceryListItem) =>
                groceryListItem.ingredient === ingredient.ingredient
            )
          ) {
            let index = groceryList.findIndex((groceryListItem) => {
              return groceryListItem.ingredient === ingredient.ingredient;
            });
            groceryList[index].quantity =
              parseFloat(groceryList[index].quantity) +
              parseFloat(ingredient.quantity);
          } else {
            // Need to use spread to clone the object getting pushed to the array
            // otherwise updating it will also affect the original mealPlan array, due to reference
            groceryList.push({ ...ingredient });
          }
        });
      });

      return groceryList;
    default:
      return state;
  }
};
