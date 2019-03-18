import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import DefaultInput from '../../components/UI/DefaultInput';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText';
import HeadingText from '../../components/UI/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';


class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: "orange",
  };

  constructor(props) {
    super(props);
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      controls: {
        placeName: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          },
        },
        location: {
          value: null,
          valid: false,
        },
        image: {
          value: null,
          valid: false,
        }
      },
    };
  };

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left",
        });
      }
    }

  };

  placeNameChangedHandler = val => {
    this.setState( prevState => ({
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          value: val,
          valid: validate(val, prevState.controls.placeName.validationRules ),
          touched: true,
        },
      },
    }));
  };

  locationPickedHandler = location => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        location: {
          value: location,
          valid: true,
        }
      }
    }));
  }

  imagePickedHandler = image => {
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        image: {
          value: image,
          valid: true,
        }
      }
    }))
  }

  placeAddedHandler = () => {
    const { controls: { placeName, location, image } } = this.state;

    this.props.onAddPlace(placeName.value, location.value, image.value);
  };

  render () {
    const { controls } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickedHandler} />
          <PickLocation onLocationPick={this.locationPickedHandler} />
          <PlaceInput
            onChangeText={this.placeNameChangedHandler}
            placeData={controls.placeName}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.button}>
            <Button
             disabled={!controls.placeName.valid || !controls.location.valid || !controls.image.valid}
             title="Share the Place!"
             onPress={this.placeAddedHandler}
            />
          </View>
        </View>
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    margin: 8,
  },
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150,
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
});

const mapDispatchToProps = dispatch => ({
  onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
});

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
