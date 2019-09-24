import React from 'react';
import { connect } from 'react-redux';
import RecipeCard from './recipes/RecipeCard';
import Toolbar from './Toolbar';
import './MealPlan.css';

const Landing = (props) => {
    
    const recipes = props.mealPlan.recipes;
    console.log(recipes);
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    if (recipes === undefined || recipes.length === 0) {
        return <p>Touch the genie to create a new meal plan!</p>;
    } else {
        return (
            <div className="mealPlan">
                {recipes.map((recipe, i) => {
                    return (
                        <div className='mealPlanCard' key={i}>
                            <h1>{weekDays[i]}</h1>
                            <Toolbar id={recipe._id} arrayIndex={i} locked={recipe.locked}/>
                            <RecipeCard recipe={recipe} />
                        </div>
                    ) 
                })}
            </div>
        )
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