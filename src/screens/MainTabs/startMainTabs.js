import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" :"ios-share", 30),
    Icon.getImageSource(Platform.OS === 'android' ? "md-menu" :"ios-menu", 30),
  ]).then(sources => {
    const menuButton = {
      icon: sources[2],
      title: "Menu",
      id: "sideDrawerToggle",
    };
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "awsome-places.FindPlaceScreen",
          label: "Find Place",
          title: "Find Place",
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              menuButton,
            ],
          },
        },
        {
          screen: "awsome-places.SharePlaceScreen",
          label: "Share Place",
          title: "Share Place",
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              menuButton,
            ],
          },
        },
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: "orange",
      },
      drawer: {
        left: {
          screen: "awsome-places.SideDrawer",
        },
      },
      appStyle: {
        tabBarSelectedButtonColor: "orange",
      },
    });
  });
};

export default startTabs;
