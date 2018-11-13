import React, { Component, Fragment } from 'react';
import MapWithAMarker from './MapWithMarker';

class Map extends Component {
  
  constructor(props) {
    super(props)
    // 
    this.state = {
      // Données latitude - longitude
      currentLating: {
        lat: 0, 
        lng: 0
      }, 
      // Marker map
      isMarkerShown: false
    }
  }
  
  // Obtenir la position exacte du user sur la map
  showCurrentLocation = () => {
    // API geolocalisation
    if(navigator.geolocation){
      // Récupérer les positions actuelles du user
      navigator.geolocation.getCurrentPosition(
        position => {
          // Mis à jour des positions
          this.setState(prevState => ({
            currentLating: {
            ...prevState.currentLating,
            lat: position.coords.latitude,
            lng: position.coords.longitude
            },
            // Passage à true du marker
            isMarkerShown: true
          }))
        }
      )
    }
  }
  
  // Activation des positions avant que l'app se monte
  componentDidMount() {
    this.showCurrentLocation()
  }

  render() {

    return(
      <Fragment>
        <MapWithAMarker
          // Props Marker
          isMarkerShown={ this.state.isMarkerShown }
          // Props Position
          currentLocation={ this.state.currentLating }
        />
      </Fragment>
    )

  }

}

export default Map;