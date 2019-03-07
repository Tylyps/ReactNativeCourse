import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index'


class SharePlaceScreen extends Component {

  placeAddedHandler = placename => {
    this.props.onAddPlace(placename);
  };

  render () {
    return (
      <View>
        <Text>
          On SharePlaceScreen
        </Text>
        <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
      </View>
    );
  };
};

mapDispatchToProps = dispatch => ({
  onAddPlace: (placeName) => dispatch(addPlace(placeName))
});

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
