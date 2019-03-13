import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component{
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape",
    });
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  render() {
    const { viewMode } = this.state;
    const { selectedPlace } = this.props;
    const placeLocation = {
      latitude: selectedPlace.location.latitude,
      longitude: selectedPlace.location.longitude,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get('window').width /
        Dimensions.get('window').height *
        0.0122,
    };

    return (
     <View style={[styles.container, viewMode === "portrait" ? styles.portraitContainer : styles.landscapeContainer ]}>
      <View style={styles.placeDetailContainer}>
        <View style={styles.subContainer}>
          <Image
            source={selectedPlace.image}
            style={styles.placeImage}
          />
        </View>
        <View style={styles.subContainer}>
          <MapView
            initialRegion={placeLocation}
            style={styles.map}
            zoomEnabled={false}
            scrollEnabled={false}
          >
            <MapView.Marker coordinate={selectedPlace.location} />
          </MapView>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.placeName}>
            {selectedPlace.name}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
              <Icon size={30} name={Platform.OS === 'android' ? "md-trash" : "ios-trash"} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
     </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1,
  },
  portraitContainer: {
    flexDirection: "column",
  },
  landscapeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeDetailContainer: {
    flex: 2,
  },
  placeImage: {
    width: "100%",
    height: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  deleteText: {
    color: "white",
    fontWeight: "400",
    fontSize: 20,
    marginRight: 15,
  },
  subContainer: {
    flex: 1,
    marginBottom: 5,
  },
});

const mapDispatchToProps = dispatch => ({
  onDeletePlace: key => dispatch(deletePlace(key))
});

export default connect(null, mapDispatchToProps)(PlaceDetail);
