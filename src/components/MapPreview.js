import {Image, View} from 'react-native';

import {API_KEY} from '../constants/map';
import React from 'react';
import {styles} from '../styles/MapPreview.styles';

const MapPreview = ({location, children, style}) => {
  const {latitude, longitude} = location;
  const mapPreviewUrl = location
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=600x300&maptype=roadmap
    &markers=color:blue%7Clabel:N%7C${latitude},${longitude}&key=${API_KEY}`
    : '';

  return (
    <View style={{...styles.mapPreview, ...style}}>
      {location ? (
        <Image style={styles.mapImage} source={{uri: mapPreviewUrl}} />
      ) : (
        children
      )}
    </View>
  );
};

export default MapPreview;
