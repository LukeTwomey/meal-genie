import React from 'react';
import { connect } from 'react-redux';
import RecipeCard from './recipes/RecipeCard';

const Landing = (props) => {
    const recipe = props.recipes[props.mealPlan.randomRecipe];

    if(props.recipes.length === 0) {
        return null;
    }

    return <RecipeCard recipe={recipe} />
}

const mapStateToProps = (state) => {
    return { 
        recipes: state.recipes,
        loading: state.loading,
        mealPlan: state.mealPlan
    };
}

export default connect(mapStateToProps)(Landing);