import React, { Component } from 'react';

// Import css du composant ContainerRight
import './ContainerRight.css';

// Import du composant Filter
import Filter from '../Filter/Filter';
import List from '../List/List';

export default class ContainerRight extends Component {
    render() {
        return(
            <div className="container-right">
                <h1>Perch'Advisor</h1>
                <Filter />
                <List />
            </div>
        )
    }
}