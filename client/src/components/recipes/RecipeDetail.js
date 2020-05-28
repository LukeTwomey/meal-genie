import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/pro-regular-svg-icons";
import { faTrashAlt } from "@fortawesome/pro-solid-svg-icons";
import RecipeImage from "./RecipeImage";
import Loading from "../Loading/Loading";
import "./RecipeDetail.css";

const RecipeDetail = (props) => {
  let recipeUrlName = props.match.params.name;

  // Find the recipe that matches the url name
  let recipe = props.recipes.find((o) => {
    let recipeName = o.name.replace(/\s+/g, "-").toLowerCase();
    return recipeName === recipeUrlName ? true : false;
  });

  if (!recipe) {
    return <Loading />;
  } else {
    let ingredients = recipe.ingredients.map((ingredient, i) => {
      return (
        <li key={i}>
          {ingredient.quantity}
          {ingredient.unit} {ingredient.ingredient}
        </li>
      );
    });

    let method = recipe.method.map((method, i) => {
      return <li key={i}>{method.step}</li>;
    });

    return (
      <div>
        <div className="recipeDetail">
          <div className="imageContainer">
            <RecipeImage image={recipe.image} />
          </div>
          <h2>{recipe.name}</h2>
          <div className="recipeText">
            <Link to={`/recipes/edit/${recipeUrlName}`}>
              <FontAwesomeIcon icon={faEdit} className="edit" />
            </Link>
            <FontAwesomeIcon icon={faTrashAlt} className="deleteButton" />
            <p>{recipe.description}</p>
            <p>Rating: {recipe.rating}</p>
            <p>Cooking Time: {recipe.cookingTime}</p>
            <p>Servings: {recipe.servings}</p>
            <p>Syns: {recipe.syns}</p>
            <h3>Ingredients</h3>
            <ul>{ingredients}</ul>
            <h3>Method</h3>
            <ol>{method}</ol>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    recipes: Object.values(state.recipes),
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(RecipeDetail);
