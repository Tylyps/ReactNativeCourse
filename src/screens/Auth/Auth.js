import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import backgroundImage from '../../assets/background.jpg';

import startMainTabs from '../MainTabs/startMainTabs';
import ButtonWithBackground from "../../components/UI/ButtonWithBackground";
import DefaultInput from "../../components/UI/DefaultInput";
import HeadingText from "../../components/UI/HeadingText";
import MainText from "../../components/UI/MainText";
import validate from '../../utility/validation';


class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          isEmail: true,
        },
        touched: false,
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6,
        },
        touched: false,
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password',
        },
        touched: false,
      },
    },
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

  loginHandler = () => {
    startMainTabs();
  };

  updateInputState = (key, value) => {
    const { controls } = this.state;
    let connectedValue = {};
    if (controls[key].validationRules.equalTo) {
      const equalControl = controls[key].validationRules.equalTo;
      const equalValue = controls[equalControl].value;
      connectedValue = {...connectedValue, equalTo: equalValue };
    };
    if (key === 'password') {
      connectedValue = {...connectedValue, equalTo: value };
    };
    this.setState(prevState => ({
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === 'password'
              ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue)
              : prevState.controls.confirmPassword.valid,
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(value, prevState.controls[key].validationRules, connectedValue),
            touched: true,
          },
        }
      })
    );
  };

  render () {
    const { viewMode, controls } = this.state;
    const isFormValid = controls.confirmPassword.valid && controls.email.valid && controls.password.valid
    let headingText = null;
    if (viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    };

    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4" onPress={() => alert("Hello")}>Switch to Login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your E-Mail Address"
              style={styles.input}
              value={controls.email.value}
              valid={controls.email.valid}
              touched={controls.email.touched}
              onChangeText={(val) => this.updateInputState('email', val)}
            />
            <View style={
              viewMode === 'portrait'
              ? styles.portraitPasswordContainer
              : styles.landscapePasswordContainer
            }>
              <View style={
                viewMode === 'portrait'
                ? styles.portraitPasswordWrapper
                : styles.landscapePasswordWrapper
              }>
                <DefaultInput
                  placeholder="Password"
                  style={styles.input}
                  value={controls.password.value}
                  valid={controls.password.valid}
                  touched={controls.password.touched}
                  onChangeText={(val) => this.updateInputState('password', val)}
                />
              </View>
              <View style={
                viewMode === 'portrait' ?
                styles.portraitPasswordWrapper
                : styles.landscapePasswordWrapper
              }
                >
                <DefaultInput
                  placeholder="Confirm Password"
                  style={styles.input}
                  value={controls.confirmPassword.value}
                  valid={controls.confirmPassword.valid}
                  touched={controls.confirmPassword.touched}
                  onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                />
              </View>
            </View>
          </View>
          <ButtonWithBackground disabled={!isFormValid} color="#29aaf4" onPress={this.loginHandler}>
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    flex: 1,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb',
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  landscapePasswordWrapper: {
    width: "45%",
  },
  portraitPasswordWrapper: {
    width: "100%",
  }
});

export default AuthScreen;
