import React, { Component } from 'react';

// Import librairie prop-types
import PropTypes from 'prop-types';

// Import du composant MapWithAMarker
import MapWithAMarker from './MapWithMarker';

class Map extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      // Données latitude - longitude user et restaurants
      currentLating: {
        lat: [], 
        lng: []
      }, 
      // Marker map
      isMarkerShown: false
    }
  }
  
  // Obtenir la position exacte du user sur la map et concatenation des positions des restaurants
  showCurrentAndRestaurantsLocation = () => {
    // API geolocalisation
    if(navigator.geolocation){
      // Récupérer les positions actuelles du user
      navigator.geolocation.getCurrentPosition(
        position => {
          // Mis à jour des positions
          this.setState({
            currentLating: {
              lat: [position.coords.latitude].concat(this.props.latitude),
              lng: [position.coords.longitude].concat(this.props.longitude)
            },
            isMarkerShown: true
          })
        }
      )
    }
  }
  
  componentDidMount() {
    this.showCurrentAndRestaurantsLocation()
  }

  render() {

    const { isMarkerShown, currentLating } = this.state;

    return(
      <MapWithAMarker
        isMarkerShown={ isMarkerShown }
        currentLocation={ currentLating }
      />
    )

  }

}

Map.propTypes = {
  latitude: PropTypes.arrayOf(PropTypes.number).isRequired, 
  longitude: PropTypes.arrayOf(PropTypes.number).isRequired, 
}

export default Map;