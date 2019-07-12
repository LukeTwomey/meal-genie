import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/pro-light-svg-icons'
import logo from '../images/logo.png';
import './Nav.css';

const Nav = () => {
    return (
        <nav>
            <Link to="/recipes">
                <div className='recipeIcon'>
                    <FontAwesomeIcon className='icon' icon={faUtensils} />
                    <p>Recipes</p>
                </div>
            </Link>
            <Link to="/"><img src={logo} alt='logo' className='logo' /></Link>
        </nav>
    );
};

export default Nav;
