import React from "react";
import { connect } from "react-redux";
import RecipeForm from "./RecipeForm";

const RecipeEdit = (props) => {
  console.log(props.recipe);

  return (
    <div>
      <h1>Edit Recipe</h1>
      <RecipeForm fetchRecipes={props.fetchRecipes} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const allRecipes = Object.values(state.recipes);
  let recipeUrlName = ownProps.match.params.name;
  // Find the recipe that matches the url name
  let recipe = allRecipes.find((o) => {
    let recipeName = o.name.replace(/\s+/g, "-").toLowerCase();
    return recipeName === recipeUrlName ? true : false;
  });

  // console.log(recipe);

  return {
    recipe: recipe,
  };
};

export default connect(mapStateToProps)(RecipeEdit);
