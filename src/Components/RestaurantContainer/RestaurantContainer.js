import React, { Component, Fragment } from 'react';

// Import librairie styled-components
import styled from 'styled-components';

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
            maxValue: 5, 
            keyReview: ''
        }
        this.minValueSelect = this.minValueSelect.bind(this);
        this.maxValueSelect = this.maxValueSelect.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addReview = this.addReview.bind(this);
    }
    
    // Valeur du premier select
    minValueSelect = value => this.setState({ minValue: value });
    
    // Valeur du second select
    maxValueSelect = value => this.setState({ maxValue: value });
    
    // Ouverture du formulaire
    openModal = key => this.setState({ isAddReview: true, keyReview: key });
    
    // Fermeture du formulaire
    closeModal = () => this.setState({ isAddReview: false });
    
    // Ajout d'un avis par le user
    addReview = (keyReview, stars, commentTitle, comment) => {
        const{ newReviews } = this.state;
        let tmpReview = { key: keyReview, rating: stars, author_name: commentTitle, text: comment };
        tmpReview.index = newReviews.length;
        this.setState({
            isAddReview : false, 
            newReviews : [...newReviews, tmpReview]
        });
    }
        
    render () {

        const restaurantList = this.props.restaurantAddedByGooglePlacesOrByUser.map(({ index, name, address, lat, lng, reviews }) => 
            
            <RestaurantItem 
                key={ index }
                id={ index }
                restaurantName={ name }
                address={ address }
                streetViewImage={ `https://maps.googleapis.com/maps/api/streetview?size=700x250&location=${lat},${lng}
                                   &fov=90&heading=235&pitch=10
                                   &key=AIzaSyCO_5DP0c2nkvFhOGG9EwyAUIo4ebiW2qA` }
                reviews={ reviews }
                minValue={ this.state.minValue }
                maxValue={ this.state.maxValue }
                onOpen={ this.openModal }
                sendReview={ this.state.newReviews }
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
                        this.state.isAddReview 
                        ?
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