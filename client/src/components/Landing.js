import React from 'react';
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div>            
            <Link to="/recipes">View all recipes</Link><br/>
            <Link to="/recipes/new">Add new recipe</Link>
        </div>
    )
}

export default Landing;