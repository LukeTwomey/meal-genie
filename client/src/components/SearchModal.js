import React from "react";
import { connect } from "react-redux";
import { toggleSearchModal, replaceMealPlanRecipe } from "../actions";
import { sort } from "../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/pro-solid-svg-icons";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
import "./SearchModal.css";

const SearchModal = ({
  recipes,
  toggleSearchModal,
  show,
  replaceMealPlanRecipe,
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const sortedRecipes = sort(recipes, "name");

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="modal-contents">
          <h1>Select Recipe</h1>
          <div
            className="button"
            onClick={() => {
              toggleSearchModal(null);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="recipeList">
            {sortedRecipes.sort().map((recipe) => {
              return (
                <div className="recipe" key={recipe._id}>
                  <p className="name">{recipe.name}</p>
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    className="select"
                    onClick={() => {
                      replaceMealPlanRecipe(recipe._id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    show: state.searchModal.show,
  };
};

export default connect(mapStateToProps, {
  toggleSearchModal,
  replaceMealPlanRecipe,
})(SearchModal);
