import React, { Component } from 'react';

// Import librairie styled-components
import styled from 'styled-components';

// Import des composants Map, RestaurantForm, RestaurantContainer
import Map from '../GoogleMaps/Map';
import RestaurantForm from '../RestaurantForm/RestaurantForm';
import RestaurantContainer from '../RestaurantContainer/RestaurantContainer';

// Import image
import presentationImage from '../../pictures/bg-castle.jpg';
import redMarker from '../../pictures/red-marker.png';

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
            dataLatLng: '',
            minValue: 0,
            maxValue: 5,
            allMarkers: []
        };
        this.newMarker = '';
    }
    
    // Ouverture du formulaire
    // Arrow fx for binding
    openModal = () => this.setState({ isAddRestaurant: true });
    
    // Fermeture du formulaire
    // Arrow fx for binding
    closeModal = () => this.setState({ isAddRestaurant: false });
    
    // Manipulation / mis à jour de la latitude et la longitude des restaurants googlePlaces et restaurantForm
    // Arrow fx for binding
    handleLatLng = (lat, lng) => {
        this.setState({ 
            dataNewLat: lat, 
            dataNewLng: lng 
        });
    }

    // Ajout d'un marker au click
    // Arrow fx for binding
    addMarker = (index, map, latLng) => {
        const { allMarkers } = this.state;

        this.newMarker = new window.google.maps.Marker({
            map: map,
            position: latLng,
            icon: redMarker, 
            index: index
        });
        
        this.setState({
            allMarkers: [...allMarkers, this.newMarker]
        });
    }

    // Mis à jour des markers
    // Arrow fx for binding
    updateMarkers = newMarker => this.setState({ allMarkers: [...this.state.allMarkers, newMarker ] });
    
    // Modification de l'état du state selon le filtrage des restaurants
    // Arrow fx for binding
    modifyMarkerState = () => {
        const { allMarkers, newRestaurants, minValue, maxValue } = this.state;

        newRestaurants.map(restaurant => {
            if(restaurant.rating < minValue || restaurant.rating > maxValue) {
                for(let i = 0; i < allMarkers.length; i++){
                    restaurant.index === allMarkers[i].index && (allMarkers[i].setMap(null));
                }
            }
            else{
                for(let i = 0; i < allMarkers.length; i++) {
                    restaurant.index === allMarkers[i].index && (allMarkers[i].setMap(restaurant.map));
                }
            }
        });
    }
    
    // Restaurants ajoutés via Google Places
    // Arrow fx for binding
    addRestaurantByGooglePlaces = (index, name, map, location, lat, lng, address, rating, reviews) => {
        const { newRestaurants } = this.state;
        let tmpRestaurant = [];
        tmpRestaurant.index = index;
        tmpRestaurant.name = name;
        tmpRestaurant.map = map;
        tmpRestaurant.address = address;
        tmpRestaurant.lat = lat;
        tmpRestaurant.lng = lng;
        if(rating === undefined) {
            tmpRestaurant.rating = 0
        }
        else {
            tmpRestaurant.rating = Math.round(rating);
        }
        tmpRestaurant.reviews = reviews;
        tmpRestaurant.location = location;
        this.setState({
            newRestaurants: [...newRestaurants, tmpRestaurant]
        });
    }
    
    // Ajout d'un restaurant par le user
    // Arrow fx for binding
    addRestaurantByForm = (name, address, stars, commentTitle, comment, map) => {
        const { newRestaurants, dataNewLat, dataNewLng } = this.state;
        let tmpRestaurant = [];
        tmpRestaurant.index = newRestaurants.length;
        tmpRestaurant.name = name;
        tmpRestaurant.map = map;
        tmpRestaurant.address = address;
        tmpRestaurant.lat = dataNewLat;
        tmpRestaurant.lng = dataNewLng;
        tmpRestaurant.rating = stars;
        tmpRestaurant.reviews = [{ rating: stars, author_name: commentTitle, text: comment }];
        this.setState({
            isAddRestaurant: false,
            newRestaurants: [...newRestaurants, tmpRestaurant]
        });
    }
    
    // Obtention des infos concernant le marker à ajouter
    // Arrow fx for binding
    infosMarker = (map, latLng) => this.setState({ dataMap: map, dataLatLng: latLng });

    // Récupération valeur min select
    // Arrow fx for binding
    handleMinValue = value => this.setState({ minValue: value }, () => this.modifyMarkerState() );

    // Récupération valeur max select
    // Arrow fx for binding
    handleMaxValue = value => this.setState({ maxValue: value }, () => this.modifyMarkerState() );

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
                            getMarkerClick={ this.infosMarker }
                            getLatLngClick={ this.handleLatLng }
                            getRestaurantsGooglePlaces={ this.addRestaurantByGooglePlaces }
                            getInfosMarker={ this.addMarker }
                        />
                    </div>
                    {
                        isAddRestaurant ? 
                        <RestaurantForm
                            onClose={ this.closeModal }
                            onAddRestaurant={ this.addRestaurantByForm }
                            dataMapNewMarker={ dataMap }
                            dataLatLngNewMarker={ dataLatLng }
                            getMarker={ this.updateMarkers }
                            dataIndexMarker={ newRestaurants.length }
                        >
                        </RestaurantForm> 
                        : null
                    }
                </StyledContainerLeft>

                <StyledContainerRight className="container-right">
                    <RestaurantContainer 
                        restaurantAddedByGooglePlacesOrByUser={ newRestaurants }
                        getMinValueSelect={ this.handleMinValue }
                        getMaxValueSelect={ this.handleMaxValue }
                    />
                </StyledContainerRight>

            </StyledApp>
        )

    }

}

export default App;