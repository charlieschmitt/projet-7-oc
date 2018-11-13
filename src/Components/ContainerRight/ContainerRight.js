import React from 'react';

// Import css du composant ContainerRight
import './ContainerRight.css';

// Import du composant Filter
import Filter from '../Filter/Filter';
import List from '../List/List';

const ContainerRight = () => {
    return(
        <div className="container-right">
            <h1>Perch'Advisor</h1>
            <Filter />
            <List />
        </div>
    )
}

export default ContainerRight;