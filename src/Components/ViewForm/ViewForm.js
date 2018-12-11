import React, { Component, Fragment } from 'react';

// Import librairies react-stars, styled-components, prop-types
import ReactStars from 'react-stars';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class ViewForm extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
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
        const { stars, commentTitle, comment } = this.state;
        this.props.addResto(stars, commentTitle, comment);
    }

    render() {

        const { stars } = this.state;

        return (
            <Fragment>
                <form  
                    className="view-form" 
                    onSubmit={ this.handleSubmit }
                >
                    <h3>Ajouter un avis</h3>
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

ViewForm.propTypes = {

}

export default ViewForm;