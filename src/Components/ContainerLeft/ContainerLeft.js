import React from 'react';
import presentationImage from '../../pictures/bg-castle.jpg';
import Map from '../GoogleMaps/Map';

// Import css du composant ContainerLeft
import './ContainerLeft.css';

const ContainerLeft = () => {
    return(
        <div className="container-left">
            <div className="perche-picture">
                <img src={ presentationImage } alt="Château Saint-Jean présentant le site Perch'Advisor" />
            </div>
            <div className="map" id="map"> 
                <Map />
            </div>
        </div>
    )
}

export default ContainerLeft;