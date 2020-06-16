import React, { Component } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import formFields from "./formFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/pro-solid-svg-icons";
import "./RecipeForm.css";

class RecipeForm extends Component {
  state = { image: null };

  onFileInputSubmit = () => {
    const fileInput = document.getElementById("imageUpload");
    const files = fileInput.files;
    const preview = document.getElementById("imagePreview");
    let recipeImage = document.getElementById("recipeImage");

    if (!recipeImage) {
      recipeImage = document.createElement("img");
      recipeImage.id = "recipeImage";
    }

    recipeImage.src = window.URL.createObjectURL(files[0]);
    preview.appendChild(recipeImage);
    this.setState({ image: files[0] });
  };

  onSubmit = async (formValues) => {
    this.props.onSubmit(formValues, this.state.image);
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
          onChange={this.onFileInputSubmit}
        />
        <div id="imagePreview">
          {this.props.initialValues ? (
            <img
              src={
                "https://meal-genie.s3.eu-west-2.amazonaws.com/" +
                this.props.initialValues.image
              }
              alt="Recipe"
              id="recipeImage"
            ></img>
          ) : null}
        </div>
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

export default reduxForm({
  form: "recipeForm",
  validate,
})(RecipeForm);
