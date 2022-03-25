import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/pro-light-svg-icons";
// import { toggleShareModal } from "../actions";
import RecipeCard from "./recipes/RecipeCard";
import Toolbar from "./Toolbar";
import "./MealPlan.css";

const Landing = (props) => {
  const recipes = props.mealPlan;
  // const { toggleShareModal } = props;
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  if (recipes === undefined || recipes.length === 0) {
    return <p>Touch the genie to create a new meal plan!</p>;
  }
  return (
    <div className="mealPlan">
      {recipes.map((recipe, i) => (
        <div className="mealPlanCard" key={i}>
          <h1>{weekDays[i]}</h1>
          <Toolbar id={recipe._id} arrayIndex={i} locked={recipe.locked} />
          <RecipeCard recipe={recipe} />
        </div>
      ))}
      {/* <div
        className="shareButton"
        onClick={() => {
          toggleShareModal();
        }}
      >
        <FontAwesomeIcon icon={faEnvelopeOpenText} />
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  recipes: Object.values(state.recipes),
  loading: state.loading,
  mealPlan: Object.values(state.mealPlan),
});

export default connect(mapStateToProps)(Landing);
