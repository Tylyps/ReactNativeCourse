import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

class PlaceInput extends Component {

  state = {
    placeName: "",
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
    this.props.onPlaceAdded(this.state.placeName)
  };


  render() {
    const { placeName } = this.state;
    return (
        <View style={styles.PlaceInput}>
        <TextInput
          placeholder="An awesome place"
          value={placeName}
          onChangeText={this.placeNameChangedHandler}
          style={styles.placeInput}
        />
        <Button
          title="Add"
          style={styles.placeButton}
          onPress={this.placeSubmitHandler}
        />
      </View>
    )
  };

};

const styles = StyleSheet.create({
  PlaceInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  placeInput: {
    width: "70%",
  },
  placeButton: {
    width: "30%",
  },
});

export default PlaceInput;
