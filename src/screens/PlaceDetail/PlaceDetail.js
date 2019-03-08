import React, { Component } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component{

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  }

  render() {
    return (
     <View style={styles.container}>
       {this.props.selectedPlace ? (
           <View>
             <Image
               source={this.props.selectedPlace.image}
               style={styles.placeImage}
             />
             <Text style={styles.placeName}>
               {this.props.selectedPlace.name}
             </Text>
           </View>
         ) : null}
       <View>
         <TouchableOpacity onPress={this.placeDeletedHandler}>
           <View style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
             <Icon size={30} name={Platform.OS === 'android' ? "md-trash" : "ios-trash"} color="white" />
           </View>
         </TouchableOpacity>
       </View>
     </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
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
  }
});

const mapDispatchToProps = dispatch => ({
  onDeletePlace: key => dispatch(deletePlace(key))
});

export default connect(null, mapDispatchToProps)(PlaceDetail);
