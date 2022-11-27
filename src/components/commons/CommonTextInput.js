import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Jiro
} from "react-native-textinput-effects";
import _ from 'lodash';

import {useSelector} from "react-redux";
export default function CommonTextInput({...rest}) {
  const {label,error} = {...rest};
  const {theme} = useSelector(state => state.ThemeReducer);
  return (
    <View style={[styles.container]}>
      <Jiro
          {...rest}
          label={label}
          borderColor={theme.textInputColor1}
          inputStyle={[styles.label,{color: theme.textColor1,paddingRight:23, backgroundColor: theme.textInputColor1}]}
          labelStyle={[styles.label,{color: theme.textColor1}]}
      />
      {
        !_.isNil(error) && <Text style={styles.error}>{error.message}</Text>
      }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 75,
    justifyContent: 'center',
    marginTop: 5,
  },
  textInput: {
    paddingLeft: 5,
    width: '100%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#d5d5d5',
    backgroundColor: 'white',
  },
  label: { fontSize: 18, fontWeight: 'normal'},
  hint: {
    marginLeft: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 10,
  },
  error: {color: 'red', fontWeight: 'bold'},
});
