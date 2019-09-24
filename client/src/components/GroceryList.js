import React from 'react';
import { connect } from 'react-redux';
// import './GroceryList.css';

const GroceryList = (props) => {
    let groceryList = ['chicken'];
    console.log(groceryList);
    return (
        null
    )
}

const mapStateToProps = (state) => {
    return { 
        recipes: state.recipes,
        loading: state.loading,
        mealPlan: state.mealPlan
    };
}

export default connect(mapStateToProps)(GroceryList);