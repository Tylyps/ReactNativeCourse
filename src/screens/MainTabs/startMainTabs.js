import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';



const startTabs = () => {
  Promise.all([
    Icon.getImageSource("md-map", 30, "blue"),
    Icon.getImageSource("ios-share-alt", 30, "red")
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "awsome-places.FindPlaceScreen",
          label: "Find Place",
          title: "Find Place",
          icon: sources[0],
        },
        {
          screen: "awsome-places.SharePlaceScreen",
          label: "Share Place",
          title: "Share Place",
          icon: sources[1],
        },
      ]
    });
  });
};

export default startTabs;
