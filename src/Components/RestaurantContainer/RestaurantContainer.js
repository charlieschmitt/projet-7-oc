import React, { Component, Fragment } from 'react';

// Import librairie styled-components
import styled from 'styled-components';

// Import des composants Filter, RestaurantItem, ReviewForm
import Filter from '../Filter/Filter';
import RestaurantItem from '../RestaurantItem/RestaurantItem';
import ReviewForm from '../ReviewForm/ReviewForm';

const StyledListRestaurants = styled.div`
    height: 60%;
    overflow-y: scroll;
`

class RestaurantContainer extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            isAddReview: false,
            minValue: 0,
            maxValue: 5, 
            keyReview: '',
            restaurants : this.props.restaurantAddedByGooglePlacesOrByUser
        }
    }
    
    // Valeur du premier select
    // Arrow fx for binding
    minValueSelect = value => {
        this.setState({ 
            minValue: value 
        }, 
            () => this.props.getMinValueSelect(this.state.minValue)
        );
    }
    
    // Valeur du second select
    // Arrow fx for binding
    maxValueSelect = value => {
        this.setState({ 
            maxValue: value 
        }, 
            () => this.props.getMaxValueSelect(this.state.maxValue)
        );
    }
    
    // Ouverture du formulaire
    // Arrow fx for binding
    openModal = key => this.setState({ isAddReview: true, keyReview: key });
    
    // Fermeture du formulaire
    // Arrow fx for binding
    closeModal = () => this.setState({ isAddReview: false });
    
    // Ajout d'un avis par le user
    // Arrow fx for binding
    addReview = (keyReview, stars, commentTitle, comment) => {

        this.props.restaurantAddedByGooglePlacesOrByUser.map(restaurant => {
            if(keyReview === restaurant.index) {
                let tmpReview = { key: keyReview, rating: stars, author_name: commentTitle, text: comment };
                restaurant.reviews === undefined && ( restaurant.reviews = [] );
                restaurant.reviews.splice(0, 0, tmpReview)
                this.setState({
                    isAddReview : false
                }, 
                    () => this.averageRating(keyReview)
                );
            }
            else {
                return null;
            }
        });

    }

    // Moyenne de la note globale
    // Arrow fx for binding
    averageRating = (keyReview) => {
        this.props.restaurantAddedByGooglePlacesOrByUser.map(restaurant => {
            if(keyReview === restaurant.index) {
                let average = [];
                restaurant.reviews.map(review => average.push(review.rating));
                let amount = 0;
                for(let i = 0; i < average.length; i++) {
                    amount = amount + average[i]
                }
                restaurant.rating = Math.round(amount / average.length);
            }
            else {
                return null;
            }
        });
        this.setState({
            restaurants: this.props.restaurantAddedByGooglePlacesOrByUser
        });
    }
        
    render () {

        const restaurantList = this.props.restaurantAddedByGooglePlacesOrByUser.map(({ index, name, address, lat, lng, rating, reviews, location }) => 
            
            <RestaurantItem 
                key={ index }
                id={ index }
                restaurantName={ name }
                address={ address }
                streetViewImage={ `https://maps.googleapis.com/maps/api/streetview?size=700x250&location=${lat},${lng}
                                   &fov=90&heading=235&pitch=10
                                   &key=AIzaSyCO_5DP0c2nkvFhOGG9EwyAUIo4ebiW2qA` }
                rating={ rating }
                reviews={ reviews }
                minValue={ this.state.minValue }
                maxValue={ this.state.maxValue }
                onOpen={ this.openModal }
                location={ location }
            />

        );
            
        return (
            <Fragment>
                 <h1>Perch'Advisor</h1>
                <Filter 
                    getMinValue={ this.minValueSelect }
                    getMaxValue={ this.maxValueSelect }
                />
                <StyledListRestaurants className="list-restaurants">
                    { restaurantList }
                    { 
                        this.state.isAddReview ?
                        <ReviewForm 
                            onClose={ this.closeModal }
                            onAddReview={ this.addReview } 
                            getKey={ this.state.keyReview }
                        />
                        : null 
                    }
                </StyledListRestaurants>
            </Fragment>
        )
                
    }

}
        
export default RestaurantContainer;