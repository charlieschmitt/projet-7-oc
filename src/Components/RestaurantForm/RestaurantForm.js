import React, { Component, Fragment } from 'react';

// Import librairies react-stars, styled-components, prop-types
import ReactStars from 'react-stars';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class RestaurantForm extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            name: '', 
            address: '', 
            stars: '',
            commentTitle: '',
            comment: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNewRating = this.handleNewRating.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = event => {
        const value = event.value;
        const name =  event.name;
        this.setState({
            [name] : value
        })
    }
    
    handleNewRating = newrating => {
        console.log(newrating)
    }

    handleSubmit = () => {
        const { name, address, stars, commentTitle, comment } = this.state;
        this.props.addResto(name, address, stars, commentTitle, comment);
    }

    render() {

        const { stars } = this.state;

        return (
            <Fragment>
                <form  
                    className="restaurant-form" 
                    onSubmit={ this.handleSubmit }
                >
                    <h3>Ajouter un restaurant</h3>
                    <div className="top-restaurant--form">
                        <label>
                            Nom :
                            <input 
                                type="text" 
                                name="name"
                                onChange={ this.handleInputChange } 
                            />
                        </label>
                        <label>
                            Adresse :
                            <input 
                                type="text" 
                                name="address"
                                onChange={ this.handleInputChange } 
                            />
                        </label>
                    </div>
                    <div className="view-restaurant--form">
                        <ReactStars
                            count={ 5 }
                            value={ stars }
                            onChange={ this.handleNewRating }
                            size={ 24 }
                            color2={ '#ffd700' }
                        />
                        <label>
                            Titre du commentaire :
                            <input 
                                type="text" 
                                name="comment-title"
                                onChange={ this.handleInputChange } 
                            />
                        </label>
                        <label>
                            Commentaire :
                            <textarea 
                                name="comment"
                                onChange={ this.handleInputChange } 
                            />
                        </label>
                    </div>
                    <input 
                        type="submit" 
                        value="Envoyer" 
                        onClick={ this.handleSubmit }
                    />
                </form>
            </Fragment>
        )

    }

}

RestaurantForm.propTypes = {

}

export default RestaurantForm;