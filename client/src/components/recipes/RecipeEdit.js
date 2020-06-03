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
    // Need to submit post using multipart/form-data, as there is a File (image) included
    const formData = new FormData();

    // Loop through all form fields and add them to the formData which will be sent in the post request
    for (let field in formValues) {
      // handle case where data is an array (like ingredients or method)
      if (Array.isArray(formValues[field])) {
        let data = JSON.stringify(formValues[field]);
        formData.set(field, data);
      } else {
        // Set formdata for all the other normal string fields (name, rating, description etc)
        formData.set(field, formValues[field]);
      }
    }

    // Add the recipe image to formData
    formData.set("image", image);

    // Set up the config to tell axios that this is a multipart post request (text and image/file)
    const config = { headers: { "content-type": "multipart/form-data" } };
    this.props.editRecipe(this.props.match.params.name, formData, config);
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
