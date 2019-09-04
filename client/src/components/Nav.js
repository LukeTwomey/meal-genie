import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCalendarAlt } from '@fortawesome/pro-light-svg-icons';
import { planMeals } from '../actions';
import logo from '../images/logo.png';
import themeTune from '../audio/theme-tune.m4a';
import './Nav.css';

const Nav = (props) => {
    const audio = new Audio(themeTune);

    return (
        <nav>
            <Link to="/recipes" className='recipeIcon'>
                <div>
                    <FontAwesomeIcon className='icon' icon={faUtensils} />
                    <p>Recipes</p>
                </div>
            </Link>
            <Link to="/" className='mealPlanIcon'>
                <div>
                    <FontAwesomeIcon className='icon' icon={faCalendarAlt} />
                    <p>Meal Plan</p>
                </div>
            </Link>
            <img src={logo} alt='logo' className='logo' onClick={ () => {
                audio.play();
                props.planMeals();
            }}/>
        </nav>
    );
};

export default connect(null, { planMeals })(Nav);
