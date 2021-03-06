import React, { Component } from 'react';

// Import librairies react-select, styled-components, prop-types
import Select from 'react-select';
import MakeAnimated from 'react-select/lib/animated';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledFilter = styled.div`
    margin-bottom: 2.5rem;

    > div {
        display: flex;

        > * {
            width: 40%;
            margin-right: 2rem;
        }

    }

    > p {
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    .css-xp4uvy {
        color: #ffffff;
    }

    .css-19bqh2r {
        color: #ffffff;

        &:hover {
            color: #523A28;
        }
    }
`

// Création des options des select
const OPTIONS = [
    { value: 0, label: '0 étoile' },
    { value: 1, label: '1 étoile' },
    { value: 2, label: '2 étoiles' },
    { value: 3, label: '3 étoiles' },
    { value: 4, label: '4 étoiles' },
    { value : 5, label: '5 étoiles' }
]

// Création des éléments de customisation du select
const CUSTOM_STYLES = {
  
    // Premier élément du select
    control: () => ({
        display: 'flex',
        backgroundColor: '#9A643D', 
        cursor: 'pointer'
    }),
    
    // Couleur du placeholder
    placeholder: () => ({
        color: '#ffffff'
    }),
    
    // Options de la liste déroulante
    option: (provided) => ({
        ...provided,
        backgroundColor: '#ffffff',
        color: '#9A643D',
        ':hover' : {
            color: '#523A28', 
            fontWeight: 'bold',
            fontSize: '1.1rem'
        },
        padding: '1rem'
    })
  
}

class Filter extends Component {
  
    constructor(props) {
        super(props)
        this.state = {
            selectedOptionOne: 0, 
            selectedOptionTwo: 5
        }
    }

    // Manipulation du premier select
    // Arrow fx for binding
    handleChangeOne = selectedOptionOne => {
        this.setState({ 
            selectedOptionOne 
        }, 
            () => this.props.getMinValue(selectedOptionOne.value)
        );
    }
    
    // Manipulation du deuxième select
    // Arrow fx for binding
    handleChangeTwo = selectedOptionTwo => {
        this.setState({ 
            selectedOptionTwo
        }, 
            () => this.props.getMaxValue(selectedOptionTwo.value)
        );
    }
  
    render() {
    
        const { selectedOptionOne, selectedOptionTwo } = this.state;

        return(
            <StyledFilter className="filter-restaurants">
                <p>Quel type d'établissement recherchez-vous ?</p>
                <small>* Filtrer les résultats entre 1 et 5 étoiles</small>
                <div>

                    <Select 
                        styles={ CUSTOM_STYLES }
                        options={ OPTIONS } 
                        value={ selectedOptionOne }
                        components={ MakeAnimated() }
                        placeholder="0 étoile"
                        defaultValue={ 1 }
                        onChange={ this.handleChangeOne }
                    />

                    <Select 
                        styles={ CUSTOM_STYLES }
                        options={ OPTIONS } 
                        value={ selectedOptionTwo }
                        components={ MakeAnimated() }
                        placeholder="5 étoiles"
                        defaultValue={ 5 }
                        onChange={ this.handleChangeTwo }
                    />
            
            </div>
            </StyledFilter>
        )
      
    }
    
}

Filter.propTypes = {
    getMinValue: PropTypes.func.isRequired, 
    getMaxValue: PropTypes.func.isRequired,
}
  
export default Filter;