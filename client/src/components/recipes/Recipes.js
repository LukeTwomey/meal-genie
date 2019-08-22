import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../../actions';
import { Link } from "react-router-dom";
import RecipeImage from './RecipeImage';
import Loading from '../Loading/Loading';
import './Recipes.css';

class Recipes extends Component {
    componentDidMount() {
        this.props.fetchRecipes();
    }

    getRecipes() {
        const {recipes} = this.props;

        return recipes.map((recipe, i) => {
            let recipeUrlName = recipe.name.replace(/\s+/g, '-').toLowerCase();
            return (
                <Link to={`/recipes/${recipeUrlName}`} key={i}>
                <div className="recipeCard" >
                    <RecipeImage image={recipe.image}/>
                    <h2>{recipe.name}</h2>
                    {/* <Link to={`/recipes/${recipeUrlName}`}>{recipe.name}</Link> */}
                </div>
                </Link>
            ) 
        })
    }
    
    render() {
        const  { recipes, loading } = this.props;
        if(loading) {
            return <Loading />
        } else {
            return (
                <div>
                    {/* <h1>Recipes</h1> */}
                    {recipes.length !== 0 ? this.getRecipes() : null}
                    {/* <Link to="/recipes/new">Add new recipe</Link> */}
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

export default connect(
    mapStateToProps, 
    { fetchRecipes }
)(Recipes);