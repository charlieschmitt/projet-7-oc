import React, { Component, Fragment } from 'react';

// Import librairie prop-types
import PropTypes from 'prop-types';

// Import image
import redMarker from '../../pictures/red-marker.png';
import brownMarker from '../../pictures/brown-marker.png';

class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentLating: {
                lat: [], 
                lng: []
            },
            allMarker: ''
        }
        this.map = '';
        this.marker = '';
        this.service = '';
        this.newMarker = '';
    }

    componentDidMount() {
        this.showCurrentLocation()
    }

    // Obtention de la position exacte du user sur la map
    showCurrentLocation = () => {
        // API geolocalisation
        if(navigator.geolocation){
            // Récupérer les positions actuelles du user
            navigator.geolocation.getCurrentPosition(
                position => {
                    // Mis à jour des positions
                    this.setState({
                        currentLating: {
                            lat: [position.coords.latitude],
                            lng: [position.coords.longitude]
                        }
                    }, this.renderMap() )
                }
            )
        }
    }
    
    // Rendu de la map
    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCO_5DP0c2nkvFhOGG9EwyAUIo4ebiW2qA&callback=initMap&libraries=places")
        window.initMap = this.initMap
    }
    
    // Initialisation de la map et des markers
    initMap = () => {
        const { currentLating } = this.state;

        // Mise en place de la map
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: +currentLating.lat[0], lng: +currentLating.lng[0] },
            zoom: 11
        });
        
        // Création du marker => position user
        this.marker = new window.google.maps.Marker({
            position: { lat: +currentLating.lat[0], lng: +currentLating.lng[0] },
            map: this.map,
            icon: brownMarker
        });
        
        // Mise en place du click sur la map
        this.map.addListener('click', e => {
            this.props.getLatLng(e.latLng.lat(), e.latLng.lng());
            this.props.onOpen();
            this.props.getMarker(this.map, e.latLng);
        });

        // Ajout de nouveaux restaurants et de nouveaux avis
        this.service = new window.google.maps.places.PlacesService(this.map);
        // Restaurant(s) à 5 kilomètres autour de ma position
        this.service.nearbySearch({
            location: { lat: +currentLating.lat[0], lng: +currentLating.lng[0] },
            radius: 3000,
            type: ['restaurant']
        }, this.callback);
    }
    
    // Envoie des restaurants à partir d'une zone de recherche
    callback = (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                this.addMarker(results[i].geometry.location);
            }
            this.addRestaurants(results);
        }
    }
    
    // Ajout d'un marker au click
    addMarker = latLng => {
        const { allMarker } = this.state;

        this.newMarker = new window.google.maps.Marker({
            map: this.map,
            position: latLng,
            icon: redMarker
        });

        this.setState({
            allMarker: [...allMarker, this.newMarker]
        });
    }

    // Ajout des restaurants via Google Places
    addRestaurants = results => {
        for(let i = 0; i < results.length; i++){
            this.service.getDetails(results[i], (result, status) => {
                if(status === window.google.maps.places.PlacesServiceStatus.OK) {
                    this.props.getLatLng(result.geometry.location.lat(), result.geometry.location.lng());
                    this.props.getRestaurantsGooglePlaces(i, result.name, result.vicinity, result.reviews);
                }
            });
        }
    }

    render() {
        
        return (
            <Fragment></Fragment>
        )
    
    }

}

function loadScript(url) {
    let index = window.document.getElementsByTagName('script')[0];
    let script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}

Map.propTypes = {
    onOpen: PropTypes.func.isRequired, 
    getMarker: PropTypes.func.isRequired,
    getLatLng: PropTypes.func.isRequired,
    getRestaurantsGooglePlaces: PropTypes.func.isRequired
}

export default Map;