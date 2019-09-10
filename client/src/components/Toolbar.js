import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockAlt } from '@fortawesome/pro-solid-svg-icons';
import './Toolbar.css';

const Toolbar = (props) => {
    // const { recipe } = props;
    // const recipeUrlName = recipe.name.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className='toolbar'>
            <div className='button'>
                <FontAwesomeIcon icon={faUnlockAlt} />
            </div>
        </div>
    )
}

export default Toolbar;