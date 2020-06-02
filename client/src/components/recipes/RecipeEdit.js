import React from "react";
import { connect } from "react-redux";
import RecipeForm from "./RecipeForm";
import { fetchRecipe, editRecipe } from "../../actions";

class RecipeEdit extends React.Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.name);
  }

  onSubmit = (formValues) => {
    console.log(formValues);
  };

  render() {
    // console.log(this.props.recipe);

    if (!this.props.recipe) {
      return <div>Loading!</div>;
    }

    return (
      <div>
        <h1>Edit Recipe</h1>
        <RecipeForm
          initialValues={this.props.recipe}
          onSubmit={this.onSubmit}
        />
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

export default connect(mapStateToProps, { fetchRecipe, editRecipe })(
  RecipeEdit
);
