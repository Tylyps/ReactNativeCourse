import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';



const startTabs = () => {
  Promise.all([
    Icon.getImageSource("md-map", 30, "blue"),
    Icon.getImageSource("ios-share-alt", 30, "red"),
    Icon.getImageSource("ios-menu", 30),
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
      drawer: {
        left: {
          screen: "awsome-places.SideDrawer",
        },
      },
    });
  });
};

export default startTabs;
