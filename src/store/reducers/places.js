import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
  places: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: `${Math.random()}`,
          name: action.placeName,
          image: {
            uri: "https://images.pexels.com/photos/1902785/pexels-photo-1902785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          },
          location: action.location,
        }),
      };

    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(
          place => place.key !== action.placeKey
        ),
      };

    default:
      return state;
  }

};

export default reducer;
