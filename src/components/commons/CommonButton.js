import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';

function CommonButton({...rest}) {
  const {style, labelStyle, label} = {...rest};
  const {theme} = useSelector(state => state.ThemeReducer);
  return (
    <TouchableOpacity activeOpacity={0.5} {...rest} style={[styles.container, {backgroundColor: theme.buttonColor1}, style]}>
      <CommonText style={[styles.text, {color: theme.buttonTextColor1}, labelStyle]}>{label}</CommonText>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 55,
    flexDirection: 'row',
    borderRadius: 2,
  },
  text: {
    fontWeight: '400',
    fontSize: 14,
  },
  icon: {
    marginRight: 5,
  },
});
export default CommonButton;
