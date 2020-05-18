import React, { Component } from 'react';
import { Map, Polyline, TileLayer, Marker, Popup } from "react-leaflet";
import data from '../../containers/cities';
import { heartIcon } from '../../utils/Icon';
import { connect } from 'react-redux';

class CustomMap extends Component {

  state = {
    center: [51.5074, 0.1278],
    zoom: 1,
    personalMarkers: [],
  }

  focusOnNewLocation(locationName) {
    const location = locationName.toLowerCase().trim();

    const cities = data.cities.filter((city) => {
      return location === city.name.toLowerCase() || location === city.country.toLowerCase();
    });
    if (cities.length) {
      const center = cities[0].coordinates;
      const zoom = 4;
      this.setState({
        center,
        zoom
      })
    }
  }

  componentWillMount() {
    this.focusOnNewLocation(this.props.initialLocation);
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.focusOnNewLocation(nextProps.location);
  }

  addMarker = (e) => {
    if(this.props.auth.uid) {
      const personalMarkers = [...this.state.personalMarkers];
      personalMarkers.push(e.latlng);
      this.setState({ personalMarkers });
    }
  }

  render() {
    return (
      <Map
        style={{ height: "480px", width: "100%", zIndex: "90" }}
        zoom={this.state.zoom}
        center={this.state.center}
        minZoom={1}
        maxBounds={[[-90, -180], [90, 180]]}
        onClick={this.addMarker}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

        />

        {this.props.chosenCities.map((city, idx) => {
          return (
            <Marker key={`marker-${idx}`} position={city.coordinates}>
              <Popup>
                <span> {city.name} <br /> Population: {city.population} </span>
              </Popup>
            </Marker>
          )
        }
        )}

        {this.state.personalMarkers.map((cityCoordinates, idx) => {
          return (
            <Marker 
            key={`personalMarker-${idx}`} 
            position={cityCoordinates} 
            icon={heartIcon}>
              {/* <Popup>
                <span> {city.name} <br /> Population: {city.population} </span>
              </Popup> */}
            </Marker>
          )
        }
        )}
        <Polyline
          color="purple"
          positions={this.props.chosenCities.map((city) => city.coordinates)}
        />

      </Map>
    );
  }
}

const mapStateToProps = state => {
  return {
      auth: state.firebase.auth
      };
}

export default connect(mapStateToProps, null)(CustomMap);
