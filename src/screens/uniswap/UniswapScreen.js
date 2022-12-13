import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import NumberFormat from 'react-number-format';
import UniswapModule from '@modules/uniswap/UniswapModule';
import CommonText from '@components/commons/CommonText';
import CommonButton from '@components/commons/CommonButton';
import Down from '@components/icons/Down';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonTokenIcon from '@components/commons/CommonTokenIcon';
import Exchange from '@components/icons/Exchange';
import CommonLoading from '@components/commons/CommonLoading';
import {useNavigation} from '@react-navigation/native';
import CommonHeader from '@components/commons/CommonHeader';

export default function UniswapScreen({wallet}) {
  const navigation = useNavigation();
  const {language} = useSelector(state => state.LanguageReducer);
  // const {activeWallet} = useSelector(state => state.WalletReducer);
  const [fromToken, setFromToken] = useState({balance: {}});
  const [toToken, setToToken] = useState({balance: {}});
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [trade, setTrade] = useState([]);
  const [rate, setRate] = useState(0);
  const [error, setError] = useState('Enter an amount');
  const {theme} = useSelector(state => state.ThemeReducer);
  const isValidTrade = value => {
    const finalValue = value;
    return !_.isEmpty(toToken.balance) && finalValue > 0 && finalValue != '';
  };
  const init = async () => {
    setFromToken(await UniswapModule.commonToken(wallet.wallet));
    setToToken({balance: {}});
    setToValue('');
    setTrade([]);
  };

  const reset = async () => {
    //reset fromToken
    const token = {...fromToken};
    token.balance = await UniswapModule.tokenBalance(wallet.wallet, fromToken);
    setFromToken(token);
    setFromValue('');
    //reset toToken
    const token2 = {...toToken};
    token2.balance = await UniswapModule.tokenBalance(wallet.wallet, token2);
    setToToken(token2);
    setToValue('');
    //reset Trade
    setTrade([]);
    //reset Error
    setError('Enter an amount');
  };

  const exchange = async (from, to, value) => {
    if (isValidTrade(value)) {
      setError('Loading...');
      const finalValue = value;
      const exchange = await UniswapModule.trade(wallet.address, from, to, finalValue);
      if (typeof exchange !== 'string') {
        setToValue(exchange.expectedConvertQuote);
        setTrade(exchange);
        setRate(_.toNumber(exchange.expectedConvertQuote) / _.toNumber(finalValue));
        setError('Swap');
      } else {
        setError(exchange);
      }
    }
  };
  const min = (a, b) => {
    return Math.min(a, b).toString();
  };
  const swapPosition = async () => {
    const fromTokenTemp = toToken;
    const fromValueTemp = toValue;
    setToValue(fromValue);
    setToToken(fromToken);
    setFromValue(fromValueTemp);
    setFromToken(fromTokenTemp);
    await exchange(fromTokenTemp.address, fromToken.address, fromValueTemp);
  };

  const swap = async () => {
    CommonLoading.show();
    const result = await UniswapModule.swap(wallet.wallet, trade);
    if (typeof result == 'string') {
      setError(result);
    } else {
      await reset();
    }
    CommonLoading.hide();
  };
  useEffect(() => {
    (async () => {
      await init();
    })();
  }, []);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
      <CommonHeader onPressBack={() => navigation.goBack()} title={language.uniswap} textAlign="flex-start" />
      <View style={styles.contentContainer}>
        <View>
          <View style={[styles.row, {backgroundColor: theme.backgroundColor3}]}>
            <View style={[styles.half, {flex: 2}]}>
              <CommonTouchableOpacity
                style={[styles.coin, {backgroundColor: theme.backgroundColor3}]}
                onPress={() => {
                  navigation.navigate('ERC20TokenScreen', {
                    onSelect: async token => {
                      const balance = await UniswapModule.tokenBalance(wallet.wallet, token);
                      setFromToken({...token, balance: balance});
                      setFromValue('');
                      setToValue('');
                      setTrade([]);
                    },
                    currentToken: toToken.symbol,
                  });
                }}>
                <CommonTokenIcon uri={fromToken.logoURI} />
                <CommonText style={styles.label}>{fromToken.symbol}</CommonText>
                <Down />
              </CommonTouchableOpacity>
              <View style={styles.amount}>
                <TextInput
                  style={[styles.textInput, {color: theme.textColor}]}
                  placeholder={'0.0'}
                  value={fromValue}
                  onChangeText={async text => {
                    setFromValue(text);
                  }}
                  onEndEditing={async () => {
                    const finalValue = min(fromValue, fromToken.balance.val);
                    setFromValue(finalValue);
                    await exchange(fromToken.address, toToken.address, finalValue);
                  }}
                />
              </View>
            </View>
            <View style={styles.half}>
              <View style={[styles.amount, {flex: 2, flexDirection: 'row', alignItems: 'center'}]}>
                <View>
                  <NumberFormat
                    value={fromToken.balance.val}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={4}
                    renderText={value => (
                      <CommonText>
                        {language.balance}: {value}
                      </CommonText>
                    )}
                  />
                </View>
                <View style={[styles.half, {paddingLeft: 5}]}>
                  <CommonText>{fromToken.symbol}</CommonText>
                  <CommonTouchableOpacity
                    onPress={async () => {
                      const finalValue = fromToken.balance.val;
                      setFromValue(finalValue);
                      await exchange(fromToken.address, toToken.address, finalValue);
                    }}>
                    <CommonText style={{color: `rgb(232, 0, 111)`, fontWeight: 'bold'}}> ({language.max})</CommonText>
                  </CommonTouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.row, {backgroundColor: theme.backgroundColor3}]}>
            <View style={[styles.half, {flex: 2}]}>
              <CommonTouchableOpacity
                style={[styles.coin, {backgroundColor: theme.backgroundColor3}]}
                onPress={() => {
                  navigation.navigate('ERC20TokenScreen', {
                    onSelect: async token => {
                      const balance = await UniswapModule.tokenBalance(wallet.wallet, token);
                      setToToken({...token, balance: balance});
                      await exchange(fromToken.address, token.address, fromValue);
                    },
                    currentToken: fromToken.symbol,
                  });
                }}>
                <CommonTokenIcon uri={toToken.logoURI} />
                <CommonText style={styles.label}>{toToken.symbol}</CommonText>
                <Down />
              </CommonTouchableOpacity>
              <View style={styles.amount}>
                <TextInput
                  style={[styles.textInput, {color: theme.textColor}]}
                  placeholder={'0.0'}
                  value={toValue}
                  onChangeText={text => {
                    setToValue(text);
                  }}
                  onEndEditing={async () => {
                    let finalValue = toValue / rate;
                    finalValue = min(finalValue, fromToken.balance.val);
                    setFromValue(finalValue);
                    await exchange(fromToken.address, toToken.address, finalValue);
                  }}
                />
              </View>
            </View>
            <View style={styles.half}>
              <View style={[styles.amount, {flex: 2, flexDirection: 'row', alignItems: 'center'}]}>
                <View>
                  <NumberFormat
                    value={toToken.balance.val}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={4}
                    renderText={value => (
                      <CommonText>
                        {language.balance}: {value}
                      </CommonText>
                    )}
                  />
                </View>
                <View style={[styles.half, {paddingLeft: 5}]}>
                  <CommonText>{toToken.symbol}</CommonText>
                </View>
              </View>
            </View>
          </View>

          <CommonTouchableOpacity
            style={[styles.exchangeButton, {borderColor: theme.backgroundColor3}]}
            onPress={async () => {
              await swapPosition();
            }}>
            <Exchange />
          </CommonTouchableOpacity>
        </View>
        <View style={[styles.exchangeRate, {backgroundColor: theme.backgroundColor3}]}>
          <CommonText>Uniswap {trade.uniswapVersion}</CommonText>
          <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            {rate > 0 && (
              <NumberFormat
                value={rate}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={4}
                renderText={value => (
                  <CommonText>
                    1 {fromToken.symbol} ~ {value} {toToken.symbol}
                  </CommonText>
                )}
              />
            )}
          </View>
        </View>
        <View style={{marginTop: 0}}>
          <CommonButton
            label={error}
            style={{backgroundColor: error == 'Swap' ? theme.buttonColor1 : '#d73a4a'}}
            onPress={async () => {
              if (error == 'Swap') {
                await swap();
              }
            }}
          />
        </View>
        <View style={[styles.transaction, {backgroundColor: theme.backgroundColor3}]}>
          <View style={styles.transactionRow}>
            <CommonText>{language.route}</CommonText>
            <CommonText>{trade.routeText}</CommonText>
          </View>
          <View style={styles.transactionRow}>
            <CommonText>{language.minimumedReceived}</CommonText>
            <NumberFormat
              value={trade.minAmountConvertQuote || ''}
              displayType={'text'}
              thousandSeparator={true}
              decimalScale={4}
              renderText={value => <CommonText>{value}</CommonText>}
            />
          </View>
          <View style={styles.transactionRow}>
            <CommonText>{language.slippageTolerance}</CommonText>
            <CommonText>0.05%</CommonText>
          </View>
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
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    width: '100%',
    height: 100,
    backgroundColor: '#f7f8fa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  half: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coin: {
    minWidth: 50,
    height: '80%',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#b1b1b1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.24,
    shadowRadius: 10.32,
    elevation: 5,
    padding: 5,
  },
  label: {
    fontWeight: 'bold',
    marginLeft: 3,
    marginRight: 3,
  },
  icon: {
    width: 24,
    height: 24,
  },
  amount: {
    justifyContent: 'center',
    flex: 1,
  },
  textInput: {width: '100%', height: '80%', textAlign: 'right', fontSize: 20},
  exchangeRate: {
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f8fa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  exchangeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 10,
  },
  exchangeButton: {
    width: 32,
    height: 32,
    backgroundColor: '#f7f8fa',
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 5,
    zIndex: 99999,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '43%',
    left: '45%',
  },
  transaction: {
    width: '100%',
    minHeight: 100,
    backgroundColor: '#f7f8fa',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  transactionRow: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
