import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route} from 'react-router-dom';
import Landing from './Landing';
import Test from './Test';
import './App.css';

class App extends React.Component {

  fire = async () => {
    const recipe = { 
      name: 'Cajun Chicken Pasta',
      rating: 5,
      cookingTime: 30,
      servings: 4,
      description: 'Cajun chicken description here',
      syns: 0,
      ingredients: [
          '400g - 500g Penne Pasta',
          '2x Muscle Foods Chicken Breasts (cut into small cubes)',
          '2x Red Peppers (sliced thinly)',
          '1x Onion (sliced thinly)',
          '4tbsp Cajun Seasoning (plus extra for dusting)',
          '1L Chicken Stock',
          '1x Egg',
          '2tbsp Quark/Fromage Frais',
          '35g Grated Cheddar Cheese (optional)',
          'Salt & Pepper (to taste)',
          'Fry Light'
      ],
      method: [
          'In a large saucepan, fry the chicken breast with two tablespoons of Cajun seasoning until cooked through. Remove from the saucepan and set to one side.',
          'With more Fry Light add the peppers and onion and rest of the Cajun seasoning. Cook until soft.',
          'Pour in the pasta and then add chicken stock until the pasta is just covered.',
          'Reduce the heat and simmer, stirring regularly. As the stock reduces continue adding more, little by little, until the pasta is cooked and the chicken stock has thickened to a shiny sauce coating the pasta. Mix in the chicken.',
          'Remove the pasta from the heat.',
          "Mix together the egg, quark and cheese if you're using it. Pour into the pasta and quickly begin to mix this into the pasta making sure to coat it all. Continue to mix until the sauce thickens, this is how you know the egg has cooked.",
          'Portion out the pasta and top with a small spoon of quark and a sprinkling of Cajun seasoning.',
          'Enjoy straight away!'
      ]
    }

    const res = await axios.post('/api/test', recipe);
    console.log("The server is working! Here's the response:")
    console.log(res.data);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <button onClick={this.fire}>Test API connection</button>
          <Route path="/" exact component={Landing} />
          <Route path="/test" exact component={Test} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
