import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {COLORS} from '../constants';
import MapPreview from '../components/MapPreview';
import React from 'react';
import {deletePlace} from '../store/places.action';
import {useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';

const PlaceDetailScreen = ({navigation}) => {
  const route = useRoute();
  const place = route.params.place;
  const dispatch = useDispatch();

  const handleDelete = () => {
    Alert.alert('Eliminar', '¿Estás seguro de eliminar esta dirección?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        onPress: () => {
          dispatch(deletePlace(place.id));
          navigation.goBack();
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{place.title}</Text>
      <View style={styles.map}>
        <MapPreview
          location={{latitude: place.latitude, longitude: place.longitude}}
        />
      </View>
      <Text style={styles.address}>Dirección: {place.address}</Text>
      <Image source={{uri: place.image}} style={styles.image} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={() => handleDelete()}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  address: {
    marginVertical: 10,
    fontSize: 16,
  },
  map: {
    width: '100%',
    height: 200,
  },
  button: {
    marginVertical: 15,
    backgroundColor: COLORS.BLUSH,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PlaceDetailScreen;
