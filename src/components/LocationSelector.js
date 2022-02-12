import {Alert, Text, TouchableHighlight, View} from 'react-native';
import React, {useState} from 'react';

import {COLORS} from '../constants';
import Geolocation from '@react-native-community/geolocation';
import MapPreview from './MapPreview';
import {styles} from '../styles/LocationSelector.styles';

const LocationSelector = ({onLocation}) => {
  const [pickedLocation, setPickedLocation] = useState('');

  const handleGetLocation = () => {
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

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview}>
        <Text>Aún no has seleccionado ninguna ubicación</Text>
      </MapPreview>

      <TouchableHighlight
        underlayColor={COLORS.BLUSH}
        style={styles.button}
        onPress={handleGetLocation}>
        <Text style={styles.buttonText}>Seleccionar ubicación</Text>
      </TouchableHighlight>
    </View>
  );
};

export default LocationSelector;
