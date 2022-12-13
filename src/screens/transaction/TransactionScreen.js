import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from '@components/commons/CommonBackButton';
import {useDispatch, useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonFlatList from '@components/commons/CommonFlatList';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonImage from '@components/commons/CommonImage';
import _ from 'lodash';
import CommonNumber from '@components/commons/CommonNumber';
import {WalletAction} from '@persistence/wallet/WalletAction';
import CommonHeader from '@components/commons/CommonHeader';
import Graph from '@components/icons/Graph';
import Swap from '@components/icons/Swap';
import Cash from '@components/icons/Cash';
import Send from '@components/icons/Send';
import Receive from '@components/icons/Receive';
import CommonButton from '@components/commons/CommonButton';

export default function TransactionScreen({navigation, route}) {
  const {marketCapData} = route.params;
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const {activeWallet, transactions} = useSelector(state => state.WalletReducer);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    console.log(activeWallet);
    dispatch(WalletAction.getTransactions(activeWallet));
  }, [activeWallet]);

  const ListEmptyComponent = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CommonImage source={require('@assets/images/EmptyCart.png')} />
      <CommonText style={{fontSize: 12, color: theme.textColor7, marginTop: 10, marginBottom: 60}}>{lang.transactionsWillBeShownHere}</CommonText>
      <CommonButton
        style={{width: 100, height: 40, borderRadius: 8}}
        labelStyle={{fontSize: 16}}
        label="Buy"
        onPress={() => {
          navigation.navigate('BuyScreen', {wallet: activeWallet});
        }}
      />
    </View>
  );

  const renderItem = ({item}) => {
    return (
      <CommonTouchableOpacity style={styles.transactionItem} onPress={async () => navigation.navigate('TransactionDetailScreen', {item})}>
        <View style={styles.transactionIconContainer}>
          {
            <CommonImage
              source={item.sender ? require('@assets/transaction/send.png') : require('@assets/transaction/receive.png')}
              style={styles.transactionIcon}
            />
          }
        </View>
        <View style={styles.transactionInformation}>
          <View style={{flex: 1}}>
            {item.status.confirmed ? (
              <CommonText style={styles.time}>{item.date}</CommonText>
            ) : (
              <CommonImage source={require('@assets/transaction/loading.gif')} style={{width: 24, height: 24}} />
            )}
            <CommonText>{item.status.confirmed ? lang.confirmed : lang.processing}</CommonText>
          </View>
          <CommonNumber style={{fontSize: 14}} value={item.value} symbol={activeWallet.network.symbol} />
        </View>
      </CommonTouchableOpacity>
    );
  };

  return (
    <Root>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <CommonHeader
          onPressBack={() => navigation.goBack()}
          backButtonColor={theme.buttonColor1}
          containerStyle={{backgroundColor: theme.backgroundColor5}}
          rightChild={
            <View>
              <CommonText style={{fontSize: 12}}>
                <Graph />
                {'  '}
                <CommonText style={{color: theme.textColor7}}>${marketCapData?.priceChange24Hour?.toFixed(6) || '--'}</CommonText>
                {'  '}
                <CommonText style={[styles.assetChange, {color: marketCapData?.priceChangePercentage24h > 0 ? '#33C16C' : '#FF6262'}]}>
                  {marketCapData?.priceChangePercentage24h?.toFixed(2) || '--'}%
                </CommonText>
              </CommonText>
            </View>
          }
        />
        <View style={[styles.infoHeaderContainer, {backgroundColor: theme.backgroundColor5}]}>
          <CommonImage source={{uri: activeWallet.logoURI}} style={styles.tokenIcon} />
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
            <CommonText style={{color: theme.textColor1, fontSize: 18, fontWeight: 'bold'}}>
              <CommonText>{activeWallet?.balance?.val}</CommonText>
              {'  '}
              <CommonText>{activeWallet?.network?.symbol}</CommonText>
            </CommonText>
            <CommonText>{`= $${activeWallet?.balance.fiat}`}</CommonText>
          </View>
          <View style={styles.controlContainer}>
            <View style={styles.control}>
              <CommonTouchableOpacity style={styles.element} onPress={() => console.log('pressed')}>
                <View style={[styles.elementIcon, {backgroundColor: theme.buttonColor1}]}>
                  <Cash />
                </View>
                <CommonText style={{color: theme.buttonColor1}}>{lang?.stake}</CommonText>
              </CommonTouchableOpacity>
              {activeWallet?.network?.exchangeId ? (
                <CommonTouchableOpacity style={styles.element} onPress={() => navigation.navigate('DexScreen', {wallet: activeWallet})}>
                  <View style={[styles.elementIcon, {backgroundColor: theme.buttonColor1}]}>
                    <Swap />
                  </View>
                  <CommonText style={{color: theme.buttonColor1}}>{lang?.swap}</CommonText>
                </CommonTouchableOpacity>
              ) : null}
              <CommonTouchableOpacity style={styles.element} onPress={() => navigation.navigate('MulticoinSendScreen', {wallet: activeWallet})}>
                <View style={[styles.elementIcon, {backgroundColor: theme.buttonColor1}]}>
                  <Send />
                </View>
                <CommonText style={{color: theme.buttonColor1}}>{lang?.send}</CommonText>
              </CommonTouchableOpacity>
              <CommonTouchableOpacity
                style={styles.element}
                onPress={() => navigation?.navigate('MultiCoinReceiveScreen', {wallet: activeWallet, marketCapData})}>
                <View style={[styles.elementIcon, {backgroundColor: theme.buttonColor1}]}>
                  <Receive />
                </View>
                <CommonText style={{color: theme.buttonColor1}}>{lang?.receive}</CommonText>
              </CommonTouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <CommonFlatList
            data={transactions}
            keyExtractor={item => item.txid.toString()}
            ListEmptyComponent={ListEmptyComponent}
            renderItem={renderItem}
            contentContainerStyle={{flexGrow: 1}}
            onRefresh={() => {
              dispatch(WalletAction.getTransactions(activeWallet)).then(() => {
                setIsRefreshing(false);
              });
            }}
            refreshing={isRefreshing}
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
  infoHeaderContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenIcon: {
    width: 50,
    height: 50,
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
    marginTop: -10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: '#fff',
  },
  item: {
    width: '100%',
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e2e2',
    flexDirection: 'row',
  },
  transactionItem: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderBottomColor: '#d5d5d5',
  },
  transactionIconContainer: {
    width: 48,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInformation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 32,
    height: 32,
    transform: [{rotate: '180deg'}],
  },
  processing: {
    width: 60,
    height: 20,
    borderRadius: 10,
  },
  time: {},
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
    borderRadius: 10,
    marginBottom: 5,
  },
});
