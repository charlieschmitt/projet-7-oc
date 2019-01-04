import React, { Component, Fragment } from 'react';

// Import librairies react-stars, styled-components, prop-types
import ReactStars from 'react-stars';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Import image
import topDesign from '../../pictures/top-design.png';

const StyledRestaurantItem = styled.div`
    margin-bottom: 2.5rem;
    
    .top-design--item {
        display: flex;
        justify-content: center;
        margin-bottom: 2.5rem;
    }

    .restaurant-picture {
        margin-bottom: 1.5rem;
    }

    @media only screen and (max-width: 1350px) {
        .restaurant-picture > img{
            width: 500px;
        }
    }
`

const StyledTopInformation = styled.div`
    display: flex;
    margin-bottom: 2rem;

    .restaurant-name {
        font-size: 1.5rem;
    }

    .restaurant-address {
        justify-content: flex-end;
        display: flex;
        width: 100%;
        font-size: 1.2rem;
        margin-right: 3rem;
    }
`

const StyledBottomInformation = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .stars-rating {
        width: 120px;
    }

    .commentary {
        display: flex;
        flex-wrap: wrap;
        padding: 0 1.5rem;
        margin-top: 1rem;
        width: calc(100% - 120px);

        > span {
            width: 100%;
            margin-bottom: .5rem;

            > strong {
                font-size: 1.3rem;
            }

        }
    }

    button {
        border: .1rem solid #9A643D;
        background-color: #ffffff;
        padding: .4rem 1rem;
        color: #523A28;
        font-size: 1rem;
        margin-top: 2rem;
        cursor: pointer;
        transition: ease-in .5s;

        &:hover {
            background-color: #9A643D;
            color: #ffffff;
            transition: ease-in .5s;
        }
    }
`

class RestaurantItem extends Component {

    constructor(props){
        super(props)
        this.state = {
            keyItem: this.props.id
        }
    }

    // Gestion des stars
    handleNewRating = newrating => this.setState({ newrating });

    render() { 

        return(
            <StyledRestaurantItem className="restaurant-item">

                <div className="top-design--item">
                    <img src={ topDesign } alt="Design de chaque item de restaurant" />
                </div>

                <StyledTopInformation className="top-information">
                    <p className="restaurant-name">{ this.props.restaurantName }</p>
                    <p className="restaurant-address">{ this.props.address }</p>
                </StyledTopInformation>

                <div className="restaurant-picture">
                    <img src={ this.props.streetViewImage } alt="" />
                </div>

                <StyledBottomInformation className="bottom-information">
                {
                    this.props.reviews === undefined 
                    ? null
                    : 
                    this.props.reviews.slice(0, 2).map((review, i) => review.rating < this.props.minValue || review.rating > this.props.maxValue
                        ? null
                        :
                        <Fragment key={ i }>
                            <div className="stars-rating">
                                <ReactStars
                                    count={ 5 }
                                    value={ review.rating }
                                    size={ 24 }
                                    color1={ '#EFEEE7' }
                                    color2={ '#ffd700' }
                                    half={ false }
                                    edit={ false }
                                />
                            </div>
                            <p className="commentary">
                                <span><strong>{ review.author_name }</strong></span>
                                { review.text }
                            </p>
                        </Fragment>
                    )
                }
                {
                    this.props.sendReview.map(review => review.rating < this.props.minValue || review.rating > this.props.maxValue || review.key !== this.props.id
                    ? null
                    :
                        <Fragment key={ review.index }>
                            <div className="stars-rating">
                                <ReactStars
                                    count={ 5 }
                                    value={ review.rating }
                                    size={ 24 }
                                    color1={ '#EFEEE7' }
                                    color2={ '#ffd700' }
                                    half={ false }
                                    edit={ false }
                                />
                             </div>
                            <p className="commentary">
                                <span><strong>{ review.author_name }</strong></span>
                                { review.text }
                            </p>
                        </Fragment>
                    )
                }
                    <button 
                        onClick={ () => this.props.onOpen(this.state.keyItem) } 
                    >
                        Ajouter un avis
                    </button>
                </StyledBottomInformation>

            </StyledRestaurantItem>
        )

    }

}

RestaurantItem.propTypes = {
    restaurantName: PropTypes.string.isRequired, 
    address: PropTypes.string.isRequired, 
    streetViewImage: PropTypes.string.isRequired,
    //reviews: PropTypes.arrayOf().isRequired, 
    id: PropTypes.number.isRequired,
    minValue: PropTypes.number.isRequired, 
    maxValue: PropTypes.number.isRequired,
    onOpen: PropTypes.func.isRequired,
    //sendReview: PropTypes.arrayOf().isRequired
}

export default RestaurantItem;