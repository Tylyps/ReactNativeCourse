import { SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PACLE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const startAddPlace = () => ({
  type: START_ADD_PACLE,
});

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        authToken = token;
        return fetch("https://us-central1-rn-course-1552502528388.cloudfunctions.net/storeImage", {
          method: "POST",
          body: JSON.stringify({
            image: image.base64
          }),
          headers: {
            "Authorization": "Bearer " + authToken
          }
        })
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw (new Error());
        }
      })
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location,
          image: parsedRes.imageUrl,
          imagePath: parsedRes.imagePath
        };
        return fetch("https://rn-course-1552502528388.firebaseio.com/places.json?auth=" + authToken, {
          method: "POST",
          body: JSON.stringify(placeData)
        });
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw (new Error());
        }
      })
      .then(parsedRes => {
        console.log(parsedRes);
        alert("Added a place ;)");
        dispatch(uiStopLoading());
        dispatch(placeAdded());
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      });
  };
};

export const placeAdded = () => ({
  type: PLACE_ADDED
});

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        return fetch("https://rn-course-1552502528388.firebaseio.com/places.json?auth=" + token)
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw (new Error());
        }
      })
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
      })
      .catch(err => {
        alert("Something went wrong, sorry :/");
        console.log(err);
      });
  };
};

export const setPlaces = places => ({
  type: SET_PLACES,
  places
});

export const deletePlace = key => {
  return (dispatch, getState) => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        dispatch(removePlace(key));
        return fetch(`https://rn-course-1552502528388.firebaseio.com/places/${key}.json?auth=${token}`, {
          method: "DELETE",
        })

      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw (new Error());
        }
      })
      .then(parsedRes => {
        console.log("Done!");
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong, sorry :/");
      });
  }
};

export const removePlace = key => ({
  type: REMOVE_PLACE,
  key,
})
