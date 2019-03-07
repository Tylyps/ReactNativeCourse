import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

class App extends Component {
  state = {
    placeName: '',
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
    this.props.onAddPlace(this.state.placeName)
  };

  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  };

  modalClosedHandler = () => {
    this.props.onDeselectPlace();
  };

  render() {
    const { placeName } = this.state;
    const { places, selectedPlace } = this.props;
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={selectedPlace}
          onModalClose={this.modalClosedHandler}
          onItemDeleted={this.placeDeletedHandler}
        />
        <PlaceInput
          placeName={placeName}
          onChangeText={this.placeNameChangedHandler}
          onPress={this.placeSubmitHandler}
        />
        <PlaceList
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

const mapStateToProps = state => ({
  places: state.places.places,
  selectedPlace: state.places.selectedPlace,
});

const mapDispatchToProps = dispatch => ({
  onAddPlace: (name) => dispatch(addPlace(name)),
  onDeletePlace: () => dispatch(deletePlace()),
  onSelectPlace: (key) => dispatch(selectPlace(key)),
  onDeselectPlace: () => dispatch(deselectPlace()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
