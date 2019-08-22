import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Landing from './Landing';
import Recipes from './recipes/Recipes';
import RecipeDetail from './recipes/RecipeDetail';
import RecipeNew from './recipes/RecipeNew';
import './App.css';

class App extends React.Component {
  // state = {
  //   recipes: [],
  //   loading: true
  // }

  // fetchRecipes = async () => {
  //   const res = await axios.get('/api/recipes');
  //   this.setState({ 
  //     recipes: res.data.reverse(),
  //     loading: false
  //   });
  // }

  // componentDidMount() {
  //   this.fetchRecipes();
  // }

  render() {
    // const { recipes, loading } = this.state;

    return (
      <BrowserRouter>
        <div className='container'>
          <Nav />
          <div className='pageContent'>
            <Route path="/" exact component={Landing} />
            <Switch>
              {/* <Route path="/recipes" exact render={(props) => <Recipes {...props} recipes={recipes} loading={loading}/>} />
              <Route path="/recipes/new" exact render={(props) => <RecipeNew {...props} fetchRecipes={this.fetchRecipes} />} />
              <Route path="/recipes/:name" exact render={(props) => <RecipeDetail {...props} recipes={recipes} />} /> */}
              <Route path="/recipes" exact render={(props) => <Recipes />} />
              {/* <Route path="/recipes/new" exact render={(props) => <RecipeNew {...props} fetchRecipes={this.fetchRecipes} />} />
              <Route path="/recipes/:name" exact render={(props) => <RecipeDetail {...props} recipes={recipes} />} /> */}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
