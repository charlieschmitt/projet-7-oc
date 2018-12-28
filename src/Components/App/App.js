import React, { Component } from 'react';

// Import librairies react-stars,, styled-components
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
            isAddRestaurant: false,
            isAddRestaurantByUser: false,
            newRestaurants: [],
            dataNewLat: 0,
            dataNewLng: 0,
            dataMap: '',
            dataLatLng: '',
            dataMinSelect: 1, 
            dataMaxSelect: 5
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addRestaurantByForm = this.addRestaurantByForm.bind(this);
        this.infosMarker = this.infosMarker.bind(this);
    }
    
    // Ouverture du formulaire
    openModal = () => {
        this.setState({
            isAddRestaurant: true
        });
    }
    
    // Fermeture du formulaire
    closeModal = () => {
        this.setState({
            isAddRestaurant: false
        });
    }
    
    // Manipulation / mis à jour de la latitude et la longitude des restaurants googlePlaces et restaurantForm
    handleLatLng = (lat, lng) => {
        this.setState({
            dataNewLat: lat,
            dataNewLng: lng
        });
    }
    
    // Restaurants ajoutés via Google Places
    addRestaurantByGooglePlaces = (index, name, address, reviews) => {
        const { newRestaurants, dataNewLat, dataNewLng} = this.state;
        let tmpRestaurant = [];
        tmpRestaurant.index = index;
        tmpRestaurant.name = name;
        tmpRestaurant.address = address;
        tmpRestaurant.lat = dataNewLat;
        tmpRestaurant.lng = dataNewLng;
        tmpRestaurant.reviews = reviews;
        this.setState({
            newRestaurants : [...newRestaurants, tmpRestaurant]
        });
    }
    
    // Ajout d'un restaurant par le user
    addRestaurantByForm = (name, address, stars, commentTitle, comment) => {
        const { newRestaurants, dataNewLat, dataNewLng} = this.state;
        let tmpRestaurant = [];
        tmpRestaurant.name = name;
        tmpRestaurant.address = address;
        tmpRestaurant.lat = dataNewLat;
        tmpRestaurant.lng = dataNewLng;
        //let reviews = [rating, author_name, text];
        //tmpRestaurant.reviews = reviews;
        tmpRestaurant.stars = stars;
        tmpRestaurant.commentTitle = commentTitle;
        tmpRestaurant.comment = comment;
        this.setState({
            isAddRestaurant: false,
            isAddRestaurantByUser: true,
            newRestaurants : [...newRestaurants, tmpRestaurant]
        });
    }
    
    // Obtention des infos concernant le marker à ajouter
    infosMarker = (map, latLng) => {
        this.setState({
            dataMap: map,
            dataLatLng: latLng
        });
    }

    handleMinMaxValueSelect = (minValue, maxValue) => {
        this.setState({
            dataMinSelect: minValue, 
            dataMaxSelect: maxValue
        }, () => console.log(this.state.dataMinSelect, this.state.dataMaxSelect));
    }

    render () {

    const { newRestaurants, isAddRestaurant, isAddRestaurantByUser, dataMap, dataLatLng } = this.state;

    const renderNewRestaurants = newRestaurants.map(({index, name, address, lat, lng, reviews, stars, commentTitle, comment}) => {
            return <StyledRestaurantItem 
                className="restaurant-item"
                key={ index }
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

                {
                    reviews === undefined 
                    ? null
                    : 
                    reviews.slice(0, 2).map(review => review.rating < this.state.dataMinSelect || review.rating > this.state.dataMaxSelect
                        ? null
                        :
                        <StyledBottomInformation className="bottom-information">
                            <div className="stars-rating">
                                <ReactStars
                                    count={ 5 }
                                    value={ review.rating }
                                    size={ 24 }
                                    color1={ '#EFEEE7' }
                                    color2={ '#ffd700' }
                                    half={ false }
                                    edit={ false }
                                />
                            </div>
                            <p className="commentary">
                                <span><strong>{ review.author_name }</strong></span>
                                { review.text }
                            </p>
                        </StyledBottomInformation>
                    )
                }
                
                {/*
                    isAddRestaurantByUser
                    ? 
                    <StyledBottomInformation className="bottom-information">
                        <div className="stars-rating">
                            <ReactStars
                                count={ 5 }
                                value={ stars }
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
                    </StyledBottomInformation>
                    : null
                */}
                
            </StyledRestaurantItem>
    });

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
                    restaurantAddedByUser={ renderNewRestaurants }
                    getMinMaxValueSelect={ this.handleMinMaxValueSelect }

                />
            </StyledContainerRight>

        </StyledApp>
    )

  }

}

export default App;