import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import { tryAuth } from '../../store/actions/index';
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
    authMode: "login",
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
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({
      authMode: prevState.authMode === "login" ? "signup" : "login",
    }));
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape",
    });

  };

  authHandler = () => {
    const { controls, authMode } = this.state;
    const authData = {
      email: controls.email.value,
      password: controls.password.value,
    };
    this.props.onTryAuth(authData, authMode);
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
    const { viewMode, controls, authMode } = this.state;
    const { isLoading } = this.props;
    const isFormInvalid = (
      (!controls.confirmPassword.valid && authMode === "signup")
      || !controls.email.valid
      || !controls.password.valid
    );
    let headingText = null;
    if (viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please {authMode === "login" ? "Login" : "Sign Up"}</HeadingText>
        </MainText>
      );
    };

    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <TouchableWithoutFeedback onPress={this.startMainTabs}>
          {headingText}
          </TouchableWithoutFeedback>
          <ButtonWithBackground
            color="#29aaf4"
            onPress={this.switchAuthModeHandler}
          >
            Switch to {authMode === "login" ? "Sign Up" : "Login"}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={styles.inputContainer}
            >
              <DefaultInput
                placeholder="Your E-Mail Address"
                style={styles.input}
                value={controls.email.value}
                valid={controls.email.valid}
                touched={controls.email.touched}
                onChangeText={(val) => this.updateInputState('email', val)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType='email-address'
              />
              <View
                style={
                  viewMode === 'portrait' || authMode === "login"
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
                }
              >
                <View
                  style={
                    viewMode === 'portrait' || authMode === "login"
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput
                    placeholder="Password"
                    style={styles.input}
                    value={controls.password.value}
                    valid={controls.password.valid}
                    touched={controls.password.touched}
                    onChangeText={(val) => this.updateInputState('password', val)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                  />
                </View>
                {authMode === "signup" &&
                  (
                  <View
                    style={
                      viewMode === 'portrait'
                      ? styles.portraitPasswordWrapper
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
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry
                    />
                  </View>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
          {isLoading
            ? <ActivityIndicator />
            : <ButtonWithBackground
                disabled={isFormInvalid}
                color="#29aaf4"
                onPress={this.authHandler}
                >
                  Submit
              </ButtonWithBackground>
          }
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  };
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

const mapDispatchToProps = dispatch => ({
  onTryAuth: (authdata, authMode) => dispatch(tryAuth(authdata, authMode)),
});

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
