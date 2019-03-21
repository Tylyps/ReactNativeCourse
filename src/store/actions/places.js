import { ADD_PLACE, DELETE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch("https://us-central1-rn-course-1552502528388.cloudfunctions.net/storeImage", {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, please try again!");
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      const placeData = {
        name: placeName,
        location,
        image: parsedRes.imageUrl
      };
      return fetch("https://rn-course-1552502528388.firebaseio.com/places.json", {
        method: "POST",
        body: JSON.stringify(placeData)
      });
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, please try again!");
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      alert(parsedRes);
      dispatch(uiStopLoading());
    });

  };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key,
  };
};
