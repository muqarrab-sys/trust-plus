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

export default function BitcoinTransactionScreen({navigation, route}) {
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const {activeWallet, transactions} = useSelector(state => state.WalletReducer);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const renderItem = ({item}) => {
    return (
      <CommonTouchableOpacity
        style={styles.transactionItem}
        onPress={async () => {
          navigation.navigate('BitcoinTransactionDetailScreen', {
            item: item,
          });
        }}>
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
              <CommonImage
                source={require('@assets/transaction/loading.gif')}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            )}
            <CommonText>{item.status.confirmed ? lang.confirmed : lang.processing}</CommonText>
          </View>
          <CommonNumber style={{fontSize: 14}} value={item.value} symbol={activeWallet.network.symbol} />
        </View>
      </CommonTouchableOpacity>
    );
  };
  useEffect(() => {
    (() => {
      dispatch(WalletAction.getTransactions(activeWallet));
    })();
  }, [activeWallet.network.symbol]);
  return (
    <Root>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <View style={[styles.header, {backgroundColor: theme.mainColor}]}>
          <CommonBackButton
            color={'white'}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <CommonText style={styles.title}>{lang.history}</CommonText>
          <View style={{width: 40}}></View>
        </View>
        <View style={styles.contentContainer}>
          <CommonFlatList
            data={transactions}
            keyExtractor={item => item.txid.toString()}
            renderItem={renderItem}
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
});
