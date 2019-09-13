import React from 'react';
import { connect } from 'react-redux';
import { toggleMealLock } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpenAlt } from '@fortawesome/pro-solid-svg-icons';
import './Toolbar.css';

const Toolbar = (props) => {
    // console.log(props);

    const { id, toggleMealLock } = props;

    // const toggleLock = () => {
    //     console.log(id);
    // }

    return (
        <div className='toolbar'>
            {/* <div className='button' onClick={toggleLock}> */}
            <div className='button' onClick={() => { toggleMealLock(id) }}>
                <FontAwesomeIcon icon={faLockOpenAlt} />
            </div>
        </div>
    )
}

export default connect(null, { toggleMealLock })(Toolbar);