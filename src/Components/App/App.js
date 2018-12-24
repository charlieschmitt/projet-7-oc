import React, { Component } from 'react';

// Import librairies axios, react-stars,, styled-components
import Axios from 'axios';
import ReactStars from 'react-stars';
import styled from 'styled-components';

// Import des composants Map, RestaurantForm, RestaurantContainer
import Map from '../GoogleMaps/Map';
import RestaurantForm from '../RestaurantForm/RestaurantForm';
import RestaurantContainer from '../RestaurantContainer/RestaurantContainer';

// Import image
import presentationImage from '../../pictures/bg-castle.jpg';
import topDesign from '../../pictures/top-design.png';

const StyledApp = styled.div`
    display: flex;
    height: calc(100vh - 4rem);

    > * {
        height: 100%;
        width: 50%;
        padding: 1rem;
    }
`

const StyledContainerLeft = styled.div`
    > .perche-picture {
        height: 45%;
        filter: brightness(90%);
    }

    > .map {
        height: 55%;
        filter: brightness(90%);
    }

    > .perche-picture > img {
        width: 100%;
        margin-bottom: .5rem;
    }
    
    > margin-top: .5rem;
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

const StyledRestaurantItem = styled.div`
    margin-bottom: 2.5rem;
    
    .top-design--item{
        display: flex;
        justify-content: center;
        margin-bottom: 2.5rem;
    }

    .restaurant-picture{
        margin-bottom: 1.5rem;
    }
`

const StyledTopInformation = styled.div`
    display: flex;
    margin-bottom: 2rem;

    .restaurant-name{
        font-size: 1.5rem;
    }

    .restaurant-address{
        justify-content: flex-end;
        display: flex;
        width: 100%;
        font-size: 1.2rem;
        margin-right: 3rem;
    }
`

const StyledBottomInformation = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .stars-rating {
        width: 120px;
    }

    .commentary {
        display: flex;
        flex-wrap: wrap;
        padding: 0 1.5rem;
        margin-top: 1rem;
        width: calc(100% - 120px);

        > span {
            width: 100%;
            margin-bottom: .5rem;

            > strong {
                font-size: 1.3rem;
            }

        }
    }

    button {
        border: .1rem solid #9A643D;
        background-color: #ffffff;
        padding: .4rem 1rem;
        color: #523A28;
        font-size: 1rem;
        margin-top: 2rem;
        cursor: pointer;
        transition: ease-in .5s;

        &:hover {
            background-color: #9A643D;
            color: #ffffff;
            transition: ease-in .5s;
        }
    }
`

class App extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            restaurants: [],
            isAddRestaurant: false,
            newRestaurants: []
        };
        this.newLat = 0;
        this.newLng = 0;
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addRestaurant = this.addRestaurant.bind(this);
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
    
    // Ouverture du formulaire
    openModal = () => {
        this.setState({
            isAddRestaurant: true
        })
    }
    
    // Fermeture du formulaire
    closeModal = () => {
        this.setState({
            isAddRestaurant: false
        })
    }
    
    // Latitude et longitude du restaurant ajouté
    addLatAndLng = (lat, lng) => {
        this.newLat = lat;
        this.newLng = lng;
    }
    
    // Ajout d'un restaurant par le user
    addRestaurant = (name, address, stars, commentTitle, comment) => {
        const { newRestaurants } = this.state;
        let tmpRestaurant = [];
        tmpRestaurant.name = name;
        tmpRestaurant.address = address;
        tmpRestaurant.lat = this.newLat;
        tmpRestaurant.lng = this.newLng;
        tmpRestaurant.stars = stars;
        tmpRestaurant.commentTitle = commentTitle;
        tmpRestaurant.comment = comment;
        this.setState({
            isAddRestaurant: false,
            addRestaurantIsOk: false,
            newRestaurants : [...newRestaurants, tmpRestaurant]
        });
    }
    
    /*
    // Ajout d'un marker au click
    setNewMarker = (map, latLng) => {
        this.newMarker = new window.google.maps.Marker({
            map: map,
            position: latLng
        });
    }
    */

    // Rendu d'un retaurant ajouté par le user
    renderRestaurant = () => {
        const { newRestaurants } = this.state;
        return newRestaurants.map(({ id, name, address, lat, lng, stars, commentTitle, comment }) => {
            return (
                <StyledRestaurantItem 
                    className="restaurant-item"
                    key={ id }
                >

                    <div className="top-design--item">
                        <img src={ topDesign } alt="Design de chaque item de restaurant" />
                    </div>

                    <StyledTopInformation className="top-information">
                        <p className="restaurant-name">{ name }</p>
                        <p className="restaurant-address">{ address }</p>
                    </StyledTopInformation>

                    <div className="restaurant-picture">
                        <img src={ `https://maps.googleapis.com/maps/api/streetview?size=700x250&location=${lat},${lng}
                                    &fov=90&heading=235&pitch=10
                                    &key=AIzaSyCO_5DP0c2nkvFhOGG9EwyAUIo4ebiW2qA` }
                            alt="" />
                    </div>
                    
                    <StyledBottomInformation className="bottom-information">
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
                    </StyledBottomInformation>
                    
                </StyledRestaurantItem>
            )
        });
    }

  render () {

    const { restaurants, isAddRestaurant } = this.state;

    const restaurantsJSON = restaurants.map(restaurant => restaurant);

    return (
        <StyledApp className="app">

            <StyledContainerLeft className="container-left">
                <div className="perche-picture">
                    <img src={ presentationImage } alt="Château Saint-Jean présentant le site Perch'Advisor" />
                </div>
                <div className="map" id="map"> 
                    <Map
                        restaurantsInfos={ restaurantsJSON }
                        onOpen={ this.openModal }
                        //addMarker={ this.setNewMarker }
                        latAndLngNewRestaurant={ this.addLatAndLng }
                    />
                </div>
                {
                    isAddRestaurant ? 
                    <RestaurantForm
                        onClose={ this.closeModal }
                        onAddRestaurant={ this.addRestaurant }
                        //setNewMarker={ this.setNewMarker }
                    >
                    </RestaurantForm> 
                    : null
                }
            </StyledContainerLeft>

            <StyledContainerRight className="container-right">
                <RestaurantContainer 
                    restaurantUser={ this.renderRestaurant }
                />
            </StyledContainerRight>

        </StyledApp>
    )

  }

}

export default App;