import React, { Component } from 'react';

// Import css du composant App
import './App.css';

// Import des deux composants principaux de l'application
import ContainerLeft from '../ContainerLeft/ContainerLeft';
import ContainerRight from '../ContainerRight/ContainerRight';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContainerLeft />
        <ContainerRight />
      </div>
    )
  }
}

export default App;
