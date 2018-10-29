import React, { Component } from 'react';
import moulinVilleray from '../../pictures/mill-villeray.jpg'

// Import css du composant Filter
import './List.css';

export default class List extends Component {
    render() {
        return(
            <div className="list-restaurants">
                <div className="top-information">
                    <p className="restaurant-name">Moulin de Villeray</p>
                    <p className="restaurant-address">Domaine de Villeray</p>
                </div>
                <div className="restaurant-picture">
                    <img src={ moulinVilleray } alt="" />
                </div>
                <div className="bottom-information">
                    <div className="star-rating">
                    </div>
                    <p className="commentary">Très bon restaurant, tant au niveau de la qualité que de la quantité !</p>
                </div>
            </div>
        )
    }
}