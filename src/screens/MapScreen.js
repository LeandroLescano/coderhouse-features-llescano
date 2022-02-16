import MapView, {Marker} from 'react-native-maps';
import React, {useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {COLORS} from '../constants/index';
import Geolocation from '@react-native-community/geolocation';
import {useState} from 'react';

const MapScreen = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const objLocation = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setLocationData(objLocation);
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
  }, []);

  const handleSelectLocation = event => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      navigation.navigate('NewPlace', {
        mapLocation: {
          ...selectedLocation,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        },
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveLocation}>
          <Text style={styles.headerButton}>Guardar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSaveLocation]);

  return (
    <>
      {locationData ? (
        <MapView
          initialRegion={locationData}
          style={styles.container}
          onPress={handleSelectLocation}>
          {selectedLocation && (
            <Marker
              title="Ubicación seleccionada"
              coordinate={{
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
              }}
            />
          )}
        </MapView>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    color: 'white',
    backgroundColor: COLORS.BLUSH,
    padding: 5,
    fontSize: 20,
    borderRadius: 5,
  },
});

export default MapScreen;
