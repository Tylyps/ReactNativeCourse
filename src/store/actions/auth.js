import { AsyncStorage } from 'react-native';

import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

const API_KEY = "AIzaSyBaaqojXpes4XTJ7x-zcU77uz-xw1rQCrw";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${authMode === "signup" ? "signupNewUser" : "verifyPassword"}?key=${API_KEY}`;
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
          dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
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

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("ap:auth:token", token);
    AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
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
        let fetchedToken;
        AsyncStorage.getItem("ap:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage =>{
            fetchedToken = tokenFromStorage;
            if(!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("ap:auth:expiryDate")
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if(parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise
      .catch(err => {
        return AsyncStorage.getItem("ap:auth:refreshToken")
          .then(refreshToken => {
            return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
              method: "POST",
              headers: "application/x-www-form-urlencoded",
              body: "grant_type=refresh_token&refresh_token=" + refreshToken,
            });
          })
          .then(res => res.json())
          .then(parseRes => {
            if (parsedRes.id_token) {
              console.log("Refresh token worked!");
              dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token));
              return parsedRes.id_token;
            } else {
              dispatch(authClearStore());
            }
          })
      })
      .then(token => {
        if(!token) {
          throw(new Error());
        } else {
          return token;
        }
      });
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token!"));
  };
};

export const authClearStore = () => {
  return dispatch => {
    AsyncStorage.removeItem("ap:auth:token");
    AsyncStorage.removeItem("ap:auth:expiryDate");
  }
};
