import RNFS from 'react-native-fs';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
  return async dispatch => {
    const filename = image.split('/').pop();
    const path = `file:///${RNFS.DocumentDirectoryPath}/${filename}`;

    try {
      await RNFS.copyFile(image, path);
      dispatch({type: ADD_PLACE, payload: {title, image: path}});
    } catch (error) {
      console.log('places_action', error);
    }
  };
};
