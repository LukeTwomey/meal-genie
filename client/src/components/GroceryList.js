import React from 'react';
import { connect } from 'react-redux';
import { createGroceryList } from '../actions';
import Loading from './Loading/Loading';
// import './GroceryList.css';

const GroceryList = (props) => {
    const groceryList = props.groceryList;
    const mealPlan = props.mealPlan.recipes;

    if(mealPlan.length === 0) {
        return <p>First create a meal plan!</p>
    }

    if(groceryList.length === 0) {
        props.createGroceryList();
        return <Loading />;
    } else {
        return (
            <ul>
                {groceryList.map((groceryListItem, i) => {
                    return (
                        <li className='groceryListItem' key={i}>
                            <p>{groceryListItem.quantity}{groceryListItem.unit} {groceryListItem.ingredient}</p>
                        </li>
                    )
                })}
            </ul>
        )
    }    
}

const mapStateToProps = (state) => {
    return { 
        mealPlan: state.mealPlan,
        groceryList: state.groceryList
    };
}

export default connect(mapStateToProps, { createGroceryList })(GroceryList);