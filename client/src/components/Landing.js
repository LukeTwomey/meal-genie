import React from 'react';
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div>
            <h1>Landing page</h1>
            <Link to="/test">Test</Link>
        </div>
    )
}

export default Landing;