import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';


const inputContainer = (props) => (
  <View style={styles.inputContainer}>
    <TextInput
      placeholder="An awesome place"
      value={props.placeName}
      onChangeText={props.onChangeText}
      style={styles.placeInput}
    />
    <Button
      title="Add"
      style={styles.placeButton}
      onPress={props.onPress}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
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

export default inputContainer;
