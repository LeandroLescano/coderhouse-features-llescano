import {Image, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import {styles} from '../styles/PlaceItem.styles';

const PlaceItem = ({title, image, address, onSelect}) => {
  return (
    <View>
      <TouchableOpacity onPress={onSelect} style={styles.container}>
        <Image source={{uri: image}} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.address}>{address}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceItem;
