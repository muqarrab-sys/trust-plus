import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Root} from 'popup-ui';
import PINCode, {deleteUserPinCode} from '@haskkor/react-native-pincode';
import {useSelector} from 'react-redux';
import Remove from '@components/icons/Remove';
import CommonText from '@components/commons/CommonText';

export default function PasscodeScreen({navigation, route}) {
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const {nextScreen} = route.params;
  const [status, setStatus] = useState('choose');
  const [pinLength, setPinLength] = useState(0);

  const pinDotsContainer = () => {
    return (
      <View style={styles.pinDotsContainer}>
        {[1,2,3,4,5,6].map(length => (
          <View style={[styles.dots, {
            borderColor: theme.backgroundColor2,
            backgroundColor: length <= pinLength ? theme.backgroundColor2 : 'transparent',
          }]}/>
        ))}
      </View>
    );
  };


  return (
    <Root>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <PINCode
          titleChoose="Create Passcode"
          titleConfirm="Re-Enter Passcode"
          status={status}
          pinStatus={'initial'}
          passwordLength={6}
          finishProcess={pinCode => {
            navigation.navigate(nextScreen);
          }}
          getCurrentPinLength={val => setPinLength(val)}
          passwordComponent={pinDotsContainer}
          customBackSpaceIcon={(props) => (
            <View style={styles.backspace}>
              <Remove fill={props.colorDelete} opacity={props.opacity} />
            </View>
          )}
          colorPassword={theme.buttonColor1}
          styleAlphabet={{color: theme.buttonColor1}}
          numbersButtonOverlayColor={theme.buttonColor1}
          stylePinCodeButtonCircle={{ backgroundColor: 'transparent', borderRadius: 0 }}
          stylePinCodeButtonNumber={theme.textColor7}
          stylePinCodeTextButtonCircle={{fontSize: 32, fontWeight: '700'}}
          stylePinCodeCircle={{
            width: 15,
            height: 15,
            borderRadius: 7.5,
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: theme.backgroundColor2
          }}
          stylePinCodeDeleteButtonColorHideUnderlay={theme.textColor7}
          stylePinCodeDeleteButtonColorShowUnderlay={theme.buttonColor1}
          stylePinCodeTextTitle={{color: 'red'}}
        />
        <View style={styles.footer}>
          <CommonText style={styles.bottomText}>{lang.passcodeIsForExtraSecurity}</CommonText>
        </View>
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
    paddingTop: 50,
  },
  pinDotsContainer: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8C8C8C',
    textAlign: 'center',
  },
  numberButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
  },
});
