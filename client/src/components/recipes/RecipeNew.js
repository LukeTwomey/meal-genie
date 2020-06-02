import React from "react";
import RecipeForm from "./RecipeForm";
import { connect } from "react-redux";
import { createRecipe } from "../../actions";

class RecipeNew extends React.Component {
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
    this.props.createRecipe(formData, config);
  };

  render() {
    return (
      <div>
        <h1>Add New Recipe</h1>
        <RecipeForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createRecipe })(RecipeNew);
