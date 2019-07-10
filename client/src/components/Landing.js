import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from '@fortawesome/pro-light-svg-icons'

const Landing = () => {
    return (
        <div>
            <FontAwesomeIcon className='icon' icon={faAtom} /><br/><br/><br/>
            <Link to="/recipes">View all recipes</Link><br/>
            <Link to="/recipes/new">Add new recipe</Link>
        </div>
    )
}

export default Landing;