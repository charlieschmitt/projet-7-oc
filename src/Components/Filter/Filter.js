import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

// Import css du composant Filter
import './Filter.css';

// Création des options du select
const options = [
  { value: 1, label: '1 étoile' },
  { value: 2, label: '2 étoiles' },
  { value: 3, label: '3 étoiles' },
  { value: 4, label: '4 étoiles'},
  { value : 5, label: '5 étoiles'}
]

// Création des éléments de customisation du select
const customStyles = {

  // Premier élément du select
  control: () => ({
    display: 'flex',
    backgroundColor: '#9A643D'
  }),

  // Couleur du placeholder
  placeholder: () => ({
    color: '#ffffff'
  }),

  // Container select
  container: () => ({
    border: '1px solid #9A643D'
  }),
  
  // Options de la liste déroulante
  option: (provided) => ({
    ...provided,
    backgroundColor: '#ffffff',
    color: '#9A643D',
    padding: 15
  }),

  // Arrière-plan menu
  menu: () => ({
    backgroundColor: '#fffffff'
  }),
  
  // Valeur(s) sélectionnée(s) dans le select
  multiValue: () => ({
    backgroundColor: 'none', 
    color: 'hsl(0,0%,80%)', 
    display: 'flex', 
    margin: '.5rem'
  }),
  
  // Label des Valeurs sélectionnées dans le select
  multiValueLabel: () => ({
    backgroundColor: '#BC8258',
    color: '#ffffff', 
    padding: '.5rem'
  }),

  // Suppresion du label
  multiValueRemove: () => ({
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#BC8258',
      ':hover': {
      backgroundColor: '#523A28'
      },
      padding: '.5rem'
  }),
  
  // Display none message 'Plus d'option(s)'
  noOptionsMessage: () => ({
    display: 'none'
  })

}

class Filter extends Component {
  
  render() {

    return(
      <div className="filter-restaurants">
        <p>Quel type d'établissement recherchez-vous ?</p>
        <Select 
          styles={ customStyles }
          closeMenuOnSelect={ false }
          options={ options } 
          components={ makeAnimated() }
          isMulti={ true }
          placeholder="Sélectionner le nombre d'étoiles"
        />
      </div>
    )

  }
    
}
  
export default Filter;