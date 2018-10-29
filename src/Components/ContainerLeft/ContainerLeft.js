import React, { Component } from 'react';
import presentationImage from '../../pictures/bg-castle.jpg';

// Import css du composant ContainerLeft
import './ContainerLeft.css';

export default class ContainerLeft extends Component {
    render() {
        return(
            <div className="container-left">
                <div className="perche-picture">
                    <img src={ presentationImage } alt="Image présentant le site Perch'Advisor" />
                </div>
                <div className="map" id="map"> 
                </div>
            </div>
        )
    }
}