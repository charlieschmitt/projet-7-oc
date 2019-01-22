import React, { Component } from 'react';

// Import librairie styled-components
import styled from 'styled-components';

// Import des composants Map, RestaurantForm, RestaurantContainer
import Map from '../GoogleMaps/Map';
import RestaurantForm from '../RestaurantForm/RestaurantForm';
import RestaurantContainer from '../RestaurantContainer/RestaurantContainer';

// Import image
import presentationImage from '../../pictures/bg-castle.jpg';

const StyledApp = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    > * {
        height: calc(100vh - .5rem);
        padding: 2rem;
    }
`

const StyledContainerLeft = styled.div`
    grid-column: 1 / 2;

    > .perche-picture {
        height: 50%;
        filter: brightness(90%);
        margin-bottom: 1rem;
        overflow: hidden;
    }

    > .map {
        height: calc(50% - 1rem);
        filter: brightness(90%);
    }

    > .perche-picture > img {
        width: 100%;
    }
    
    > margin-top: .5rem;

    @media only screen and (max-width: 1550px) {
        > .perche-picture {
            height: 40%;
        }

        > .map {
            height: calc(60% - 1rem);
            filter: brightness(90%);
        }
    }

    @media only screen and (max-width: 1300px) {
        > .perche-picture {
            height: 35%;
        }

        > .map {
            height: calc(65% - 1rem);
            filter: brightness(90%);
        }
    }
`

const StyledContainerRight = styled.div`

    > * {
        color: #523A28;
    }
    > h1 {
        text-align: center;
        font-size: 5rem;
        margin-bottom: 3rem;
    }
`

class App extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isAddRestaurant: false,
            newRestaurants: [],
            dataNewLat: 0,
            dataNewLng: 0,
            dataMap: '',
            dataLatLng: ''
        };
    }
    
    // Ouverture du formulaire
    // Arrow fx for binding
    openModal = () => this.setState({ isAddRestaurant: true });
    
    // Fermeture du formulaire
    // Arrow fx for binding
    closeModal = () => this.setState({ isAddRestaurant: false });
    
    // Manipulation / mis à jour de la latitude et la longitude des restaurants googlePlaces et restaurantForm
    // Arrow fx for binding
    handleLatLng = (lat, lng) => this.setState({ dataNewLat: lat, dataNewLng: lng });
    
    // Restaurants ajoutés via Google Places
    // Arrow fx for binding
    addRestaurantByGooglePlaces = (index, name, address, reviews) => {
        const { newRestaurants, dataNewLat, dataNewLng } = this.state;
        let tmpRestaurant = [];
        tmpRestaurant.index = index;
        tmpRestaurant.name = name;
        tmpRestaurant.address = address;
        tmpRestaurant.lat = dataNewLat;
        tmpRestaurant.lng = dataNewLng;
        tmpRestaurant.reviews = reviews;
        this.setState({
            newRestaurants: [...newRestaurants, tmpRestaurant]
        });
    }
    
    // Ajout d'un restaurant par le user
    // Arrow fx for binding
    addRestaurantByForm = (name, address, stars, commentTitle, comment) => {
        const { newRestaurants, dataNewLat, dataNewLng } = this.state;
        let tmpRestaurant = [];
        tmpRestaurant.index = newRestaurants.length;
        tmpRestaurant.name = name;
        tmpRestaurant.address = address;
        tmpRestaurant.lat = dataNewLat;
        tmpRestaurant.lng = dataNewLng;
        tmpRestaurant.reviews = [{ rating: stars, author_name: commentTitle, text: comment }];
        this.setState({
            isAddRestaurant: false,
            newRestaurants: [...newRestaurants, tmpRestaurant]
        });
    }
    
    // Obtention des infos concernant le marker à ajouter
    // Arrow fx for binding
    infosMarker = (map, latLng) => this.setState({ dataMap: map, dataLatLng: latLng });

    render () {

        const { newRestaurants, isAddRestaurant, dataMap, dataLatLng } = this.state;

        return (
            <StyledApp className="app">

                <StyledContainerLeft className="container-left">
                    <div className="perche-picture">
                        <img src={ presentationImage } alt="Château Saint-Jean présentant le site Perch'Advisor" />
                    </div>
                    <div className="map" id="map"> 
                        <Map
                            onOpen={ this.openModal }
                            getMarker={ this.infosMarker }
                            getLatLng={ this.handleLatLng }
                            getRestaurantsGooglePlaces={ this.addRestaurantByGooglePlaces }
                        />
                    </div>
                    {
                        isAddRestaurant ? 
                        <RestaurantForm
                            onClose={ this.closeModal }
                            onAddRestaurant={ this.addRestaurantByForm }
                            dataMapNewMarker={ dataMap }
                            dataLatLngNewMarker={ dataLatLng }
                        >
                        </RestaurantForm> 
                        : null
                    }
                </StyledContainerLeft>

                <StyledContainerRight className="container-right">
                    <RestaurantContainer 
                        restaurantAddedByGooglePlacesOrByUser={ newRestaurants }
                    />
                </StyledContainerRight>

            </StyledApp>
        )

    }

}

export default App;