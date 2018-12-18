import React, { Component, Fragment } from 'react';

// Import librairies axios, react-stars, styled-components, prop-types
import Axios from 'axios';
import ReactStars from 'react-stars';
import styled from 'styled-components';
//import PropTypes from 'prop-types';

// Import des composants Filter, RestaurantItem, ViewForm
import Filter from '../Filter/Filter';
import RestaurantItem from '../RestaurantItem/RestaurantItem';
import ViewForm from '../ViewForm/ViewForm';

const StyledListRestaurants = styled.div`
    height: 60%;
    overflow-y: scroll;
`

class RestaurantContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
            restaurants: [],
            isAddView: false,
            newViews : []
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addView = this.addView.bind(this);
        this.renderView = this.renderView.bind(this);
    }

    // Requête GET pour aller chercher data JSON
    componentDidMount() {
        Axios
          .get('http://localhost:3000/data/restaurant.json')
          .then(({ data }) => {
            this.setState({ 
                restaurants: data,
            });
        })
        .catch( err => {} )

        //this.hydrateStateWithSessionStorage();
    }
    
    /*
    // Revoir tuto méthode
    hydrateStateWithSessionStorage() {
        for (let key in this.state) {
          if (sessionStorage.hasOwnProperty(key)) {
            let value = sessionStorage.getItem(key);
            try {
              value = JSON.parse(value);
              this.setState({ [key]: value });
            } catch (e) {
              this.setState({ [key]: value });
            }
          }
        }
    }
    */

    // Gestion des stars
    handleNewRating = newrating => {
        console.log(newrating)
    }
    
    // Ouverture du formulaire
    openModal = () => {
        this.setState({
            isAddView: true
        })
    }
    
    // Fermeture du formulaire
    closeModal = () => {
        this.setState({
            isAddView: false
        })
    }

    // Ajout d'un avis par le user
    addView = (stars, commentTitle, comment) => {
        const{ newViews } = this.state;
        let tmpView = [];
        tmpView.stars = stars;
        tmpView.commentTitle = commentTitle;
        tmpView.comment = comment;
        this.setState({
            isAddView : false, 
            newViews : [...newViews, tmpView]
        }
        /*
        , 
        () => {
            sessionStorage.setItem("newViews", JSON.stringify(newViews));
            sessionStorage.setItem("newView", "");
        }
        */
        );
    }
    
    // Rendu d'un avis ajouté par le user
    renderView = () => {
        const { newViews } = this.state;
        return newViews.map(({ id, stars, commentTitle, comment }) => {
            return (
                <Fragment key={ id }>
                    <div className="stars-rating">
                        <ReactStars
                            count={ 5 }
                            value={ stars }
                            onChange={ this.handleNewRating }
                            size={ 24 }
                            color1={ '#EFEEE7' }
                            color2={ '#ffd700' }
                        />
                    </div>
                    <p className="commentary">
                        <span><strong>{ commentTitle }</strong></span>
                        { comment }
                    </p>
                </Fragment>
            )
        });
    }

    render () {
        
        const { restaurants } = this.state;

        const restaurantsList = restaurants.map(({ id, restaurantName, address, lat, lng, ratings }) => (
            <RestaurantItem 
                key={ id }
                restaurantName={ restaurantName }
                address={ address }
                streetViewImage={ `https://maps.googleapis.com/maps/api/streetview?size=700x250&location=${lat},${lng}
                                   &fov=90&heading=235&pitch=10
                                   &key=AIzaSyCO_5DP0c2nkvFhOGG9EwyAUIo4ebiW2qA` }
                stars={ ratings[0].stars }
                commentTitle={ ratings[0].commentTitle }
                comment={ ratings[0].comment }
                onAddView={ this.openModal }
                viewUser={ this.renderView }
            />
        )); 

        return (
            <Fragment>
                <h1>Perch'Advisor</h1>
                <Filter />
                <StyledListRestaurants className="list-restaurants">
                    { restaurantsList }
                    { this.props.restaurantUser() }
                    { 
                        this.state.isAddView ?
                        <ViewForm 
                            onClose={ this.closeModal }
                            addView={ this.addView } 
                        />
                        : null 
                    }
                </StyledListRestaurants>
            </Fragment>
        )

    }
}

/*
RestaurantContainer.propTypes = {

}
*/

export default RestaurantContainer;