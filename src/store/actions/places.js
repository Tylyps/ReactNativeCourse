import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
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
      alert("Added a place ;)");
      dispatch(uiStopLoading());
    });

  };
};

export const getPlaces = () => {
  return dispatch => {
    fetch("https://rn-course-1552502528388.firebaseio.com/places.json")
    .catch(err => {
      alert("Something went wrong, sorry :/");
      console.log(err);
    })
    .then(res => res.json())
    .then(parsedRes => {
      const places = [];
      for(let key in parsedRes) {
        places.push({
          ...parsedRes[key],
          image: {
            uri: parsedRes[key].image
          },
          key,
        });
      };
      dispatch(setPlaces(places))
    });
  };
};

export const setPlaces = places => ({
  type: SET_PLACES,
  places
});

export const deletePlace = key => {
  return dispatch => {
    dispatch(removePlace(key));
    fetch(`https://rn-course-1552502528388.firebaseio.com/places/${key}.json`, {
      method: "DELETE",
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong, sorry :/");
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log("Done!");
    });
  }
};

export const removePlace = key => ({
  type: REMOVE_PLACE,
  key,
})
