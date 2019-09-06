import React from 'react';
import { connect } from 'react-redux';
import RecipeCard from './recipes/RecipeCard';

const Landing = (props) => {
    const recipes = props.mealPlan.recipes;

    if (recipes === undefined || recipes.length === 0) {
        return <p>Touch the genie to create a new meal plan!</p>;
    } else {
        return recipes.map((recipe, i) => {
            return (
                <RecipeCard recipe={recipe} key={i}/>
            ) 
        })
    }
}

const mapStateToProps = (state) => {
    return { 
        recipes: state.recipes,
        loading: state.loading,
        mealPlan: state.mealPlan
    };
}

export default connect(mapStateToProps)(Landing);