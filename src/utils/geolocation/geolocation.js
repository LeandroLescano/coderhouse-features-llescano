import Geolocation from '@react-native-community/geolocation';

export const getCurrentPosition = () => {
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      const objLocation = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setPickedLocation(objLocation);
      onLocation(objLocation);
    },
    error => {
      console.warn(error);
      Alert.alert('Error', 'No se pudo obtener la ubicación');
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      forceRequestLocation: true,
      showLocationDialog: true,
    },
  );
};
