/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Root, Toast} from 'popup-ui';
import CommonBackButton from '@components/commons/CommonBackButton';
import {useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import Clipboard from '@react-native-clipboard/clipboard';
import WalletAddressTextInput from '@components/elements/WalletAddressTextInput';
import WalletAmountTextInput from '@components/elements/WalletAmountTextInput';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as utils from '@ethersproject/address';
import BitcoinUtil from '@modules/bitcoin/BitcoinUtil';
import * as bitcoin from 'bitcoinjs-lib';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import _ from 'lodash';
import CommonHorizontalText from '@components/commons/CommonHorizontalText';
import BitcoinModuleService from '@modules/bitcoin/BitcoinModuleService';
import CommonLoading from '@components/commons/CommonLoading';
import CommonToast from '@components/commons/CommonToast';
import BitcoinWalletModule from '@modules/bitcoin/BitcoinWalletModule';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '@components/commons/CommonHeader';
import {Jiro, Hoshi} from 'react-native-textinput-effects';
import {TextInput} from 'react-native';
import Scan from '@components/icons/Scan';
import CommonImage from '@components/commons/CommonImage';
import {TokenService} from '@persistence/token/TokenService';
import CommonButton from '@components/commons/CommonButton';

const INPUTS_CONTAINER_HEIGHT = 100;

yup.addMethod(yup.string, 'isAddress', function (errorMessage, symbol) {
  return this.test('test-address', errorMessage, function (value) {
    const {path, createError} = this;
    if (symbol == 'BTC') {
      return BitcoinUtil.validate(value, bitcoin?.networks?.testnet) || createError({path, message: errorMessage});
    } else {
      return utils.isAddress(value) || createError({path, message: errorMessage});
    }
  });
});
export default function BitcoinSendScreen({route, wallet}) {
  const lang = useSelector(state => state?.LanguageReducer?.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const navigation = useNavigation();
  // const {activeWallet} = useSelector(state => state?.WalletReducer);
  const schema = yup.object().shape({
    recipientAddress: yup
      .string()
      .required(lang.recipientAddress + ' ' + lang.isARequiredField)
      .isAddress(lang.address + ' ' + lang.isIncorrect, 'BTC'),
    amount: yup
      .number()
      .positive(lang?.mustGreaterThan0)
      .typeError(lang.amount + ' ' + lang.isIncorrect),
  });
  const {control, setValue, handleSubmit, errors, watch} = useForm({resolver: yupResolver(schema)});
  const watchAmount = Number(watch('amount')) || 0;

  const [vFee, setVFee] = useState({});
  const [currentBitcoinPrice, setCurrentBitcoinPrice] = useState(0);
  const [amountType, setAmountType] = useState('coin');

  const convertedValue = amountType === 'coin' ? watchAmount * currentBitcoinPrice : watchAmount / currentBitcoinPrice;

  useEffect(() => {
    (async () => {
      const fees = await BitcoinModuleService.getEstimateFee();
      setVFee(fees.fast);
      const [data] = await TokenService.getMarketCapData(wallet?.network?.symbol, 'usd');
      setCurrentBitcoinPrice(data?.current_price);
    })();
  }, []);

  const onSubmit = async () => {
    try {
      CommonLoading.show();
      console.log('onSubmit');
      const recipientAddress = control.getValues().recipientAddress;
      const amount = control.getValues().amount;
      const params = {
        wif: wallet?.privateKey,
        address: wallet?.address,
        amount: parseFloat(amount),
        toAddress: recipientAddress,
        rate: vFee,
      };
      // const fee = await BitcoinWalletModule.getFee(params);
      const fee = 10;
      CommonLoading.hide();
      if (!_.isNil(fee)) {
        navigation.navigate('BitcoinConfirmationScreen', {
          options: {amountType, convertedValue},
          recipientAddress,
          amount,
          wallet,
          fee,
          vFee,
        });
      } else {
        CommonToast.error({
          title: lang.error,
          text: lang.insufficientFund,
        });
      }
    } catch (error) {
      CommonLoading.hide();
      console.error(error);
      CommonToast.error({
        title: lang.error,
        text: "We can't send your transaction. Please try again later",
      });
    }
  };

  return (
    <Root>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <CommonHeader onPressBack={() => navigation.goBack()} title={`${lang.send} ${wallet?.network?.symbol || ''}`} />
        <View style={styles.contentContainer}>
          <View
            style={{
              height: INPUTS_CONTAINER_HEIGHT,
              width: '100%',
              flexDirection: 'row',
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: theme.borderColor1,
              borderRadius: 10,
              elevation: 3,
            }}>
            <View style={{width: 20}} />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{width: '100%', height: INPUTS_CONTAINER_HEIGHT / 2}}>
                <Controller
                  control={control}
                  labelStyle={[styles.label, {color: theme.textColor1}]}
                  render={({onChange, onBlur, value}) => (
                    <View style={{flex: 1, paddingRight: 10, flexDirection: 'row'}}>
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={val => onChange(val)}
                        value={value}
                        style={{flex: 1}}
                        placeholder={lang?.recipientAddress}
                      />

                      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <CommonTouchableOpacity
                          onPress={async () => {
                            const text = await Clipboard.getString();
                            setValue('recipientAddress', text);
                          }}>
                          <CommonText style={{color: theme.textColor4}}>{lang?.paste}</CommonText>
                        </CommonTouchableOpacity>

                        <CommonTouchableOpacity
                          style={{width: 35, justifyContent: 'center', alignItems: 'flex-end'}}
                          onPress={() => {
                            navigation.navigate('BitcoinScannerScreen', {
                              screenName: 'BitcoinSendScreen',
                              onCallback: data => {
                                setValue('recipientAddress', data, {
                                  shouldValidate: true,
                                });
                              },
                            });
                          }}>
                          <Scan />
                        </CommonTouchableOpacity>
                      </View>
                    </View>
                  )}
                  name="recipientAddress"
                  defaultValue=""
                />
              </View>

              <View style={{height: 0.5, width: '100%', backgroundColor: theme.textColor7}} />

              <View style={{width: '100%', height: INPUTS_CONTAINER_HEIGHT / 2}}>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <View style={{flex: 1, paddingRight: 10, flexDirection: 'row'}}>
                      <TextInput
                        style={{flex: 1}}
                        placeholder={`${lang.amount} ${amountType === 'coin' ? wallet?.network?.symbol : 'USD'}`}
                        onBlur={onBlur}
                        onChangeText={val => onChange(val)}
                        value={value}
                        keyboardType={'numeric'}
                      />
                      {!_.isNil(errors) && <Text style={styles.error}>{errors?.message}</Text>}

                      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <CommonTouchableOpacity onPress={() => setValue('amount', wallet?.balance?.val?.toString())}>
                          <CommonText style={{color: theme.textColor4}}>{lang?.max}</CommonText>
                        </CommonTouchableOpacity>
                        <CommonTouchableOpacity
                          style={{width: 35, justifyContent: 'center', alignItems: 'flex-end'}}
                          onPress={() => setAmountType(prev => (prev === 'coin' ? 'usd' : 'coin'))}>
                          {amountType === 'coin' ? (
                            <CommonImage source={{uri: wallet.logoURI}} resizeMode={'contain'} style={{width: 28, height: 28}} />
                          ) : amountType === 'usd' ? (
                            <CommonText>USD</CommonText>
                          ) : null}
                        </CommonTouchableOpacity>
                      </View>
                    </View>
                  )}
                  name="amount"
                  defaultValue={0}
                />
              </View>
            </View>
          </View>
          <View>
            <CommonText>≈ {convertedValue}</CommonText>
          </View>
        </View>
        <View style={{padding: 20}}>
          <CommonButton label={lang?.next} style={{borderRadius: 8}} onPress={onSubmit} />
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
  },
  header: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  item: {
    width: '100%',
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e2e2',
    flexDirection: 'row',
  },
});
