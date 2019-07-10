import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/pro-light-svg-icons'
import './Header.css';

const Header = () => {
    return (
        <header>
            <Link to="/recipes">
                <div className='recipeIcon'>
                    <FontAwesomeIcon className='icon' icon={faUtensils} />
                    <p>Recipes</p>
                </div>
            </Link>
            <Link to="/"><img src='images/logo.png' alt='logo' className='logo' /></Link>
        </header>
    );
};

export default Header;
