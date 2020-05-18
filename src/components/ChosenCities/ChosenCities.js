import React from 'react';
import classes from './ChosenCities.module.css'; 

export default function ChosenCities(props) {

    return (
        <ul className={classes.chosenCities}>
            {
                props.chosenCities.map((city, idx) => {
                    return (
                        <li key={`chosenCity-${idx}`}>
                            <b> {city.name} </b> <br />
                            Coordinates: {city.coordinates[0]},{city.coordinates[1]} <br />
                            Population: {city.population}
                        </li>
                    ); 
                }
            )}
        </ul>
    );

}
