import React from "react";
import RecipeForm from "./RecipeForm";
import { connect } from "react-redux";
import { createRecipe } from "../../actions";

class RecipeNew extends React.Component {
  onSubmit = (formValues, image) => {
    this.props.createRecipe(formValues, image);
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
