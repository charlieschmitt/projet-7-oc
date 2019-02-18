import { Component } from 'react';

// Import librairie prop-types
import PropTypes from 'prop-types';

// Import image
import brownMarker from '../../pictures/brown-marker.png';

class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentLating: {
                lat: [], 
                lng: []
            },
        }
        this.map = '';
        this.marker = '';
        this.service = '';
    }

    componentDidMount() {
        this.showCurrentLocation()
    }

    // Obtention de la position exacte du user sur la map
    showCurrentLocation() {
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
    renderMap() {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCO_5DP0c2nkvFhOGG9EwyAUIo4ebiW2qA&callback=initMap&libraries=places")
        window.initMap = this.initMap
    }
    
    // Initialisation de la map et des markers
    // Arrow fx for binding
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
            this.props.onOpen();
            this.props.getLatLngClick(e.latLng.lat(), e.latLng.lng());
            this.props.getMarkerClick(this.map, e.latLng);
        });

        // Ajout de nouveaux restaurants et de nouveaux avis
        this.service = new window.google.maps.places.PlacesService(this.map);
        // Restaurant(s) à 3 kilomètres autour de ma position
        this.service.nearbySearch({
            location: { lat: +currentLating.lat[0], lng: +currentLating.lng[0] },
            radius: 3000,
            type: ['restaurant']
        }, this.callback);
    }
    
    // Envoie des restaurants à partir d'une zone de recherche
    // Arrow fx for binding
    callback = (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            this.addRestaurants(results);
        }
    }

    // Ajout des restaurants via Google Places
    // Arrow fx for binding
    addRestaurants = results => {
        for(let i = 0; i < results.length; i++){
            this.service.getDetails(results[i], (result, status) => {
                if(status === window.google.maps.places.PlacesServiceStatus.OK) {
                    this.props.getInfosMarker(i, this.map, result.geometry.location);
                    this.props.getRestaurantsGooglePlaces(i, result.name, this.map, result.geometry.location, result.geometry.location.lat(), result.geometry.location.lng(), result.vicinity, result.rating, result.reviews);
                }
            });
        }
    }

    render() {
        return null;
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
    getMarkerClick: PropTypes.func.isRequired,
    getLatLngClick: PropTypes.func.isRequired,
    getRestaurantsGooglePlaces: PropTypes.func.isRequired,
    getInfosMarker: PropTypes.func.isRequired
}

export default Map;