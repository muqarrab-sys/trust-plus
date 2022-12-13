/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from '@components/commons/CommonBackButton';
import {useDispatch, useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import _ from 'lodash';
import CommonNumber from '@components/commons/CommonNumber';
import CommonTextInput from '@components/commons/CommonTextInput';
import CommonHorizontalText from '@components/commons/CommonHorizontalText';
import Gas from '@components/icons/Gas';
import CommonButton from '@components/commons/CommonButton';
import CommonLoading from '@components/commons/CommonLoading';
import CommonAlert from '@components/commons/CommonAlert';
import BitcoinWalletModule from '@modules/bitcoin/BitcoinWalletModule';
import CommonHeader from '@components/commons/CommonHeader';

const FIRST_INPUTS_CONTAINER_HEIGHT = 200;
const SECOND_INPUTS_CONTAINER_HEIGHT = 130;

export default function BitcoinConfirmationScreen({navigation, route}) {
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const dispatch = useDispatch();
  const {activeWallet} = useSelector(state => state.WalletReducer);
  const {options, recipientAddress, amount, fee, wallet} = route.params;

  useEffect(() => {}, []);

  const onSubmit = async () => {
    if (_.isNil(fee)) {
      return;
    }
    const params = {
      wif: activeWallet.privateKey,
      address: activeWallet.address,
      amount: parseFloat(amount),
      toAddress: recipientAddress,
      networkFee: fee.networkFee,
      serviceFee: fee.serviceFee,
    };
    CommonLoading.show();
    const tx = await BitcoinWalletModule.send(params);
    CommonLoading.hide();
    if (!_.isNil(tx)) {
      CommonAlert.popupSuccess({
        buttonText: lang.ok,
        callback: () => {
          navigation.navigate('BitcoinTransactionScreen');
        },
        title: lang.success,
        message: lang.yourTransactionHasBeenCompleted,
      });
    } else {
      CommonAlert.error({
        title: lang.error,
        text: lang.insufficientFund,
      });
    }
  };

  return (
    <Root>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <CommonHeader onPressBack={() => navigation.goBack()} title={lang?.transfer} />

        <View style={styles.contentContainer}>
          <View style={styles.amountsContainer}>
            <CommonText style={{fontSize: 20, fontWeight: '700'}}>
              -{amount} ({options?.amountType === 'coin' ? wallet?.network?.symbol : 'USD'})
            </CommonText>
            <CommonText style={{fontSize: 16, color: theme.textColor7}}>{`= ${
              options?.amountType !== 'coin' ? '$' : ''
            }${options?.convertedValue?.toFixed(2)} ${options?.amountType === 'coin' ? wallet?.network?.symbol : ''}`}</CommonText>
          </View>

          <View style={styles.contentContainer}>
            <View style={[styles.infoContainer, {borderColor: theme.borderColor1}]}>
              <View style={{width: 20}} />
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '100%', height: FIRST_INPUTS_CONTAINER_HEIGHT / 3.6}}>
                  <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingRight: 10}}>
                    <CommonText style={{fontSize: 16}}>Asset</CommonText>

                    <CommonText style={{fontSize: 16, color: theme.textColor7}}>
                      {wallet?.name} {wallet?.network?.symbol}
                    </CommonText>
                  </View>
                </View>

                <View style={{height: 0.5, width: '100%', backgroundColor: theme.textColor7}} />

                <View style={{width: '100%', height: FIRST_INPUTS_CONTAINER_HEIGHT / 2.4}}>
                  <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingRight: 10}}>
                    <CommonText style={{fontSize: 16}}>From</CommonText>

                    <View style={{flex: 1, paddingLeft: 50, alignItems: 'flex-end'}}>
                      <CommonText style={{fontSize: 16, color: theme.textColor7}}>{wallet?.name}</CommonText>
                      <CommonText numberOfLines={1} style={{fontSize: 16, color: theme.textColor7}}>
                        {wallet?.address}
                      </CommonText>
                    </View>
                  </View>
                </View>

                <View style={{height: 0.5, width: '100%', backgroundColor: theme.textColor7}} />

                <View style={{width: '100%', height: FIRST_INPUTS_CONTAINER_HEIGHT / 3}}>
                  <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingRight: 10}}>
                    <CommonText style={{fontSize: 16}}>To</CommonText>

                    <View style={{flex: 1, paddingLeft: 50, alignItems: 'flex-end'}}>
                      <CommonText numberOfLines={1} style={{fontSize: 16, color: theme.textColor7}}>
                        {recipientAddress}
                      </CommonText>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.infoContainer, {borderColor: theme.borderColor1, height: SECOND_INPUTS_CONTAINER_HEIGHT}]}>
              <View style={{width: 20}} />
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '100%', height: SECOND_INPUTS_CONTAINER_HEIGHT / 2}}>
                  <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingRight: 10}}>
                    <CommonText style={{fontSize: 16}}>Network Fee</CommonText>

                    <View style={{flex: 1, paddingLeft: 50, alignItems: 'flex-end'}}>
                      <CommonText style={{fontSize: 16, color: theme.textColor7}}>
                        {fee} ({wallet?.network?.symbol})
                      </CommonText>
                      <CommonText numberOfLines={1} style={{fontSize: 10, color: theme.textColor7}}>
                        ${fee}
                      </CommonText>
                    </View>
                  </View>
                </View>

                <View style={{height: 0.5, width: '100%', backgroundColor: theme.textColor7}} />

                <View style={{width: '100%', height: SECOND_INPUTS_CONTAINER_HEIGHT / 2}}>
                  <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingRight: 10}}>
                    <CommonText style={{fontSize: 16}}>Total</CommonText>

                    <View style={{flex: 1, paddingLeft: 50, alignItems: 'flex-end'}}>
                      <CommonText numberOfLines={1} style={{fontSize: 16, color: theme.textColor7}}>
                        ${100}
                      </CommonText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{padding: 20}}>
          <CommonButton label={lang?.confirm} style={{borderRadius: 8}} onPress={onSubmit} />
        </View>

        {/* <View style={styles.contentContainer}>
          <View style={styles.amountContainer}>
            <CommonNumber style={styles.amount} value={amount} symbol={options?.symbol} />
          </View>
          <CommonTextInput label={lang.from} value={wallet.address} />
          <CommonTextInput label={lang.to} value={recipientAddress} />
          <CommonHorizontalText label={lang.networkFee} value={fee.networkFee} />
          <CommonHorizontalText label={lang.serviceFee} value={fee.serviceFee} />
          <CommonHorizontalText label={lang.maxTotal} value={fee.totalAmount} />
          <CommonButton label={lang.send} onPress={onSubmit} />
        </View> */}
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  amountsContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginBottom: 40,
    height: FIRST_INPUTS_CONTAINER_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 3,
  },
  // header: {
  //   height: 50,
  //   width: '100%',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingRight: 10,
  // },
  // title: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: 'white',
  // },
  // contentContainer: {
  //   flex: 1,
  //   paddingLeft: 10,
  //   paddingRight: 10,
  // },

  // amount: {
  //   fontSize: 24,
  // },
  // gas: {width: 60, justifyContent: 'center', alignItems: 'flex-end'},
});
