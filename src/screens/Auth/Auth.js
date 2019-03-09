import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground, Dimensions } from 'react-native';

import backgroundImage from '../../assets/background.jpg';

import startMainTabs from '../MainTabs/startMainTabs';
import ButtonWithBackground from "../../components/UI/ButtonWithBackground";
import DefaultInput from "../../components/UI/DefaultInput";
import HeadingText from "../../components/UI/HeadingText";
import MainText from "../../components/UI/MainText";


class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
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
  }

  render () {
    const { viewMode } = this.state;
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
            <DefaultInput placeholder="Your E-Mail Address" style={styles.input} />
            <View style={viewMode === 'portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
              <View style={viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                <DefaultInput placeholder="Password" style={styles.input} />
              </View>
              <View style={viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                <DefaultInput placeholder="Confirm Password" style={styles.input} />
              </View>
            </View>
          </View>
          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
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
