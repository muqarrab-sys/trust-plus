import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import Bell from '@components/icons/Bell';
import Filter from '@components/icons/Filter';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import ArrowUp from '@components/icons/ArrowUp';
import ArrowDown from '@components/icons/ArrowDown';
import HomeTabBarScreen from '@screens/home/HomeTabBarScreen';
import CommonCurrency from '@components/commons/CommonCurrency';
import Time from '@components/icons/Time';
import BitcoinHomeTabBarScreen from '@screens/home/bitcoin/BitcoinHomeTabBarScreen';
import CommonTokenIcon from '@components/commons/CommonTokenIcon';
import {WalletService} from '@persistence/wallet/WalletService';
import {useNavigation} from '@react-navigation/native';
import CommonBackButton from '@components/commons/CommonBackButton';
import {cos} from 'react-native-reanimated';
import Cash from '@components/icons/Cash';
import Swap from '@components/icons/Swap';
import Send from '@components/icons/Send';
import Receive from '@components/icons/Receive';

export default function MainScreen({route}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const lang = useSelector(state => state?.LanguageReducer?.language);
  const {theme} = useSelector(state => state?.ThemeReducer);
  const {activeWallet} = useSelector(state => state?.WalletReducer);
  console.log('activeWalllet====>>>', activeWallet);
  console.log('lang===>>>', lang);
  useEffect(() => {
    (async () => {
      //await WalletService.getSubscribeWallets();
    })();
  }, []);
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.buttonColor1}]}>
      <View style={[styles.top, {backgroundColor: theme.buttonColor1}]}></View>
      <View style={styles.header}>
        <View style={{flex: 0.5}}>
          <CommonTouchableOpacity>
            <Bell />
          </CommonTouchableOpacity>
        </View>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <CommonCurrency
            style={[styles.balanceText, {color: theme.textColor3}]}
            value={activeWallet?.balance?.fiat}/>
        </View>

        <View style={{flex: 0.5}} />
        {activeWallet?.network?.symbol !== 'BTC' && (
          <CommonTouchableOpacity
            onPress={() => {
              navigation?.navigate('TokenScreen');
            }}>
            <Filter />
          </CommonTouchableOpacity>
        )}
      </View>
      <View style={styles.balance}>
        <CommonText style={[styles.walletText, {color: theme.textColor3}]}>
          {activeWallet?.name}
        </CommonText>
      </View>
      <View style={styles.controlContainer}>
        <View style={styles.control}>
          <CommonTouchableOpacity
            style={styles.element}
            onPress={() => console.log('pressed')}>
            <View style={styles.elementIcon}>
              <Cash />
            </View>
            <CommonText style={{color: theme.textColor3}}>
              {lang?.buy}
            </CommonText>
          </CommonTouchableOpacity>
          <CommonTouchableOpacity
            style={styles.element}
            onPress={() => console.log('pressed')}>
            <View style={styles.elementIcon}>
              <Swap />
            </View>
            <CommonText style={{color: theme.textColor3}}>
              {lang?.swap}
            </CommonText>
          </CommonTouchableOpacity>
          <CommonTouchableOpacity
            style={styles.element}
            onPress={() => {
              // console.log('====================================');
              // console.log('kfsdbsbsfgn', activeWallet?.network?.symbol);
              // console.log('====================================');
              // let nextScreen = 'BitcoinSendScreen';
              // console.log('nextScreen', nextScreen);
              if (activeWallet?.network?.symbol === 'ETH') {
                console.log('====================================');
                console.log(
                  'kfsdbsbsfgn',
                  'EthereumSendScreen',
                  activeWallet?.network?.symbol,
                );
                console.log('====================================');
                // nextScreen = 'EthereumSendScreen';
                navigation.navigate('EthereumSendScreen');
                // console.log('nextScreen===inEthereum>>>>', nextScreen);
              } else if (activeWallet?.network?.symbol === 'BNB') {
                // nextScreen = 'SmartChainSendScreen';
                navigation.navigate('SmartChainSendScreen');
              } else if (activeWallet?.network?.symbol == 'BTC') {
                navigation.navigate('BitcoinSendScreen');
              }
              // navigation.navigate(nextScreen);
            }}>
            <View style={styles.elementIcon}>
              <Send />
            </View>
            <CommonText style={{color: theme.textColor3}}>
              {lang?.send}
            </CommonText>
          </CommonTouchableOpacity>
          <CommonTouchableOpacity
            style={styles.element}
            onPress={() => {
              console.log(
                'activeWallet?.network?.symbol===>>>',
                activeWallet?.network?.symbol,
              );
              let nextScreen = 'BitcoinReceiveScreen';
              if (activeWallet?.network?.symbol === 'ETH') {
                nextScreen = 'EthereumReceiveScreen';
              } else if (activeWallet?.network?.symbol === 'BNB') {
                nextScreen = 'SmartChainReceiveScreen';
              }
              navigation.navigate(nextScreen);
            }}>
            <View style={styles.elementIcon}>
              <Receive />
            </View>
            <CommonText style={{color: theme.textColor3}}>
              {lang?.receive}
            </CommonText>
          </CommonTouchableOpacity>

          {/* <CommonTouchableOpacity
            style={styles.element}
            onPress={() => {
              // console.log('====================================');
              // console.log('kfsdbsbsfgn', activeWallet?.network?.symbol);
              // console.log('====================================');
              // let nextScreen = 'BitcoinSendScreen';
              // console.log('nextScreen', nextScreen);
              if (activeWallet?.network?.symbol === 'ETH') {
                console.log('====================================');
                console.log(
                  'kfsdbsbsfgn',
                  'EthereumSendScreen',
                  activeWallet?.network?.symbol,
                );
                console.log('====================================');
                // nextScreen = 'EthereumSendScreen';
                navigation.navigate('EthereumSendScreen');
                // console.log('nextScreen===inEthereum>>>>', nextScreen);
              } else if (activeWallet?.network?.symbol === 'BNB') {
                // nextScreen = 'SmartChainSendScreen';
                navigation.navigate('SmartChainSendScreen');
              } else if (activeWallet?.network?.symbol == 'BTC') {
                navigation.navigate('BitcoinSendScreen');
              }
              // navigation.navigate(nextScreen);
            }}>
            <View style={styles.elementIcon}>
              <ArrowUp />
            </View>
            <CommonText style={{color: theme.textColor3}}>
              {lang?.send}
            </CommonText>
          </CommonTouchableOpacity>
          <CommonTouchableOpacity
            style={styles.element}
            onPress={() => {
              console.log(
                'activeWallet?.network?.symbol===>>>',
                activeWallet?.network?.symbol,
              );
              let nextScreen = 'BitcoinReceiveScreen';
              if (activeWallet?.network?.symbol === 'ETH') {
                nextScreen = 'EthereumReceiveScreen';
              } else if (activeWallet?.network?.symbol === 'BNB') {
                nextScreen = 'SmartChainReceiveScreen';
              }
              navigation.navigate(nextScreen);
            }}>
            <View style={styles.elementIcon}>
              <ArrowDown />
            </View>
            <CommonText style={{color: theme.textColor3}}>
              {lang.receive}
            </CommonText>
          </CommonTouchableOpacity>
          <CommonTouchableOpacity
            style={styles.element}
            onPress={() => {
              let nextScreen = 'BitcoinTransactionScreen';
              if (activeWallet?.network?.symbol === 'ETH') {
                nextScreen = 'EthereumTransactionScreen';
              } else if (activeWallet?.network?.symbol === 'BNB') {
                nextScreen = 'SmartChainTransactionScreen';
              }
              navigation?.navigate(nextScreen);
            }}>
            <View style={styles.elementIcon}>
              <Time />
            </View>
            <CommonText style={{color: theme.textColor3}}>
              {lang?.history}
            </CommonText>
          </CommonTouchableOpacity> */}
        </View>
      </View>
      <View style={styles.contentContainer}>
        {activeWallet?.network?.symbol === 'BTC' ? (
          <BitcoinHomeTabBarScreen />
        ) : (
          <HomeTabBarScreen />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
  },
  header: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  top: {
    height: 240,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  logo: {
    width: 70,
    height: 50,
  },
  accountContainer: {
    marginTop: 24,
    height: 50,
    flexDirection: 'row',
  },
  operationContainer: {
    marginTop: 24,
    height: 84,
    borderRadius: 10,
    padding: 8,
    flexDirection: 'row',
  },
  operationItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  operationIcon: {
    width: 32,
    height: 32,
  },
  div: {
    width: 1,
    height: 57,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: -5,
  },
  activityContainer: {
    marginTop: 24,
    height: 275,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  activityItem: {
    width: '100%',
    height: 60,
    marginTop: 1,
    flexDirection: 'row',
  },
  activityIconContainer: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIcon: {
    width: 24,
    height: 24,
  },
  leftActivityItem: {
    flex: 4,
    justifyContent: 'center',
  },
  rightActivityItem: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  assets: {
    flex: 1,
  },
  assetTitle: {
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  assetText: {
    fontWeight: 'bold',
  },
  icon: {width: 32, height: 32, borderRadius: 5},
  item: {
    width: '100%',
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e2e2',
    flexDirection: 'row',
  },
  balance: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  walletText: {
    fontSize: 16,
  },
  controlContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  control: {
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
    backgroundColor: '#5C9EE2',
    borderRadius: 10,
    marginBottom: 5,
  },
});
