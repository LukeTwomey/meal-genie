import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/pro-light-svg-icons'
import logo from '../images/logo.png';
import './Nav.css';

const Nav = () => {
    return (
        <nav>
            <Link to="/recipes" className='recipeIcon'>
                <div>
                    <FontAwesomeIcon className='icon' icon={faUtensils} />
                    <p>Recipes</p>
                </div>
            </Link>
            <Link to="/" className='logo'>
                <img src={logo} alt='logo' />
            </Link>
        </nav>
    );
};

export default Nav;
