import {API_KEY} from '../constants/map';
import RNFS from 'react-native-fs';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase('address.db');
export const ADD_PLACE = 'ADD_PLACE';
export const GET_PLACES = 'GET_PLACES';
export const DELETE_PLACE = 'DELETE_PLACE';

export const addPlace = (title, image, location) => {
  return async dispatch => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${API_KEY}`,
    );
    if (!response.ok) {
      throw new Error('No se ha podido obtener la dirección!');
    }

    const resData = await response.json();

    if (!resData.results) {
      throw new Error('No se ha podido obtener la dirección!');
    }

    const address = resData.results[0].formatted_address;
    const filename = image.split('/').pop();

    const path = `file:///${RNFS.DocumentDirectoryPath}/${filename}`;

    try {
      await RNFS.copyFile(image, path);
      dispatch({
        type: ADD_PLACE,
        payload: {
          title,
          image: path,
          address,
          lat: location.latitude,
          lng: location.longitude,
        },
      });
    } catch (error) {
      console.log('places_action', error);
    }
  };
};

export const getPlaces = () => {
  return async dispatch => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM address', [], (_, {rows}) => {
          const places = [];
          for (let i = 0; i < rows.length; i++) {
            places.push(rows.item(i));
          }
          dispatch({
            type: GET_PLACES,
            payload: places,
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePlace = id => {
  return dispatch => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM address WHERE id = ?', [id], () => {
        dispatch({
          type: DELETE_PLACE,
          payload: id,
        });
      });
    });
  };
};
