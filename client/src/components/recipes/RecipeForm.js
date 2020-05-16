import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import axios from "axios";
import formFields from "./formFields";
import IngredientInputs from "./IngredientInputs";
import { fetchRecipes } from "../../actions";
import MethodInputs from "./MethodInputs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/pro-solid-svg-icons";
import "./RecipeForm.css";

class RecipeForm extends Component {
  state = {
    // name: "",
    // rating: "",
    // cookingTime: "",
    // servings: "",
    // description: "",
    // syns: "",
    // ingredients: [{ ingredient: "", quantity: 0, unit: "" }],
    // method: [{ step: "" }],
    image: null,
    // redirect: null,
  };

  // handleChange = (e) => {
  //   if (["ingredient", "quantity", "unit"].includes(e.target.className)) {
  //     let ingredients = [...this.state.ingredients];
  //     ingredients[e.target.dataset.id][e.target.className] = e.target.value;
  //     this.setState({ ingredients });
  //   } else if (["step"].includes(e.target.className)) {
  //     let method = [...this.state.method];
  //     method[e.target.dataset.id][e.target.className] = e.target.value;
  //     this.setState({ method });
  //   } else {
  //     const target = e.target;
  //     const value = target.value;
  //     const name = target.name;
  //     this.setState({ [name]: value });
  //   }
  // };

  // handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Need to submit post using multipart/form-data, as there is a File (image) included
  //   const formData = new FormData();

  //   // Loop through all form fields and add them to the formData which will be sent in the post request
  //   for (let field in this.state) {
  //     // handle case where data is an array (like ingredients or method)
  //     if (Array.isArray(this.state[field])) {
  //       let data = JSON.stringify(this.state[field]);
  //       formData.set(field, data);
  //     } else {
  //       // Set formdata for all the other normal string fields (name, rating, description etc)
  //       formData.set(field, this.state[field]);
  //     }
  //   }

  //   // Set up the config to tell axios that this is a multipart post request (text and image/file)
  //   const config = { headers: { "content-type": "multipart/form-data" } };
  //   await axios.post("/api/recipes", formData, config);
  //   this.props.fetchRecipes();
  //   this.setState({ redirect: "/recipes" });
  // };

  // renderStaticFields = () => {
  //   return formFields.map(({ name, label, type }) => {
  //     return (
  //       <div className="formInput" key={name}>
  //         <label htmlFor={name}>{label}</label>
  //         <input
  //           id={name}
  //           name={name}
  //           type={type}
  //           value={this.state[name]}
  //           onChange={this.handleChange}
  //         />
  //       </div>
  //     );
  //   });
  // };

  addImage = () => {
    const fileInput = document.getElementById("imageUpload");
    const preview = document.getElementById("imagePreview");
    const files = fileInput.files;

    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    if (files.length !== 0) {
      const image = document.createElement("img");
      image.src = window.URL.createObjectURL(files[0]);
      preview.appendChild(image);
      this.setState({ image: files[0] });
    }
  };

  onSubmit = (formValues) => {
    console.log("You successfully submitted the form!");
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <p className="validationError">{error}</p>;
    }
  };

  renderInput = ({ input, label, type, meta }) => {
    const className = `formInput ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" type={type} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderThisHardCodedSelect = ({ input, label, type, meta }) => {
    return (
      <div>
        <label>{label}</label>
        <select {...input} className="unit">
          <option value="">{/* Blank value */}</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="tsp">tsp</option>
          <option value="tbsp">tbsp</option>
          <option value="ml">ml</option>
          <option value="l">l</option>
        </select>
      </div>
    );
  };

  renderThisHardCodedTextArea = ({ input, label, type, meta }) => {
    const className = `formInput ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <textarea rows="5" {...input} className="step" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderIngredients = ({ fields, label, meta }) => {
    return (
      <div>
        <div>
          <label>{label}</label>
          <div className="ingredients">
            {fields.map((ingredient, i) => {
              return (
                <div className="ingredientContainer" key={i}>
                  <fieldset>
                    <Field
                      name={`${ingredient}.name`}
                      label="Name"
                      type="input"
                      className="ingredient"
                      component={this.renderInput}
                    />
                    <div className="quantityContainer">
                      <Field
                        name={`${ingredient}.quantity`}
                        label="Quantity"
                        type="number"
                        className="quantity"
                        component={this.renderInput}
                      />
                    </div>
                    <div className="unitContainer">
                      <Field
                        name={`${ingredient}.unit`}
                        label="Unit"
                        type="select"
                        className="unit"
                        component={this.renderThisHardCodedSelect}
                      />
                    </div>
                  </fieldset>
                  <div
                    className="deleteButton"
                    onClick={() => fields.remove(i)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                </div>
              );
            })}
          </div>
          {this.renderError(meta)}
          {meta.error ? <p className="validationError">{meta.error}</p> : null}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            fields.push({});
          }}
          id="addIngredientButton"
        >
          Add ingredient
        </button>
      </div>
    );
  };

  renderSteps = ({ fields, label, meta }) => {
    return (
      <div>
        <div>
          <label>{label}</label>
          <div className="method">
            {fields.map((step, i) => {
              return (
                <div className="methodContainer" key={i}>
                  <fieldset>
                    <Field
                      name={`${step}.detail`}
                      label={`Step ${i + 1}`}
                      className="step"
                      component={this.renderThisHardCodedTextArea}
                    />
                  </fieldset>
                  <div
                    className="deleteButton"
                    onClick={() => fields.remove(i)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                </div>
              );
            })}
          </div>
          {this.renderError(meta)}
          {meta.error ? <p className="validationError">{meta.error}</p> : null}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            fields.push({});
          }}
          id="addStepButton"
        >
          Add step
        </button>
      </div>
    );
  };

  renderStaticFields = () => {
    return formFields.map(({ name, label, type }) => {
      return (
        <Field
          name={name}
          label={label}
          type={type}
          key={name}
          component={this.renderInput}
        />
      );
    });
  };

  renderFileUploadField = () => {
    return (
      <div>
        <label htmlFor="imageUpload" id="imageUploadLabel">
          Add image
        </label>
        <input
          type="file"
          id="imageUpload"
          accept=".jpg, .jpeg, .png"
          onChange={this.addImage}
        />
        <div id="imagePreview"></div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="addNewRecipeForm"
        >
          {this.renderFileUploadField()}
          {this.renderStaticFields()}
          <FieldArray
            name="ingredients"
            label="Ingredients"
            component={this.renderIngredients}
          />
          <FieldArray
            name="method"
            label="Method"
            component={this.renderSteps}
          />
          <button className="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     recipes: state.recipes,
//   };
// };

// export default connect(mapStateToProps, { fetchRecipes })(RecipeForm);

const validate = (formValues) => {
  const errors = {};

  formFields.forEach(({ name, validationErrorText }) => {
    if (!formValues[name]) {
      errors[name] = validationErrorText;
    }
  });

  if (!formValues.ingredients || !formValues.ingredients.length) {
    errors.ingredients = { _error: "At least one ingredient must be added" };
  } else {
    const ingredientsArrayErrors = [];
    formValues.ingredients.forEach((ingredient, i) => {
      const ingredientErrors = {};
      if (!ingredient.name) {
        ingredientErrors.name = "Please enter a name";
        ingredientsArrayErrors[i] = ingredientErrors;
      }
      return ingredientErrors;
    });
    if (ingredientsArrayErrors.length) {
      errors.ingredients = ingredientsArrayErrors;
    }
  }

  if (!formValues.method || !formValues.method.length) {
    errors.method = { _error: "At least one step must be added" };
  } else {
    const methodArrayErrors = [];
    formValues.method.forEach((step, i) => {
      const methodErrors = {};
      if (!step.detail) {
        methodErrors.detail = "Please enter step details";
        methodArrayErrors[i] = methodErrors;
      }
      return methodErrors;
    });
    if (methodArrayErrors.length) {
      errors.method = methodArrayErrors;
    }
  }

  return errors;
};

export default reduxForm({
  form: "recipeForm",
  validate,
})(RecipeForm);
