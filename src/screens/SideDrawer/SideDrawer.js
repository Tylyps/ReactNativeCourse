import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';


class SideDrawer extends Component {

  render() {

    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 },
        ]}
      >
        <TouchableOpacity>
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

export default SideDrawer;
