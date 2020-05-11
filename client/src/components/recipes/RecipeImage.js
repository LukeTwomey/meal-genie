import React, { Component } from "react";

class Recipeimage extends Component {
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }

  render() {
    const { image } = this.props;

    if (image) {
      const imageString = this.arrayBufferToBase64(image.data.data);
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
