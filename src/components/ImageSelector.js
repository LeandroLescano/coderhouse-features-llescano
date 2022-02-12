import {
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import React, {useState} from 'react';

import {COLORS} from '../constants';
import {launchCamera} from 'react-native-image-picker';
import {styles} from '../styles/ImageSelector.styles';

const ImageSelector = ({onImage}) => {
  const [pickerResponse, setPickerResponse] = useState();
  const isiOS = Platform.OS === 'ios';

  const handleTakePicture = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    let granted;

    if (isiOS) {
      granted = await request(PERMISSIONS.IOS.CAMERA);
    } else {
      granted = await request(PERMISSIONS.ANDROID.CAMERA);
    }

    if (granted === RESULTS.GRANTED) {
      launchCamera(options, res => {
        if (!res.didCancel && !res.error) {
          setPickerResponse(res.assets[0]);
          onImage && onImage(res.assets[0].uri);
        }
      });
    } else {
      console.log('Camera permission denied');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickerResponse ? (
          <Text>Aún no has tomado ninguna foto</Text>
        ) : (
          <Image style={styles.image} source={{uri: pickerResponse.uri}} />
        )}
      </View>
      <TouchableHighlight
        underlayColor={COLORS.BLUSH}
        style={styles.button}
        onPress={handleTakePicture}>
        <Text style={styles.buttonText}>Tomar foto</Text>
      </TouchableHighlight>
    </View>
  );
};

export default ImageSelector;
