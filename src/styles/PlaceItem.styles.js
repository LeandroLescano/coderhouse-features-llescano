import {COLORS} from '../constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderBottomColor: COLORS.BLUSH,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: COLORS.BLUSH,
  },
  details: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: COLORS.BLUSH,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    color: COLORS.DARK_SIENNA,
    fontSize: 14,
  },
});
