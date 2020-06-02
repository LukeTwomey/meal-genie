import React from "react";
import { connect } from "react-redux";
import RecipeForm from "./RecipeForm";
import { fetchRecipe } from "../../actions";

class RecipeEdit extends React.Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.name);
  }

  render() {
    console.log(this.props);

    if (!this.props.recipe) {
      return <div>Loading!</div>;
    }

    return (
      <div>
        <h1>Edit Recipe</h1>
        <div>{this.props.recipe.name}</div>
        <RecipeForm />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const allRecipes = Object.values(state.recipes);
  let recipeUrlName = ownProps.match.params.name;
  // Find the recipe that matches the url name
  let recipe = allRecipes.find((o) => {
    let recipeName = o.name.replace(/\s+/g, "-").toLowerCase();
    return recipeName === recipeUrlName ? true : false;
  });

  return {
    recipe: recipe,
  };
};

export default connect(mapStateToProps, { fetchRecipe })(RecipeEdit);
