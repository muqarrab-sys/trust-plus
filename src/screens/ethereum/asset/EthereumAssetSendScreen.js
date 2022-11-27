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
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import _ from 'lodash';
import CommonHorizontalText from '@components/commons/CommonHorizontalText';
import {EthereumService} from '@persistence/ethereum/EthereumService';
import {applicationProperties} from '@src/application.properties';
import CommonToast from '@components/commons/CommonToast';

export default function EthereumAssetSendScreen({navigation, route}) {
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const {activeWallet} = useSelector(state => state.WalletReducer);
  const {activeAsset} = useSelector(state => state.AssetReducer);
  const [fee, setFee] = useState({});
  const schema = yup.object().shape({
    recipientAddress: yup
      .string()
      .required(lang.recipientAddress + ' ' + lang.isARequiredField)
      .isAddress(
        lang.address + ' ' + lang.isIncorrect,
        activeWallet.network.symbol,
      ),
    amount: yup
      .number()
      .positive(lang.mustGreaterThan0)
      .typeError(lang.amount + ' ' + lang.isIncorrect),
  });
  const {control, setValue, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  });
  const [gasLimit, setGasLimit] = useState(38000);
  const [selectedGas, setSelectedGas] = useState({});
  const [valid, setValid] = useState(false);
  useEffect(() => {
    (async () => {
      const gasTracker = await EthereumService.getGasFee();
      setSelectedGas(gasTracker);
    })();
  }, []);
  const onCalculateFee = async ({recipientAddress, amount}) => {
    const requestAmount = parseFloat(amount);
    const networkFee = selectedGas.proposeGasPriceEther * 2;
    const serviceFee = 0.00001;
    setFee({
      requestAmount: requestAmount.toFixed(9),
      networkFee: networkFee,
      serviceFee: serviceFee,
      gasPrice: selectedGas,
      gasLimit: gasLimit,
    });
    if (
      requestAmount < activeAsset.balance.val &&
      serviceFee < activeWallet.balance.val
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  };
  const onSubmit = async ({recipientAddress, amount}) => {
    if (valid) {
      navigation.navigate('EthereumAssetConfirmationScreen', {
        recipientAddress,
        amount,
        fee,
      });
    } else {
      CommonToast.error({
        title: lang.error,
        text: lang.insufficientFund,
      });
    }
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
            {lang.send} {activeAsset.symbol}
          </CommonText>
          <CommonTouchableOpacity
            style={{width: 80}}
            onPress={handleSubmit(onSubmit)}>
            <CommonText style={styles.title}>{lang.continue}</CommonText>
          </CommonTouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <WalletAddressTextInput
                label={lang.recipientAddress}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                onPastePress={async () => {
                  const text = await Clipboard.getString();
                  setValue('recipientAddress', text);
                }}
                onScanPress={() => {
                  navigation.navigate('EthereumAssetScannerScreen', {
                    screenName: 'EthereumAssetSendScreen',
                    onCallback: data => {
                      setValue('recipientAddress', data, {
                        shouldValidate: true,
                      });
                    },
                  });
                }}
                value={value}
                error={errors['recipientAddress']}
                onEndEditing={handleSubmit(onCalculateFee)}
              />
            )}
            name="recipientAddress"
            defaultValue=""
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <WalletAmountTextInput
                label={`${lang.amount} ${activeAsset.symbol}`}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                onMaxPress={async () => {
                  setValue('amount', activeAsset.balance.val.toString());
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
            symbol={activeWallet.network.symbol}
          />
          <CommonHorizontalText
            label={lang.serviceFee}
            value={fee.serviceFee}
            symbol={activeWallet.network.symbol}
          />
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
