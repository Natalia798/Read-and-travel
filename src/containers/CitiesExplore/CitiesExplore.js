import React, { Component } from 'react';
import classes from './CitiesExplore.module.css';
import data from '../cities';
import CitySearch from '../../components/CitySearch/CitySearch';
import CustomMap from '../../components/CustomMap/CustomMap';
import ChosenCities from '../../components/ChosenCities/ChosenCities';
import { connect } from 'react-redux';
import { getDistanceFromLatLonInKm } from '../../utils/utilities';
import '../../components/UI/SimpleButton.css';
import Modal from '../../components/UI/Modal/Modal';
import '../../components/UI/SimpleButton.css';

class CitiesExplore extends Component {
    state = {
        chosenCities: [],
        location: "",
        unknownCoord: false,
        totalDistanceKm: 0,
        modalVisible: false
    }

    showModal = () => {
        this.setState({ modalVisible: true });
    }
      
    hideModal = () => {
        this.setState({ modalVisible: false });
    }

    componentWillMount() {
        this.handleAddCityClick(this.props.initialLocation);
    }

    handleInputCityChange = (e) => {
        console.log(this.state.location, e.target.value.trim())
        const userInput = e.target.value.trim();
        this.setState({ location: userInput });
    }

    getKmDistanceBetween2Cities = (city1Coord, city2Coord) => {
        const [lat1, long1] = city1Coord;
        const [lat2, long2] = city2Coord;
        return getDistanceFromLatLonInKm(lat1, long1, lat2, long2);
    }

    handleAddCityClick = (city) => {

        const chosenCities = this.state.chosenCities.map(city => ({ ...city }));
        const cityName = city.toLowerCase();
        let unknownCoord = true;
        let totalDistanceKm = this.state.totalDistanceKm;

        const citiesFound = data.cities
            .filter(city => city.name.toLowerCase() === cityName)

        if (citiesFound.length) {
            const cityDetails = citiesFound[0];
            chosenCities.push(cityDetails);
            unknownCoord = false;

            if (chosenCities.length > 1) {
                const lastPosition = chosenCities.length - 2; 
                const prevCity = chosenCities[lastPosition];
                const addedDistance = this.getKmDistanceBetween2Cities(prevCity.coordinates, cityDetails.coordinates);
                totalDistanceKm += addedDistance;
            }
        }
        this.setState({
            chosenCities,
            unknownCoord,
            totalDistanceKm
        });
    }

    render() {
        let modalContent = <p> The list is empty </p>;
        if(this.state.chosenCities.length)
            modalContent = (<ChosenCities chosenCities={this.state.chosenCities} />);

        return (
            <div className={classes.explorationContainer}>
                    <CitySearch 
                        handleInputCityChange={this.handleInputCityChange}
                        handleAddCityClick={() => this.handleAddCityClick(this.state.location)}
                        handleShowCitiesListClick={this.showModal}
                        unknownCoord={this.state.unknownCoord}
                        totalDistanceKm={this.state.totalDistanceKm}
                    />
                    <CustomMap
                        chosenCities={this.state.chosenCities}
                        initialLocation={this.props.initialLocation}
                        location={this.state.location}
                    />
                    <Modal show={this.state.modalVisible} handleClose={this.hideModal} >
                        {modalContent}
                    </Modal>
            </div>
    
        );
    }
}

const mapStateToProps = state => {
    return {
        initialLocation: state.exploration.initialLocation
    };
}

export default connect(mapStateToProps, null)(CitiesExplore);
