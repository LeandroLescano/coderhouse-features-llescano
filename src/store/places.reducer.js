import {ADD_PLACE, DELETE_PLACE, GET_PLACES} from './places.action';

import Place from '../models/Places';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('address.db');

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        Date.now(),
        action.payload.title,
        action.payload.image,
        action.payload.address,
        action.payload.lat,
        action.payload.lng,
      );
      try {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO address (title, image, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
            [
              newPlace.title,
              newPlace.image,
              newPlace.address,
              newPlace.lat,
              newPlace.lng,
            ],
            (_, result) => {
              console.log(result);
            },
            (_, err) => {
              console.log(err);
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
      return {
        ...state,
        places: state.places.concat(newPlace),
      };
    case GET_PLACES:
      return {
        ...state,
        places: action.payload,
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.id !== action.payload),
      };
    default:
      return state;
  }
};
