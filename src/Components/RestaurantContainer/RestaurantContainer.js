import React, { Component, Fragment } from 'react';

// Import librairie styled-components
import styled from 'styled-components';

// Import du composant Filter
import Filter from '../Filter/Filter';

const StyledListRestaurants = styled.div`
    height: 60%;
    overflow-y: scroll;
`

class RestaurantContainer extends Component {

    constructor(props){
        super(props)
    }



    render () {
            
        return (
            <Fragment>
                <h1>Perch'Advisor</h1>
                <Filter />
                <StyledListRestaurants className="list-restaurants">
                    { this.props.restaurantsList }
                    { this.props.handleClickForm }
                </StyledListRestaurants>
            </Fragment>
        )

    }
}

export default RestaurantContainer;