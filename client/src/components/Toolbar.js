import React from 'react';
import { connect } from 'react-redux';
import { toggleMealLock } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpenAlt, faLockAlt  } from '@fortawesome/pro-solid-svg-icons';
import './Toolbar.css';

const Toolbar = (props) => {
    const { id, locked, toggleMealLock } = props;

    return (
        <div className='toolbar'>
            <div className='button' onClick={() => { toggleMealLock(id) }}>
            {locked === false || locked === undefined 
                ? <FontAwesomeIcon icon={faLockOpenAlt} /> 
                : <FontAwesomeIcon icon={faLockAlt} />}
            </div>
        </div>
    )
}

export default connect(null, { toggleMealLock })(Toolbar);