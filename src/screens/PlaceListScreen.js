import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import PlaceItem from '../components/PlaceItem';
import {getPlaces} from '../store/places.action';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

const PlaceListScreen = ({navigation}) => {
  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  const onSelectDetail = place => {
    navigation.navigate('PlaceDetail', {place: place});
  };

  useEffect(() => {
    dispatch(getPlaces());
  }, []);

  const renderItem = ({item}) => (
    <PlaceItem
      title={item.title}
      image={item.image}
      address={item.address}
      onSelect={() => onSelectDetail(item)}
    />
  );

  const noData = () => <Text>No hay direcciones guardadas.</Text>;

  return (
    <FlatList
      data={places}
      ListEmptyComponent={noData}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlaceListScreen;
