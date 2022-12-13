import React, {Fragment, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Root} from 'popup-ui';
import {useSelector} from 'react-redux';
import EtherWalletModule from '@modules/etherjs/EtherWalletModule';
import CommonText from '@components/commons/CommonText';
import CommonButton from '@components/commons/CommonButton';
import {deleteUserPinCode} from '@haskkor/react-native-pincode';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonHeader from '@components/commons/CommonHeader';

export default function MnemonicsScreen({navigation, route}) {
  const [mnemonics, setMnemonics] = useState(null);
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  useEffect(() => {
    onPressReveal();
  }, []);
  const onPressReveal = () => {
    const mnemonics = EtherWalletModule.generateMnemonics();
    setMnemonics(mnemonics);
  };

  const renderMnemonic = (mnemonic, index) => (
    <View style={[styles.mnemonic, {backgroundColor: theme.backgroundColor1}]} key={index}>
      <View style={{width: '80%'}}>
        <CommonText style={{textAlign: 'center', fontWeight: '400', fontSize: 12}}>
          <CommonText style={{color: '#8C8C8C'}}>{index + 1} </CommonText>
          <CommonText>{mnemonic}</CommonText>
        </CommonText>
      </View>
    </View>
  );

  const renderBody = () => {
    return (
      <Fragment>
        <View style={styles.mnemonicsContainer}>{mnemonics && mnemonics.slice(0, 11).map(renderMnemonic)}</View>
        <View style={styles.mnemonicsContainer}>{mnemonics && renderMnemonic(mnemonics[11], 11)}</View>
      </Fragment>
    );
  };

  return (
    <Root>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <CommonHeader
          onPressBack={async () => {
            await deleteUserPinCode();
            navigation.reset({
              routes: [{name: 'EntryScreen'}],
            });
          }}
          title={lang.yourRecoveryPhrase}
        />
        <View style={[styles.layerContainer, {backgroundColor: theme.backgroundColor1}]}>
          <View style={styles.logoContainer}>
            <CommonText style={{color: theme.textColor2, textAlign: 'center'}}>{lang.writeDown}</CommonText>
          </View>
          <View style={styles.contentContainer}>{renderBody()}</View>
          <View style={styles.buttonContainer}>
            <CommonTouchableOpacity>
              <CommonText style={[styles.copyButton, {color: theme.buttonColor1}]}>{lang.copy}</CommonText>
            </CommonTouchableOpacity>
            <View style={[styles.warningBox, {backgroundColor: theme.warningBackgroundColor, borderColor: theme.warningText}]}>
              <CommonText style={{fontSize: 14, fontWeight: '700', color: theme.warningText, marginBottom: 20}}>{lang.doNotShare}</CommonText>
              <CommonText style={{fontSize: 12, fontWeight: '400', color: theme.warningText, textAlign: 'center'}}>{lang.itWillGiveFullAccess}</CommonText>
            </View>
            <View style={styles.row}>
              <CommonButton
                label={lang.continue}
                onPress={() => {
                  navigation.navigate('ConfirmScreen', {mnemonics});
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Root>
  );
}
const styles = StyleSheet.create({
  topBackBg: {
    height: 250,
    width: '100%',
    backgroundColor: '#F0B90B',
    position: 'absolute',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  layerContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  logoContainer: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 2,
    padding: 10,
  },
  row: {
    width: '100%',
    marginBottom: 10,
  },
  loginContainer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mnemonicsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  overlayMnemonics: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mnemonic: {
    margin: 5,
    width: 90,
    height: 32,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#3c77b6',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  warningBox: {
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  copyButton: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: '700',
  },
});
