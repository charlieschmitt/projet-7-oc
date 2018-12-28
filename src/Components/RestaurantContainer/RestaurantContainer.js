import React, { Component, Fragment } from 'react';

// Import librairies react-stars, styled-components, prop-types
import ReactStars from 'react-stars';
import styled from 'styled-components';
//import PropTypes from 'prop-types';

// Import des composants Filter, RestaurantItem, ViewForm
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
            newrating: null,
            isAddReview: false,
            newReviews: [], 
            minValue: 1,
            maxValue: 5
        }
        this.minValueSelect = this.minValueSelect.bind(this);
        this.maxValueSelect = this.maxValueSelect.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addReview = this.addReview.bind(this);
        this.renderReview = this.renderReview.bind(this);
    }

    // Gestion des stars
    handleNewRating = newrating => {
        this.setState({
            newrating
        });
    }

    // Valeur du premier select
    minValueSelect = value => {
        this.setState({
            minValue: value
        }, 
            () => this.props.getMinMaxValueSelect(this.state.minValue, this.state.maxValue)
        );
    }

    // Valeur du second select
    maxValueSelect = value => {
        this.setState({
            maxValue: value
        }, 
            () => this.props.getMinMaxValueSelect(this.state.minValue, this.state.maxValue)
        );
    }
    
    // Ouverture du formulaire
    openModal = () => {
        this.setState({
            isAddReview: true
        });
    }
    
    // Fermeture du formulaire
    closeModal = () => {
        this.setState({
            isAddReview: false
        });
    }

    // Ajout d'un avis par le user
    addReview = (stars, commentTitle, comment) => {
        const{ newReviews } = this.state;
        let tmpReview = [];
        tmpReview.stars = stars;
        tmpReview.commentTitle = commentTitle;
        tmpReview.comment = comment;
        this.setState({
            isAddReview : false, 
            newReviews : [...newReviews, tmpReview]
        });
    }
    
    // Rendu d'un avis ajouté par le user
    renderReview = () => {
        const { newReviews } = this.state;
        return newReviews.map(({ stars, commentTitle, comment }) => {
            //console.log(id)
            return (
                <Fragment key={ stars }>
                    <div className="stars-rating">
                        <ReactStars
                            count={ 5 }
                            value={ stars }
                            onChange={ this.handleNewRating }
                            size={ 24 }
                            color1={ '#EFEEE7' }
                            color2={ '#ffd700' }
                            half={ false }
                            edit={ false }
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

    // Filtrage des stars
    /*
    intervalValue(number){
        if((this.state.minValue <= number) && (this.state.maxValue >= number)){
            return
        }
    }
    */
    
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
        
        /*
        const { restaurants, key } = this.state;
        
        const restaurantsList = restaurants.filter(this.intervalValue(ratings)).map(({ id, restaurantName, address, lat, lng, ratings }) => 
            
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
                viewAddedByUser={ this.renderView }
            />

        );
        */ 

        return (
            <Fragment>
                <h1>Perch'Advisor</h1>
                <Filter 
                    minSelect={ this.minValueSelect }
                    maxSelect={ this.maxValueSelect }
                />
                <StyledListRestaurants className="list-restaurants">
                    { this.props.restaurantAddedByUser }
                    { 
                        this.state.isAddReview ?
                        <ReviewForm 
                            onClose={ this.closeModal }
                            onAddReview={ this.addReview } 
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