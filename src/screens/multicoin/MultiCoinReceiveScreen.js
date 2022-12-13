import React from 'react';
import {SafeAreaView, StyleSheet, View, Share as ShareRN} from 'react-native';
import CommonBackButton from '@components/commons/CommonBackButton';
import CommonText from '@components/commons/CommonText';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import Copy from '@components/icons/Copy';
import Dollar from '@components/icons/Dollar';
import Share from '@components/icons/Share';
import Clipboard from '@react-native-clipboard/clipboard';
import prompt from 'react-native-prompt-android';
import QRCode from 'react-native-qrcode-svg';
import {useSelector} from 'react-redux';

export default function MultiCoinReceiveScreen({navigation, route}) {
  const {wallet, marketCapData} = route.params;
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const [qrCode, setQrCode] = React.useState(wallet?.address);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
      <View style={[styles.header, {backgroundColor: theme.mainColor}]}>
        <CommonBackButton
          color={'white'}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <CommonText style={styles.title}>{lang.receive}</CommonText>
        <View style={{width: 40}}></View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.qrCode}>
          <View style={styles.qrCodeHeader}>
            <CommonText style={[styles.text, styles.title, {color: theme.textColor4}]}>My Trust Wallet</CommonText>
          </View>
          <QRCode value={qrCode} size={240} backgroundColor={'white'} />
          <View style={styles.qrCodeFooter}>
            <CommonText style={styles.text}>{wallet.address}</CommonText>
          </View>
        </View>
        <View style={styles.description}>
          <View style={{height: 40, justifyContent: 'center'}}>
            {qrCode.split('amount=')[1] ? (
              <CommonText style={{alignText: 'center'}}>
                <CommonText style={{fontSize: 16}}>
                  {qrCode.split('amount=')[1]} {wallet.network.symbol}{' '}
                </CommonText>
                <CommonText style={{fontSize: 12}}>≈ ${(qrCode.split('amount=')[1] * marketCapData.currentPrice).toFixed(2)}</CommonText>
              </CommonText>
            ) : null}
          </View>
          <CommonText style={styles.text}>
            {lang.sendOnly} {wallet?.symbol} {lang.toThisAddress}
          </CommonText>
          <CommonText style={styles.text}>{lang.sendingAnyOtherCoins}</CommonText>
        </View>
        <View style={styles.controls}>
          <CommonTouchableOpacity style={styles.element} onPress={() => Clipboard.setString(wallet?.address)}>
            <View style={[styles.elementIcon, {backgroundColor: theme.buttonColor1}]}>
              <Copy />
            </View>
            <CommonText style={{color: theme.textColor4}}>{lang.copy}</CommonText>
          </CommonTouchableOpacity>
          <CommonTouchableOpacity
            style={styles.element}
            onPress={() => {
              prompt(
                lang.setAmount,
                lang.enterAmount,
                [
                  {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                  {text: 'OK', onPress: text => setQrCode(wallet?.address + '?amount=' + text)},
                ],
                {
                  type: 'numeric',
                  cancelable: true,
                  defaultValue: '',
                  placeholder: 'Set Amount',
                },
              );
            }}>
            <View style={[styles.elementIcon, {backgroundColor: theme.buttonColor3}]}>
              <Dollar />
            </View>
            <CommonText style={{color: theme.textColor4}}>{lang.setAmount}</CommonText>
          </CommonTouchableOpacity>
          <CommonTouchableOpacity
            style={styles.element}
            onPress={() => {
              ShareRN.share({
                message: `My Trust Wallet Address: ${wallet.address}`,
              });
            }}>
            <View style={[styles.elementIcon, {backgroundColor: theme.buttonColor3}]}>
              <Share />
            </View>
            <CommonText style={{color: theme.textColor4}}>{lang.share}</CommonText>
          </CommonTouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCode: {
    minHeight: 280,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  qrCodeHeader: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodeFooter: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  description: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    width: '80%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  element: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 5,
  },
  setAmountModal: {
    position: 'absolute',
    top: '50%',
    right: '50%',
    width: 300,
    height: 200,
    borderRadius: 10,
    transform: [{translateX: 150}, {translateY: -100}],
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
