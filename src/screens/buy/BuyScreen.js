/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '@components/commons/CommonHeader';
import CommonText from '@components/commons/CommonText';
import CommonButton from '@components/commons/CommonButton';
import {useSelector} from 'react-redux';
import Remove from '@components/icons/Remove';
import {Popup, Root} from 'popup-ui';

const MINIMUM_PURCHASE = 50;

export default function BuyScreen({route}) {
  const {wallet} = route.params;
  const navigation = useNavigation();
  const [amount, setAmount] = React.useState('0');
  const {theme} = useSelector(state => state.ThemeReducer);

  const onPressBuy = () => {
    if (parseFloat(amount) < MINIMUM_PURCHASE) {
      Popup.show({
        type: 'Danger',
        title: 'Error',
        button: true,
        textBody: `Minimum purchase is $${MINIMUM_PURCHASE}`,
        buttontext: 'Ok',
        callback: () => Popup.hide(),
      });
      return;
    }
    navigation.navigate('WebViewScreen', {title: 'Buy', uri: 'https://www.google.com'});
  };

  const keypad = () => (
    <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 50, justifyContent: 'center'}}>
      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', null].map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setAmount(prev => {
              if (typeof item === 'string') {
                if (prev === '0') return item;
                if (prev.includes('.') && item === '.') return prev;
                return prev + item;
              } else {
                if (prev.length === 1) return '0';
                return prev.slice(0, -1);
              }
            });
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 70,
            height: 70,
            margin: 5,
          }}>
          {typeof item === 'string' ? (
            <CommonText style={{color: theme.lightDarkAccent, fontSize: 18, fontWeight: '500'}}>{item}</CommonText>
          ) : (
            <Remove fill={theme.lightDarkAccent} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Root>
      <SafeAreaView style={{flex: 1, backgroundColor: theme.backgroundColor1}}>
        <CommonHeader
          onPressBack={() => navigation.goBack()}
          title={`Buy ${wallet.name}`}
          rightChild={
            <View
              style={{
                width: 60,
                height: 30,
                backgroundColor: theme.buttonColor1,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CommonText style={{color: theme.textColor3, fontSize: 16, fontWeight: '500'}}>USD</CommonText>
            </View>
          }
        />

        <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
          <CommonText style={{color: theme.lightDarkAccent, fontSize: 30, fontWeight: '700', marginBottom: 30}}>US${amount}</CommonText>
          {Number(amount) > MINIMUM_PURCHASE ? (
            <CommonText style={{color: theme.lightDarkAccent}}>
              ≈ {'0.0000012'} {wallet.symbol}
            </CommonText>
          ) : (
            <CommonText>{MINIMUM_PURCHASE} Minimum Purchase</CommonText>
          )}
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {keypad()}
          <CommonButton label="Next" style={{width: '80%', borderRadius: 5}} labelStyle={{fontSize: 18}} onPress={onPressBuy} />
        </View>
      </SafeAreaView>
    </Root>
  );
}
