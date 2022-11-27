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
import Bell from "@components/icons/Bell";
import Scan from "@components/icons/Scan";
import CommonTouchableOpacity from "@components/commons/CommonTouchableOpacity";
import CommonText from "@components/commons/CommonText";
export default function EthereumNetworkFeeSelect({...rest}) {
  const {label,value} = {...rest};
  const {theme} = useSelector(state => state.ThemeReducer);
  const lang = useSelector((state) => state.LanguageReducer.language);
  return (
      <View style={[styles.container]}>
        <CommonText style={styles.label}>{label}</CommonText>
        <CommonText>{value}</CommonText>
      </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 55,
    justifyContent: 'space-between',
    marginTop: 5,
    paddingLeft: 16
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
  controls : {
    flexDirection: 'row',
    width: 50,
    height: 75,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 20,
    paddingRight: 5
  }
});
