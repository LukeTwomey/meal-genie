import React from "react";
import { connect } from "react-redux";
import RecipeForm from "./RecipeForm";
import Loading from "../Loading/Loading";
import { fetchRecipe, editRecipe } from "../../actions";
import _ from "lodash";

class RecipeEdit extends React.Component {
  componentDidMount() {
    this.props.fetchRecipe(this.props.match.params.name);
  }

  onSubmit = (formValues, image) => {
    this.props.editRecipe(formValues, image);
  };

  render() {
    if (!this.props.recipe) {
      return <Loading />;
    }

    return (
      <div>
        <h1>Edit Recipe</h1>
        <RecipeForm
          initialValues={_.pick(
            this.props.recipe,
            "cookingTime",
            "description",
            "image",
            "ingredients",
            "method",
            "name",
            "rating",
            "servings",
            "syns"
          )}
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
