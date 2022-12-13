import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CommonImage from '@components/commons/CommonImage';
import CommonText from '@components/commons/CommonText';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import AddToken from '@components/icons/AddToken';
import {TokenService} from '@persistence/token/TokenService';
import {WalletAction} from '@persistence/wallet/WalletAction';

export default function MulticoinTokensScreen() {
  const {language} = useSelector(state => state.LanguageReducer);
  const {theme} = useSelector(state => state.ThemeReducer);
  const {activeMulticoinWallet} = useSelector(state => state?.MulticoinReducer);
  const [marketCapData, setMarketCapData] = React.useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      activeMulticoinWallet.wallets.forEach(async item => {
        const [response] = await TokenService.getMarketCapData(item.symbol, 'usd');
        setMarketCapData(prevState => ({
          ...prevState,
          [item.symbol]: {
            ...prevState[item.symbol],
            currentPrice: response?.current_price,
            priceChangePercentage24h: response?.price_change_percentage_24h,
            priceChange24Hour: response?.price_change_24h,
          },
        }));
      });
    })();
  }, [activeMulticoinWallet]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.assetContainer}
      onPress={() => {
        dispatch(WalletAction.setActiveWallet(item)).then(() => {
          navigation?.navigate('TransactionScreen', {chainId: item.chainId, marketCapData: marketCapData[item.symbol]});
        });
      }}>
      <View style={styles.assetIconContainer}>
        <CommonImage source={{uri: item.logoURI}} style={styles.assetIcon} />
      </View>
      <View style={[styles.assetInformationContainer, {borderBottomColor: theme.textColor2}]}>
        <View>
          <CommonText style={styles.assetTitle}>{item.name}</CommonText>
          <CommonText>
            <CommonText style={styles.assetRate}>{`$${marketCapData[item.symbol]?.currentPrice?.toLocaleString() || '--'}`}</CommonText>
            {'  '}
            <CommonText style={[styles.assetChange, {color: marketCapData[item.symbol]?.priceChangePercentage24h > 0 ? '#33C16C' : '#FF6262'}]}>
              {marketCapData[item.symbol]?.priceChangePercentage24h?.toFixed(2) || '--'}%
            </CommonText>
          </CommonText>
        </View>
        <View>
          <CommonText style={styles.currentAssetValue}>
            <CommonText>{item.balance.val?.toFixed(4)} </CommonText>
            <CommonText>{item.symbol}</CommonText>
          </CommonText>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ListFooterComponent = () => (
    <View style={styles.addTokenContainer}>
      <TouchableOpacity style={styles.addTokenButton} onPress={() => navigation?.navigate('TokenScreen', {chainId: 1})}>
        <AddToken />
        <CommonText style={[styles.addTokenButtonText, {color: theme.textColor7}]}>{language.addTokens}</CommonText>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={activeMulticoinWallet.wallets}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={{}}
      ListHeaderComponent={() => <View style={{height: 10}} />}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  assetContainer: {
    width: '100%',
    paddingLeft: 10,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  assetIconContainer: {
    marginRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetIcon: {
    width: 50,
    height: 50,
  },
  assetInformationContainer: {
    borderBottomWidth: 1,
    flex: 6,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 30,
  },
  assetTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  assetRate: {
    fontSize: 13,
  },
  assetChange: {
    fontSize: 12,
  },
  currentAssetValue: {
    fontSize: 19,
  },
  addTokenContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTokenButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTokenButtonText: {
    marginLeft: 10,
    fontSize: 19,
  },
});
