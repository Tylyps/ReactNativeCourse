import { TRY_AUTH } from './actionTypes';
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
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
        alert("Authentication failed, please try again!");
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        if(parsedRes.error) {
          alert("Authentication failed, please try again!");
          console.log(parsedRes.error);
        } else {
          startMainTabs();
        }
      });
  };
};

