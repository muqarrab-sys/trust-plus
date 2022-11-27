import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Root} from 'popup-ui';
import PINCode, {deleteUserPinCode} from '@haskkor/react-native-pincode';
import CommonBackButton from '@components/commons/CommonBackButton';
import {useSelector} from 'react-redux';
export default function PasscodeScreen({navigation, route}) {
  const {theme} = useSelector(state => state.ThemeReducer);
  const {nextScreen} = route.params;
  const [status, setStatus] = useState('choose');
  return (
    <Root>
      <SafeAreaView
        style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <View style={styles.header}>
          <CommonBackButton
            color={'black'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <PINCode
          colorPassword={theme.buttonColor1}
          styleAlphabet={{color: theme.buttonColor1}}
          numbersButtonOverlayColor={theme.buttonColor1}
          status={status}
          pinStatus={'initial'}
          passwordLength={6}
          finishProcess={pinCode => {
            navigation.navigate(nextScreen);
          }}
        />
      </SafeAreaView>
    </Root>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
  },
});
