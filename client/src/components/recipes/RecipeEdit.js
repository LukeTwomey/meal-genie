import React from "react";
import RecipeForm from "./RecipeForm";

const RecipeEdit = (props) => {
  return (
    <div>
      <h1>Edit Recipe</h1>
      <RecipeForm fetchRecipes={props.fetchRecipes} />
    </div>
  );
};

export default RecipeEdit;
