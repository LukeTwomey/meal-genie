import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import { Redirect } from "react-router-dom";
import axios from "axios";
import formFields from "./formFields";
import IngredientInputs from "./IngredientInputs";
import { createRecipe } from "../../actions";
import MethodInputs from "./MethodInputs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/pro-solid-svg-icons";
import "./RecipeForm.css";
import { convertCompilerOptionsFromJson } from "typescript";

class RecipeForm extends Component {
  state = { image: null };

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

  onSubmit = async (formValues) => {
    // Need to submit post using multipart/form-data, as there is a File (image) included
    const formData = new FormData();

    // Loop through all form fields and add them to the formData which will be sent in the post request
    for (let field in formValues) {
      console.log(field);
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
    formData.set("image", this.state["image"]);

    // Set up the config to tell axios that this is a multipart post request (text and image/file)
    const config = { headers: { "content-type": "multipart/form-data" } };
    // await axios.post("/api/recipes", formData, config);
    // this.props.fetchRecipes();
    // this.setState({ redirect: "/recipes" });

    this.props.createRecipe(formData, config);
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <p className="validationError">{error}</p>;
    }
  };

  renderInput = ({
    fields,
    name,
    input,
    label,
    type,
    meta,
    arrayFields,
    index,
    options,
    buttonText,
  }) => {
    switch (type) {
      case "text":
      case "number":
        const className = `formInput ${
          meta.error && meta.touched ? "error" : ""
        }`;
        return (
          <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off" type={type} />
            {this.renderError(meta)}
          </div>
        );
      case "select":
        return (
          <div>
            <label>{label}</label>
            <select {...input}>
              {options.map((option, i) => {
                return (
                  <option value={option} key={i}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
        );
      case "textarea":
        const textAreaClassName = `formInput ${
          meta.error && meta.touched ? "error" : ""
        }`;
        return (
          <div className={textAreaClassName}>
            <label>{`${label} ${index + 1}`}</label>
            <textarea rows="5" {...input} />
            {this.renderError(meta)}
          </div>
        );
      case "array":
        return (
          <div>
            <div>
              <label>{label}</label>
              <div className={fields.name}>
                {fields.map((field, i) => {
                  return (
                    <div className="fieldArrayContainer" key={i}>
                      <fieldset>
                        {arrayFields.map((arrayField, index) => {
                          return (
                            <div
                              className={`${arrayField.name}Container`}
                              key={index}
                            >
                              <Field
                                name={`${field}.${arrayField.name}`}
                                label={arrayField.label}
                                type={arrayField.type}
                                options={arrayField.options}
                                index={i}
                                className="arrayField"
                                component={this.renderInput}
                              />
                            </div>
                          );
                        })}
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
              {meta.error ? (
                <p className="validationError">{meta.error}</p>
              ) : null}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                fields.push({});
              }}
              id={`add${label}Button`}
            >
              {buttonText}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  renderFields = () => {
    return formFields.map(
      ({ name, label, type, arrayFields, buttonText }, i) => {
        switch (type) {
          case "text":
          case "number":
            return (
              <Field
                name={name}
                label={label}
                type={type}
                key={i}
                component={this.renderInput}
              />
            );
          case "array":
            return (
              <FieldArray
                name={name}
                label={label}
                type={type}
                key={i}
                arrayFields={arrayFields}
                buttonText={buttonText}
                component={this.renderInput}
              />
            );
          default:
            return null;
        }
      }
    );
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
          {this.renderFields()}
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

const validateFieldArrays = (
  formValues,
  errors,
  arrayName,
  emptyArrayErrorText,
  fieldName,
  emptyFieldErrorText
) => {
  if (!formValues[arrayName] || !formValues[arrayName].length) {
    errors[arrayName] = { _error: emptyArrayErrorText };
  } else {
    const arrayErrors = [];
    formValues[arrayName].forEach((val, i) => {
      const errors = {};
      if (!val[fieldName]) {
        errors[fieldName] = emptyFieldErrorText;
        arrayErrors[i] = errors;
      }
      return errors;
    });
    if (arrayErrors.length) {
      errors[arrayName] = arrayErrors;
    }
  }
  return errors;
};

const validate = (formValues) => {
  let errors = {};

  formFields.forEach(({ name, validationErrorText }) => {
    if (!formValues[name]) {
      errors[name] = validationErrorText;
    }
  });

  errors = validateFieldArrays(
    formValues,
    errors,
    "ingredients",
    "At least one ingredient must be added",
    "name",
    "Please enter a name"
  );

  errors = validateFieldArrays(
    formValues,
    errors,
    "method",
    "At least one step must be added",
    "detail",
    "Please enter step details"
  );

  return errors;
};

const formWrapped = reduxForm({
  form: "recipeForm",
  validate,
})(RecipeForm);

export default connect(null, { createRecipe })(formWrapped);
