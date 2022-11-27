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
export default function WalletAmountTextInput({...rest}) {
  const {label,error, onMaxPress} = {...rest};
  const {theme} = useSelector(state => state.ThemeReducer);
  const lang = useSelector((state) => state.LanguageReducer.language);
  return (
      <View style={[styles.container]}>
        <View style={{backgroundColor: theme.textInputColor1}}>
          <Jiro
              {...rest}
              label={label}
              borderColor={theme.textInputColor1}
              inputStyle={[styles.label,{color: theme.textColor1, paddingRight: 75, backgroundColor: theme.textInputColor1}]}
              labelStyle={[styles.label,{color: theme.textColor1}]}
              keyboardType="numeric"
          />
        </View>
        {
          !_.isNil(error) && <Text style={styles.error}>{error.message}</Text>
        }
        <View style={styles.controls}>
          <CommonTouchableOpacity onPress={onMaxPress}>
            <CommonText style={{color: theme.textColor4}}>{lang.max}</CommonText>
          </CommonTouchableOpacity>
        </View>

      </View>

  );
}
const styles = StyleSheet.create({
  container: {
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
