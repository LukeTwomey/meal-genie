import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import RecipeCard from './RecipeCard';
import Loading from '../Loading/Loading';

class Recipes extends Component {
    getRecipes() {
        const {recipes} = this.props;

        return recipes.map((recipe, i) => {
            return (
                <RecipeCard recipe={recipe} key={i}/>
            ) 
        })
    }
    
    render() {
        const  { recipes, loading } = this.props;

        if(loading.status) {
            return <Loading />
        } else {
            return (
                <div>
                    {recipes.length !== 0 ? this.getRecipes() : null}
                    <Link to="/recipes/new">
                        <div className="addButton">
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </Link>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { 
        recipes: state.recipes,
        loading: state.loading 
    };
}

export default connect(mapStateToProps)(Recipes);