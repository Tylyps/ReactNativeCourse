import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';
import { getPlaces } from '../../store/actions/index';

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange",
  };

  state = {
    placesLoaded: false,
    removeButtonAnim: new Animated.Value(1),
    listAnim: new Animated.Value(0)
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  };

  onNavigatorEvent = event => {
    if (event.type === "ScreenChangedEvent" && event.id === "willAppear") {
      this.props.onLoadPlaces();
    }

    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left",
        });
      }
    }

  };

  itemSelectedHandler = key => {
    const selectedPlace = this.props.places.find(place => place.key === key);
    this.props.navigator.push({
      screen: "awsome-places.PlaceDetailScreen",
      title: selectedPlace.name,
      passProps: {
        selectedPlace,
      },
    });
  };

  placesSearchHandler = () => {
    const { removeButtonAnim } = this.state;
    Animated.timing(removeButtonAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
  };

  placesLoadedHandler = () => {
    const { listAnim } = this.state;
    Animated.timing(listAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

  };

  render () {
    const { placesLoaded, removeButtonAnim, listAnim } = this.state;
    const { places } = this.props;
    const loadButton = (
      <Animated.View
        style={{
          opacity: removeButtonAnim,
          transform: [
            {
              scale: removeButtonAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1],
              }),
            },
          ],
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    const animatedPlaceList = (
      <Animated.View
        style={{
          opacity: listAnim,
          transform: [
            {
              translateX: listAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1000, 0],
              }),
            },
          ],
        }}
      >
        <PlaceList places={places} onItemSelected={this.itemSelectedHandler}/>
      </Animated.View>
    );

    return (
      <View style={placesLoaded ? null : styles.buttonContainer}>
        {placesLoaded
          ? animatedPlaceList
          : loadButton
        }
      </View>
    );
  };
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    borderColor: "orange",
    borderWidth: 3,
    borderRadius: 50,
    padding: 20,
  },
  searchButtonText: {
    color: "orange",
    fontWeight: 'bold',
    fontSize: 26,
  },
});

const mapDispatchToProps = dispatch => ({
  onLoadPlaces: () => dispatch(getPlaces()),
});

const mapStateToProps = state => ({
  places: state.places.places,
});

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);
