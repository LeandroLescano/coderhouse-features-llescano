import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import {COLORS} from '../constants';
import ImageSelector from '../components/ImageSelector';
import LocationSelector from '../components/LocationSelector';
import {addPlace} from '../store/places.action';
import {useDispatch} from 'react-redux';

const NewPlaceScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState(null);

  const handleTitleChange = text => setTitle(text);

  const handleSave = () => {
    dispatch(addPlace(title, image, location));
    navigation.navigate('Directions');
  };

  const handleOnImage = uri => {
    setImage(uri);
  };

  const handleOnLocation = position => {
    setLocation(position);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageSelector onImage={handleOnImage} />
        <LocationSelector onLocation={handleOnLocation} />
        <TextInput
          placeholder="Ingresá el nombre de la dirección (ej. Casa)"
          style={styles.input}
          onChangeText={handleTitleChange}
          value={title}
        />
        <TouchableHighlight
          underlayColor={COLORS.BLUSH}
          style={styles.button}
          onPress={() => handleSave()}>
          <Text style={styles.buttonText}>Grabar dirección</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 15,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    color: '#212121',
    fontWeight: 'bold',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 8,
    padding: 4,
  },
  button: {
    backgroundColor: COLORS.MAROON,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default NewPlaceScreen;
