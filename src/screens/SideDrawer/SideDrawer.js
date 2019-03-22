import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import { authLogout } from '../../store/actions/index';


class SideDrawer extends Component {
  state = {
    width: Dimensions.get("window").width * 0.8,
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
      width: dims.window.width * 0.8,
    });
  }

  render() {
    const { width } = this.state;

    return (
      <View
        style={[
          styles.container,
          { width },
        ]}
      >
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              size={30}
              name={Platform.OS === 'android' ? "md-log-out" : "ios-log-out"}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "white",
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#eee',
  },
  drawerItemIcon: {
    marginRight: 10,
  }
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(authLogout()),
});

export default connect(null, mapDispatchToProps)(SideDrawer);
