import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios';
import Landing from './Landing';
import Recipes from './recipes/Recipes';
import RecipeNew from './recipes/RecipeNew';
import './App.css';

class App extends React.Component {
  state = {
    recipes: []
  }

  componentDidMount = async () => {
    const res = await axios.get('/api/recipes');
    this.setState({ recipes: res.data });
  }

  render() {
    const { recipes } = this.state;

    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Landing} />
          <Route path="/recipes" exact render={(props) => <Recipes {...props} recipes={recipes} />} />
          <Route path="/recipes/new" exact component={RecipeNew} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
