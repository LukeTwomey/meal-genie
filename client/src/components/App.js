import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { fetchRecipes } from '../actions';
import Nav from './Nav';
import Landing from './Landing';
import Recipes from './recipes/Recipes';
import RecipeDetail from './recipes/RecipeDetail';
import RecipeNew from './recipes/RecipeNew';
import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.fetchRecipes();
	}

	render () {
		console.log(this.props.recipes);

		return (
			<BrowserRouter>
				<div className='container'>
					<Nav />
					<div className='pageContent'>
					<Route path="/" exact component={Landing} />
					<Switch>
						<Route path="/recipes" exact component={Recipes} />
						<Route path="/recipes/new" exact component={RecipeNew} />
						<Route path="/recipes/:name" exact component={RecipeDetail} />
					</Switch>
					</div>
				</div>
			</BrowserRouter>
		);
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
)(App);
