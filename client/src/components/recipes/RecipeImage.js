import React, { Component } from "react";
import { arrayBufferToBase64 } from "../../helpers";

class Recipeimage extends Component {
  render() {
    const { image } = this.props;

    if (image) {
      const imageString = arrayBufferToBase64(image.data.data);
      return (
        <img
          src={"data:image/jpeg;base64," + imageString}
          alt="Recipe"
          className="recipeImage"
        />
      );
    }

    return null;
  }
}

export default Recipeimage;
