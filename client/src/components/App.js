import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { fetchRecipes } from '../actions';
import ScrollToTop from './ScrollToTop';
import SearchModal from './SearchModal';
import Nav from './Nav';
import MealPlan from './MealPlan';
import Recipes from './recipes/Recipes';
import RecipeDetail from './recipes/RecipeDetail';
import RecipeNew from './recipes/RecipeNew';
import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.fetchRecipes();
	}

	render () {
		return (
			<BrowserRouter>
				<ScrollToTop>
				<div className='container'>
					<Nav />
					<div className='pageContent'>
						<Route path="/" exact component={MealPlan} />
						<Switch>
							<Route path="/recipes" exact component={Recipes} />
							<Route path="/recipes/new" exact component={RecipeNew} />
							<Route path="/recipes/:name" exact component={RecipeDetail} />
						</Switch>
						<SearchModal />
					</div>
				</div>
				</ScrollToTop>
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
