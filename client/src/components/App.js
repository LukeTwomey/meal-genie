import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Landing from './Landing';
import RecipeNew from './recipes/RecipeNew';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Landing} />
          <Route path="/recipes/new" exact component={RecipeNew} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
