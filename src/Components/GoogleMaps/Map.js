import React, { Component, Fragment } from 'react';
import MapWithAMarker from './MapWithMarker';

class Map extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      currentLating: {
        lat: 0, 
        lng: 0
      }, 
      isMarkerShown: false
    }
  }

  showCurrentLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position.coords);
          this.setState(prevState => ({
            currentLating: {
            ...prevState.currentLating,
            lat: position.coords.latitude,
            lng: position.coords.longitude
            },
            isMarkerShown: true
          }))
        }
      )
    }
  }

  componentDidMount() {
    this.showCurrentLocation()
  }

  render() {

    return(
      <Fragment>
        <MapWithAMarker
          isMarkerShown={ this.state.isMarkerShown }
          currentLocation={ this.state.currentLating }
        />
      </Fragment>
    )

  }

}

export default Map;