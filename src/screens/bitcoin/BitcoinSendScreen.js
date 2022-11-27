import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Root} from 'popup-ui';
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

yup.addMethod(yup.string, 'isAddress', function (errorMessage, symbol) {
  return this.test(`test-address`, errorMessage, function (value) {
    const {path, createError} = this;
    if (symbol == 'BTC') {
      return (
        BitcoinUtil.validate(value, bitcoin?.networks?.testnet) ||
        createError({path, message: errorMessage})
      );
    } else {
      return (
        utils.isAddress(value) || createError({path, message: errorMessage})
      );
    }
  });
});
export default function BitcoinSendScreen({navigation, route}) {
  const lang = useSelector(state => state?.LanguageReducer?.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const {activeWallet} = useSelector(state => state?.WalletReducer);
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
  const {control, setValue, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  });
  const [vFee, setVFee] = useState({});
  const [fee, setFee] = useState({});
  useEffect(() => {
    (async () => {
      const fees = await BitcoinModuleService.getEstimateFee();
      setVFee(fees.fast);
    })();
  }, []);
  const onSubmit = async ({recipientAddress, amount}) => {
    navigation.navigate('BitcoinConfirmationScreen', {
      item: {},
      recipientAddress,
      amount,
      fee,
      vFee,
    });
  };
  const onCalculateFee = async ({recipientAddress, amount}) => {
    CommonLoading.show();
    const params = {
      wif: activeWallet?.privateKey,
      address: activeWallet?.address,
      amount: parseFloat(amount),
      toAddress: recipientAddress,
      rate: vFee,
    };
    const finalFee = await BitcoinWalletModule.getFee(params);
    if (!_.isNil(finalFee)) {
      setFee(finalFee);
    } else {
      CommonToast.error({
        title: lang.error,
        text: lang.insufficientFund,
      });
    }
    CommonLoading.hide();
  };
  return (
    <Root>
      <SafeAreaView
        style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <View style={[styles.header, {backgroundColor: theme.mainColor}]}>
          <CommonBackButton
            color={'white'}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <CommonText style={styles.title}>
            {lang.send} {activeWallet?.network?.symbol || ''}
          </CommonText>
          <CommonTouchableOpacity
            style={{width: 80}}
            onPress={() => handleSubmit(onSubmit)}>
            <CommonText style={styles.title}>{lang.continue}</CommonText>
          </CommonTouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <WalletAddressTextInput
                label={lang?.recipientAddress || 'test'}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                onPastePress={async () => {
                  const text = await Clipboard.getString();
                  setValue('recipientAddress', text);
                }}
                onScanPress={() => {
                  navigation.navigate('BitcoinScannerScreen', {
                    screenName: 'BitcoinSendScreen',
                    onCallback: data => {
                      setValue('recipientAddress', data, {
                        shouldValidate: true,
                      });
                    },
                  });
                }}
                value={value || 'test'}
                error={errors['recipientAddress']}
              />
            )}
            name="recipientAddress"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <WalletAmountTextInput
                label={`${lang.amount} ${activeWallet?.network?.symbol}`}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                onMaxPress={async () => {
                  setValue('amount', activeWallet?.balance?.val?.toString());
                }}
                value={value}
                error={errors['amount']}
                onEndEditing={handleSubmit(onCalculateFee)}
              />
            )}
            name="amount"
            defaultValue=""
          />
          <CommonHorizontalText
            label={lang.networkFee}
            value={fee.networkFee}
          />
          <CommonHorizontalText
            label={lang.serviceFee}
            value={fee.serviceFee}
          />
          <CommonHorizontalText label={lang.maxTotal} value={fee.totalAmount} />
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
    paddingLeft: 10,
    paddingRight: 10,
  },
  item: {
    width: '100%',
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e2e2',
    flexDirection: 'row',
  },
});
