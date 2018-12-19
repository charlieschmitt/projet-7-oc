import React, { Component, Fragment } from 'react';

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
            addMarker: []
        }
        this.map = '';
        this.marker = '';
        this.newMarker = '';
    }

    componentDidMount() {
        this.showCurrentAndRestaurantsLocation()
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
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCO_5DP0c2nkvFhOGG9EwyAUIo4ebiW2qA&callback=initMap")
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
        
        // Mise en place des markers des restaurants
        this.props.restaurantsInfos.map(restaurant => {
            this.marker = new window.google.maps.Marker({
                position: { lat: +restaurant.lat, lng: +restaurant.lng },
                map: this.map,
                icon: redMarker
            });
        })
        
        // Mise en place du click sur la map
        this.map.addListener('click', e => {
            this.props.onAddRestaurant()
            this.addMarker(e.latLng);
        });

    }
    
    // Ajout d'un marker au click
    addMarker = latLng => {
        const { addMarker } = this.state;

        this.newMarker = new window.google.maps.Marker({
            map: this.map,
            position: latLng,
            icon: redMarker
        });

        this.setState({
            addMarker: [...addMarker, this.newMarker]
        });
    }

    render() {
        
        return (
            <Fragment>
            </Fragment>
        )
    
    }

}

function loadScript(url) {
    let index = window.document.getElementsByTagName('script')[0]
    let script = window.document.createElement('script')
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

export default Map;