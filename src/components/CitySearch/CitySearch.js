import React from 'react';
import classes from './CitySearch.module.css';
import '../../components/UI/SimpleButton.css';

export default function CitiesExplore (props)  {

    let unknownCoordMsg = null;
    if (props.unknownCoord)
        unknownCoordMsg = (<p>We don't know the coordinates of this</p>);

    return (
            <section className={classes.citySearch}>
                <h1>Build a tour with your preferred cities</h1>
                <input  
                    type='text' 
                    onChange={props.handleInputCityChange} 
                    className={classes.cityInput}
                /> 
                <button
                    type="button"
                    onClick={props.handleAddCityClick}
                    className={"simpleButton " + classes.citySearchButton}
                  > 
                    Add city 
                </button>
                <button
                    type="button"
                    onClick={props.handleShowCitiesListClick}
                    className={"simpleButton " + classes.citySearchButton}
                  > 
                    See the chosen cities
                </button>
                <p>Total distance: <b>{props.totalDistanceKm.toFixed(2)} km</b> </p>
                {unknownCoordMsg}
                <div> 
                    <b>Tip: </b>
                    <span>If you are logged in, you can click on a place on the map to give it a heart</span>
                </div>
            </section>
    );
}
