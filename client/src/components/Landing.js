import React from 'react';
import { connect } from 'react-redux';
import Loading from './Loading/Loading';
import RecipeCard from './recipes/RecipeCard';

const Landing = (props) => {
    const recipes = props.mealPlan.recipes;

    if (recipes === undefined) {
        return <Loading />
    } else if(recipes.length === 0) {
        console.log("Nothing here! Why don't you generate a meal plan?");
        return null;
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