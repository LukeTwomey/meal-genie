import React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCalendarAlt, faShoppingCart } from '@fortawesome/pro-light-svg-icons';
import { faUtensils as faUtensilsSolid, faCalendarAlt as faCalendarAltSolid, faShoppingCart as faShoppingCartSolid } from '@fortawesome/pro-solid-svg-icons';
import { planMeals } from '../actions';
import logo from '../images/logo.png';
import themeTune from '../audio/theme-tune.m4a';
import './Nav.css';

const Nav = (props) => {
    const audio = new Audio(themeTune);

    return (
        <nav>
            <NavLink exact to="/recipes" className='recipeIcon' activeClassName="selected">
                <div>
                    <FontAwesomeIcon className='emptyIcon' icon={faUtensils} />
                    <FontAwesomeIcon className='solidIcon' icon={faUtensilsSolid} />
                    <p>Recipes</p>
                </div>
            </NavLink>
            <NavLink exact to="/" className='mealPlanIcon' activeClassName="selected">
                <div>
                    <FontAwesomeIcon className='emptyIcon' icon={faCalendarAlt} />
                    <FontAwesomeIcon className='solidIcon' icon={faCalendarAltSolid} />
                    <p>Meal Plan</p>
                </div>
            </NavLink>
            <img src={logo} alt='logo' className='logo' onClick={ () => {
                audio.play();
                props.planMeals();
            }}/>
            <NavLink exact to="/grocery-list" className='groceryListIcon' activeClassName="selected">
                <div>
                    <FontAwesomeIcon className='emptyIcon' icon={faShoppingCart} />
                    <FontAwesomeIcon className='solidIcon' icon={faShoppingCartSolid} />
                    <p>Grocery List</p>
                </div>
            </NavLink>
        </nav>
    );
};

export default connect(null, { planMeals })(Nav);
