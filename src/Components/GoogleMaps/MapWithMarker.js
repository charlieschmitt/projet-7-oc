import React from 'react';
// Recompose permet de créer des HOC (high-order components)
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapWithMarker = compose(
    withProps({
        // API google maps
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=API_KEY",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => 
    <GoogleMap
        // Props zoom par défaut
        defaultZoom={ 12 }
        // Props localisation actuelle
        center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
    >
        { /* Props Marker selon la position */ }
        { props.isMarkerShown && <Marker position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }} onClick={ props.onMarkerClick } /> }
    </GoogleMap>
)

export default MapWithMarker;
