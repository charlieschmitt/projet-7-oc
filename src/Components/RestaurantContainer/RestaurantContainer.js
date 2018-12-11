import React, { Component, Fragment } from 'react';

// Import librairies axios, styled-components
import Axios from 'axios';
import styled from 'styled-components';

// Import des composants Filter, RestaurantItem
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
            newResto : {}
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.addView = this.addView.bind(this);
        //this.addComment = this.addComment.bind(this);
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
        .catch((err)=> {})
    }

    openModal = () => {
        this.setState({
            isAddView: true
        })
    }

    closeModal = () => {
        this.setState({
            isAddView: false
        })
    }

    //Fonction qui permet l'ajout d'un restaurant dans un state temporaire pour ajouter au global.
    addView = (stars, commentTitle, comment) => {
        const{ newResto } = this.state
        let tmpResto = newResto;
        tmpResto.stars = stars;
        tmpResto.commentTitle = commentTitle;
        tmpResto.comment = comment;
        this.setState({
            isAddView : false, 
            newResto : tmpResto
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
                //stars={ restaurant.ratings.map((rating) => console.log(rating)) }
                stars={ ratings[0].stars }
                commentTitle={ ratings[0].commentTitle }
                comment={ ratings[0].comment }
                onAddView={ this.openModal }
            />
        ));
            
        return (
            <Fragment>
                <h1>Perch'Advisor</h1>
                <Filter />
                <StyledListRestaurants className="list-restaurants">
                    { restaurantsList }
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

export default RestaurantContainer;