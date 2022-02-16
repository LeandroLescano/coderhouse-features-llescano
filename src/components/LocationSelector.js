import {Alert, Text, TouchableHighlight, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {COLORS} from '../constants';
import Geolocation from '@react-native-community/geolocation';
import MapPreview from './MapPreview';
import {styles} from '../styles/LocationSelector.styles';

const LocationSelector = ({onLocation}) => {
  const [pickedLocation, setPickedLocation] = useState('');
  const route = useRoute();
  const mapLocation = route?.params?.mapLocation;
  const navigation = useNavigation();

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

  const handlePickOnMap = () => {
    navigation.navigate('Map', {location: pickedLocation});
  };

  useEffect(() => {
    if (mapLocation) {
      console.log({mapLocation});
      setPickedLocation(mapLocation);
      onLocation(mapLocation);
    }
  }, [mapLocation]);

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview}>
        <Text>Aún no has seleccionado ninguna ubicación</Text>
      </MapPreview>
      <View style={styles.actions}>
        <TouchableHighlight
          underlayColor={COLORS.BLUSH}
          style={styles.button}
          onPress={handleGetLocation}>
          <Text style={styles.buttonText}>Seleccionar ubicación</Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={COLORS.BLUSH}
          style={styles.button}
          onPress={handlePickOnMap}>
          <Text style={styles.buttonText}>Elegir del mapa</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default LocationSelector;
