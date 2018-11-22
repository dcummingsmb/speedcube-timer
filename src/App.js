import React, { Component } from 'react';
import './App.css';
import Timer from './components/Timer/Timer';

class App extends Component {
  render() {
    return (
      <div className='center'>
        <h1>Speedcube Timer Component</h1>
        <Timer />
      </div>
    );
  }
}

export default App;