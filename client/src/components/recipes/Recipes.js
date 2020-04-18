import React, { Component } from 'react';
import { connect } from 'react-redux';
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