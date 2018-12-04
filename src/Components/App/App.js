import React, { Component } from 'react';

// Import librairies axios, styled-components
import Axios from 'axios';
import styled from 'styled-components';

// Import des composants Map , RestaurantContainer, Restaurantitem
import Map from '../GoogleMaps/Map';
import RestaurantContainer from '../RestaurantContainer/RestaurantContainer';
import RestaurantItem from '../RestaurantItem/RestaurantItem';

// Import image
import presentationImage from '../../pictures/bg-castle.jpg';

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

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        restaurants: []
    };
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

  render () {

    const { restaurants } = this.state;

    const restaurantsLatitude = restaurants.map(restaurant => restaurant.lat);
    const restaurantsLongitude = restaurants.map(restaurant => restaurant.lng);

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
        />
    ));

    return (

        <StyledApp className="app">

            <StyledContainerLeft className="container-left">
              <div className="perche-picture">
                <img src={ presentationImage } alt="Château Saint-Jean présentant le site Perch'Advisor" />
              </div>
              <div className="map" id="map"> 
                <Map
                    latitude={ restaurantsLatitude }
                    longitude={ restaurantsLongitude }
                />
              </div>
            </StyledContainerLeft>

            <StyledContainerRight className="container-right">
                <RestaurantContainer 
                    restaurantsList={ restaurantsList }
                />
            </StyledContainerRight>

        </StyledApp>

    )

  }

}

export default App;