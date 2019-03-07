import { Navigation } from 'react-native-navigation';
import { Provider } from "react-redux";

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';

import configureStore from './src/store/configureStore';

const store = configureStore();

// Register Screens

Navigation.registerComponent("awsome-places.AuthScreen", () => AuthScreen, store, Provider);

Navigation.registerComponent("awsome-places.SharePlaceScreen", () => SharePlaceScreen, store, Provider);
Navigation.registerComponent("awsome-places.FindPlaceScreen", () => FindPlaceScreen, store, Provider);

Navigation.registerComponent("awsome-places.PlaceDetailScreen", () => PlaceDetailScreen, store, Provider);

// Start a App
Navigation.startSingleScreenApp({
  screen: {
    screen: "awsome-places.AuthScreen",
    title: "Login"
  },
});
