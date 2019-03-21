import { AsyncStorage } from 'react-native';

import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    const apiKey = "AIzaSyBaaqojXpes4XTJ7x-zcU77uz-xw1rQCrw";
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${authMode === "signup" ? "signupNewUser" : "verifyPassword"}?key=${apiKey}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        console.log(parsedRes);
        if(!parsedRes.idToken) {
          alert("Authentication failed, please try again!");
          console.log(parsedRes.error);
        } else {
          dispatch(authStoreToken(parsedRes.idToken));
          startMainTabs();
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
        alert("Authentication failed, please try again!");
      });
  };
};

export const authStoreToken = token => {
  return dispatch => {
    dispatch(authSetToken(token));
    AsyncStorage.setItem("ap:auth:token", token);
  }
};

export const authSetToken = token => ({
  type: AUTH_SET_TOKEN,
  token
});

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        AsyncStorage.getItem("ap:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage =>{
            if(!tokenFromStorage) {
              reject();
              return;
            }
            dispatch(authSetToken(tokenFromStorage));
            resolve(tokenFromStorage);
          });
      } else {
        resolve(token);
      }
    })
    return promise;
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token!"));
  }
}
