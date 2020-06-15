import React, { Component } from "react";

class Recipeimage extends Component {
  render() {
    const { image } = this.props;

    if (image) {
      return (
        <img
          src={"https://meal-genie.s3.eu-west-2.amazonaws.com/" + image}
          alt="Recipe"
          className="recipeImage"
        />
      );
    }

    return null;
  }
}

export default Recipeimage;
