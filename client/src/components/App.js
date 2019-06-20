import React from 'react';
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
      <div className="App">
        <header className="App-header">
          <p>
            {this.state.apiGreeting}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
