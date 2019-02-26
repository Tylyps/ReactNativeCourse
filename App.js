import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import InputContainer from './src/components/InputContainer/InputContainer';
import ListContainer from './src/components/ListContainer/ListContainer';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

export default class App extends Component {
  state = {
    placeName: '',
    places: [],
    selectedPlace: null,
  };

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }

    this.setState(prevState => ({
      places: prevState.places.concat({
        key: `${Math.random()}`,
        name: prevState.placeName,
        image: {
          uri: "https://images.pexels.com/photos/1902785/pexels-photo-1902785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        },
      }),
      placeName: "",
    }))
  };

  placeSelectedHandler = key => {
    this.setState(prevState => ({
      selectedPlace: prevState.places.find((place) => place.key === key)
    }));
  };

placeDeletedHandler = () => {
  this.setState(prevState => ({
    places: prevState.places.filter(
      place => place.key !== prevState.selectedPlace.key
    ),
    selectedPlace: null,
  }));
};

  modalClosedHandler = () => {
    this.setState({
      selectedPlace: null,
    });
  };

  render() {
    const { places, placeName } = this.state;
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.state.selectedPlace}
          onModalClose={this.modalClosedHandler}
          onItemDeleted={this.placeDeletedHandler}
        />
        <InputContainer
          placeName={placeName}
          onChangeText={this.placeNameChangedHandler}
          onPress={this.placeSubmitHandler}
        />
        <ListContainer
          places={places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
