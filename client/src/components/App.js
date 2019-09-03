import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Landing from './Landing';
import Recipes from './recipes/Recipes';
import RecipeDetail from './recipes/RecipeDetail';
import RecipeNew from './recipes/RecipeNew';
import './App.css';

const App = () => {
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

export default App;
