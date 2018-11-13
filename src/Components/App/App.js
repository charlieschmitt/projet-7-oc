import React from 'react';

// Import css du composant App
import './App.css';

// Import des deux composants principaux de l'application
import ContainerLeft from '../ContainerLeft/ContainerLeft';
import ContainerRight from '../ContainerRight/ContainerRight';

const App = () => {
  return (
    <div className="app">
      <ContainerLeft />
      <ContainerRight />
    </div>
  )
}

export default App;