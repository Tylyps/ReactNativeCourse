import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get('window').width /
        Dimensions.get('window').height *
        0.0122,
    },
    locationChosen: false
  }

  pickLocationHandler = event => {
    const { focusedLocation } = this.state;
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    this.setState(prevState => ({
      focusedLocation: {
        ...prevState.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      locationChosen: true
    }));
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    }, err => {
      console.log(err);
      alert("Fetching the Position failed, please pick one manually!");
    });
  }

  render() {
    const { focusedLocation, locationChosen } = this.state;
    let marker = null;

    if (locationChosen) {
      marker = <MapView.Marker coordinate={focusedLocation} />
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.getLocationHandler} />
        </View>
      </View>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    margin: 8,
  },
  map: {
    width: '100%',
    height: 250,
  },
});

export default PickLocation;
