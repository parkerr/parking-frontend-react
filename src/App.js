import React, { Component } from 'react';
import './App.css';
import Spaces from './Spaces';

class App extends Component {
  render() {
    return (
      <div className="App">
       <h4>Available spaces shown in green</h4> 
      <Spaces />
      </div>
    );
  }
}

export default App;

