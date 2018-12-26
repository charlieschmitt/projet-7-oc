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
            newrating: null,
            isAddView: false,
            newViews: [], 
            minValue: 0,
            maxValue: 0
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
    }

    // Gestion des stars
    handleNewRating = newrating => {
        this.setState({
            newrating
        });
    }

    // Valeur du premier select
    firstValueSelect = value => {
        this.setState({
            minValue: value
        });
    }

    // Valeur du second select
    secondValueSelect = value => {
        this.setState({
            maxValue: value
        });
    }
    
    // Ouverture du formulaire
    openModal = () => {
        this.setState({
            isAddView: true
        });
    }
    
    // Fermeture du formulaire
    closeModal = () => {
        this.setState({
            isAddView: false
        });
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
        });
    }
    
    // Rendu d'un avis ajouté par le user
    renderView = () => {
        const { newViews } = this.state;
        return newViews.map(({ stars, commentTitle, comment }) => {
            //console.log(id)
            return (
                <div key={ stars }>
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
                </div>
            )
        });
    }

    // Filtrage des stars
    intervalValue(number){
        if((this.state.minValue <= number) && (this.state.maxValue >= number)){
            return
        }

    }
    
    /*
    restaurantsList = () => {

        const { restaurants } = this.state;

        restaurants.filter(this.intervalValue(ratings)).map(({ id, restaurantName, address, lat, lng, ratings }) => 

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
        
        );
            
    }
    */

    render () {
        
        const { restaurants, key } = this.state;

        const restaurantsList = restaurants./*filter(this.intervalValue(ratings)).*/map(({ id, restaurantName, address, lat, lng, ratings }) => 
            
            <RestaurantItem 
                key={ id }
                id={ key }
                restaurantName={ restaurantName }
                address={ address }
                streetViewImage={ `https://maps.googleapis.com/maps/api/streetview?size=700x250&location=${lat},${lng}
                                   &fov=90&heading=235&pitch=10
                                   &key=AIzaSyCO_5DP0c2nkvFhOGG9EwyAUIo4ebiW2qA` }
                stars={ ratings[0].stars }
                commentTitle={ ratings[0].commentTitle }
                comment={ ratings[0].comment }
                onOpen={ this.openModal }
                restaurantAddedByUser
                viewAddedByUser={ this.renderView }
            />

        ); 

        return (
            <Fragment>
                <h1>Perch'Advisor</h1>
                <Filter 
                    firstSelect={ this.firstValueSelect }
                    secondValue={ this.secondValueSelect }
                />
                <StyledListRestaurants className="list-restaurants">
                    { restaurantsList }
                    { this.props.restaurantAddedByUser() }
                    { 
                        this.state.isAddView ?
                        <ViewForm 
                            onClose={ this.closeModal }
                            onAddView={ this.addView } 
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