import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Landing from './Landing';
import Test from './Test';
import './App.css';

class App extends React.Component {
  state = {
    apiGreeting: null
  }
  
  componentDidMount = async () => {
    const serverHandshake = await fetch('/api/test') 
    const json = await serverHandshake.json()
    this.setState({
      apiGreeting: json.greeting
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {this.state.apiGreeting}
            <Route path="/" exact component={Landing} />
            <Route path="/test" exact component={Test} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
