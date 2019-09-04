import React from 'react';
import { connect } from 'react-redux';

const Landing = (props) => {
    console.log(props);

    if(props.recipes.length === 0) {
        return null;
    }
    
    return <p>{props.recipes[props.mealPlan.randomRecipe].name}</p>;
}

const mapStateToProps = (state) => {
    return { 
        recipes: state.recipes,
        loading: state.loading,
        mealPlan: state.mealPlan
    };
}

export default connect(mapStateToProps)(Landing);