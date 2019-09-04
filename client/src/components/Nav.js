import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/pro-light-svg-icons'
import logo from '../images/logo.png';
import themeTune from '../audio/theme-tune.m4a';
import './Nav.css';

const Nav = () => {

    const audio = new Audio();
    audio.src = themeTune;

    return (
        <nav>
            <Link to="/recipes" className='recipeIcon'>
                <div>
                    <FontAwesomeIcon className='icon' icon={faUtensils} />
                    <p>Recipes</p>
                </div>
            </Link>
            <Link to="/" className='logo'>
                <img src={logo} alt='logo' onClick={ () => audio.play() }/>
            </Link>
        </nav>
    );
};

export default Nav;
