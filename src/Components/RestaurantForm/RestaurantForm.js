import React, { Component } from 'react';

// Import librairies react-stars, styled-components, prop-types
import ReactStars from 'react-stars';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Import image
import redMarker from '../../pictures/red-marker.png';

const StyledBgForm = styled.div`
    width: 100%;
    height: 100%;
    z-index: 9;
    top: 0;
    position: absolute;
    left: 0;

    .blur { 
        width: 100%;
        height: 100%;
        background-color: #EFEEE7;
        z-index: 10;
        opacity: .8;
    }
`

const StyledRestaurantForm = styled.form`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    padding: 0 3rem;
    max-width: 630px;
    min-width: 320px;
    height: auto;
    visibility: visible;
    background-color: #ffffff;
    transform: translateX(-50%) translateY(-50%);
    z-index: 15;
    border: 1px solid #9A643D;

    .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5rem 1rem;
        font-size: 3.5rem;
        color: #9A643D;
        font-family: Arial Narrow, sans-serif;
        font-weight: lighter;
        transition: .5s;
        cursor: pointer;

        &:hover {
            transition: .5s;
            color: #523A28;
        }
    }

    > h2 {
        font-size: 2rem;
        color: #9A643D;
        padding: 3rem 0 1rem;
        text-transform: uppercase;
    }

    input[type=text], textarea {
        display: block;
        padding: 2rem 0;
        width: 100%;
        border: none;
        border-bottom: 1px solid rgba(0,0,0,.1);
        color: #858585;
        text-transform: uppercase;
        &::placeholder {
            transform: translateY(0px);
            transition: .5s;
            color: #858585;
        }
        &:hover, &:focus, &:active:focus {
          color: #9A643D;
          outline: none;
          border-bottom: 1px solid #9A643D;
          &::placeholder {
            color: #9A643D;
            position: relative;
            transform: translateY(-20px);
          }
        }
    }

    .name, .address, .comment-title, .comment {
        color: #858585;
        transition: .5s;
        font-size: 0.9rem;
    }

    .name, .address, .comment-title {
        height: 6rem;
    }

    .restaurant-stars {
        margin: 2rem 0 0;
    }

    .comment {
        height: 7rem;
    }

    .submit-form {
        cursor: pointer; 
        border: none;
        margin-top: 2rem;
        text-transform: uppercase;
        color: #ffffff;
        background:#9A643D;
        transition: .5s;
        width: 100%;
        height: 4rem;
        font-size: 0.9rem;

        &:hover {
            transition: .5s;
            background-color: #523A28;
        }
    }
`

class RestaurantForm extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            name: '', 
            address: '', 
            stars: 0,
            commentTitle: '',
            comment: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNewRating = this.handleNewRating.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Manipulation des inputs du formulaire
    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name =  target.name;
        this.setState({
            [name] : value
        });
    }
    
    // Gestion des stars
    handleNewRating = newrating => this.setState({ stars: newrating });

    // Envoie des props via le formulaire et activation du marker
    handleSubmit = event => {
        const { name, address, stars, commentTitle, comment } = this.state;
        event.preventDefault();
        this.props.onAddRestaurant(name, address, stars, commentTitle, comment);
        this.newMarker(this.props.dataMapNewMarker, this.props.dataLatLngNewMarker); 
    }

    // Ajout d'un marker au click
    newMarker = (map, latLng) => {
        this.newMarker = new window.google.maps.Marker({
            map: map,
            position: latLng,
            icon: redMarker
        });
    }

    render() {

        const { stars } = this.state;

        return (
            <StyledBgForm className="bg-form">
                <div className="blur"></div>
                <StyledRestaurantForm>
                    <p onClick={this.props.onClose} className="close">x</p>
                    <h2>Ajouter un restaurant</h2>
                    <input 
                        type="text" 
                        className="name"
                        name="name"
                        placeholder="Nom du restaurant"
                        onChange={ this.handleInputChange }
                    />
                    <input 
                        type="text" 
                        className="address"
                        name="address"
                        placeholder="Adresse du restaurant"
                        onChange={ this.handleInputChange }
                    />
                    <ReactStars
                        className="restaurant-stars"
                        count={ 5 }
                        value={ stars }
                        onChange={ this.handleNewRating }
                        size={ 24 }
                        color1={ '#EFEEE7' }
                        color2={ '#ffd700' }
                        half={ false }
                    />
                    <input 
                        type="text" 
                        className="comment-title"
                        name="commentTitle"
                        placeholder="Titre de l'avis"
                        onChange={ this.handleInputChange }
                    />
                    <textarea 
                        className="comment"
                        name="comment"
                        placeholder="Veuillez saisir un avis..."
                        onChange={ this.handleInputChange } 
                    />
                    <button 
                        className="submit-form"
                        onClick={ this.handleSubmit }
                    >
                        Envoyer
                    </button>
                </StyledRestaurantForm>
            </StyledBgForm>
        )

    }

}


RestaurantForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddRestaurant: PropTypes.func.isRequired
    // dataMapNewMarker: propTypes.number.isRequired,
    // dataLatLngNewMarker: propTypes.
}


export default RestaurantForm;