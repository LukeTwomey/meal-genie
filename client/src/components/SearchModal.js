import React from 'react';
import { connect } from 'react-redux';
import { toggleSearchModal } from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/pro-solid-svg-icons';
import './SearchModal.css';

const SearchModal = ({ recipes, toggleSearchModal, show }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="modal-contents">
                    <h1>Recipe Search</h1>
                    <div className='button' onClick={() => { toggleSearchModal(null) }}>
                        <FontAwesomeIcon icon={faWindowClose} /> 
                    </div>
                    <div className="recipeList">
                        {recipes.map((recipe) => {
                            return (<p key={recipe._id}>{recipe.name}</p>)
                        })}
                    </div>
                    </div>
            </section>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { 
        recipes: state.recipes,
        show: state.searchModal.show
    };
}

export default connect(mapStateToProps, { toggleSearchModal })(SearchModal);