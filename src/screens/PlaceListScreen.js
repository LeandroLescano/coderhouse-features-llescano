import {FlatList, StyleSheet, Text, View} from 'react-native';

import PlaceItem from '../components/PlaceItem';
import React from 'react';
import {useSelector} from 'react-redux';

const PlaceListScreen = ({navigation}) => {
  const places = useSelector(state => state.places.places);

  const onSelectDetail = () => {
    navigation.navigate('PlaceDetail');
  };

  const renderItem = ({item}) => (
    <PlaceItem
      title={item.title}
      image={item.image}
      address="Calle 123, San Pedro Sula, Cortés"
      onSelect={onSelectDetail}
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
