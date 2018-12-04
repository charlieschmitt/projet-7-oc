import React from 'react';

// Import librairies recompose, react-google-maps
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapWithMarker = compose(
    withProps({
        // API google maps
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=API_KEY",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => 
    <GoogleMap
        defaultZoom={ 11 }
        center={{ lat: +props.currentLocation.lat[0], lng: +props.currentLocation.lng[0] }}
    >
        { 
            props.isMarkerShown && 
            [...Array(7)].map((x, i) =>
                <Marker 
                    key={ i }
                    position={{ lat: props.currentLocation.lat[i], lng: props.currentLocation.lng[i] }} 
                    onClick={ props.onMarkerClick }
                />
            )
        }
    </GoogleMap>
)

export default MapWithMarker;
