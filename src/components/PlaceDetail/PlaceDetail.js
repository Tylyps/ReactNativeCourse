import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native';

const placeDetail = props => (
  <Modal onRequestClose={props.onModalClose} visible={props.selectedPlace !== null} animationType="slide">
    <View style={styles.modalContainer}>
      {props.selectedPlace ? (
          <View>
            <Image
              source={props.selectedPlace.image}
              style={styles.placeImage}
            />
            <Text style={styles.placeName}>
              {props.selectedPlace.name}
            </Text>
          </View>
        ) : null}
      <View>
        <Button title="Delete" onPress={props.onItemDeleted} color="red" />
        <Button title="Close" onPress={props.onModalClose} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200,
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
  }
});

export default placeDetail;
