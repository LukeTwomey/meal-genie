import React from "react";
import RecipeForm from "./RecipeForm";

const RecipeNew = (props) => {
  return (
    <div>
      <h1>Add New Recipe</h1>
      <RecipeForm fetchRecipes={props.fetchRecipes} />
    </div>
  );
};

export default RecipeNew;
