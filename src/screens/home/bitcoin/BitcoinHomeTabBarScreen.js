import React, {useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import data from './data.json';
import CommonImage from '@components/commons/CommonImage';
import CommonText from '@components/commons/CommonText';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NFTsScreen from '../NFTsScreen';
import AddToken from '@components/icons/AddToken';

const Tab = createMaterialTopTabNavigator();

const listData = [
  {logo: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579', name: 'Bitcoin', rate: 16469.55, change: '1.6%', value: 0, id: 'BTC'},
  {logo: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880', name: 'Ethereum', rate: 1220.84, change: '4.2%', value: 0, id: 'ETH'},
  {logo: 'https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1668148663', name: 'Tether', rate: 1.0, change: '0.1%', value: 0, id: 'USDT'},
  {logo: 'https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1644979850"', name: 'BNB', rate: 296.61, change: '1.1%', value: 0, id: 'BNB'},
  {logo: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389', name: 'USD Coin', rate: 0.999426, change: '-0.1%', value: 0, id: 'USDC'},
  {logo: 'https://assets.coingecko.com/coins/images/9576/thumb/BUSD.png?1568947766', name: 'Binance USD', rate: 1.0, change: '-0.1%', value: 0, id: 'BUSD'},
  {logo: 'https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png?1605778731', name: 'XRP', rate: 0.39951, change: '2.2%', value: 0, id: 'XRP'},
  {logo: 'https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860', name: 'Cardano', rate: 0.310768, change: '-0.2%', value: 0, id: 'ADA'},
  {logo: 'https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png?1547792256', name: 'Dogecoin', rate: 0.102592, change: '7.2%', value: 0, id: 'DOGE'},
];

export default function BitcoinHomeTabBarScreen() {
  const {language} = useSelector(state => state.LanguageReducer);
  const {theme} = useSelector(state => state.ThemeReducer);
  const navigation = useNavigation();
  useEffect(() => {}, []);

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.assetContainer}>
      <View style={styles.assetIconContainer}>
        <CommonImage source={{uri: item.logo}} style={styles.assetIcon} />
      </View>
      <View style={[styles.assetInformationContainer, {borderBottomColor: theme.textColor2}]}>
        <View>
          <CommonText style={styles.assetTitle}>{item.name}</CommonText>
          <CommonText>
            <CommonText style={styles.assetRate}>{`$${item.rate.toLocaleString()}`}</CommonText>
            {'  '}
            <CommonText style={styles.assetChange}>{item.change}</CommonText>
          </CommonText>
        </View>
        <View>
          <CommonText style={styles.currentAssetValue}>
            <CommonText>{item.value} </CommonText>
            <CommonText>{item.id}</CommonText>
          </CommonText>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ListFooterComponent = () => (
    <View style={styles.addTokenContainer}>
      <TouchableOpacity style={styles.addTokenButton}>
        <AddToken />
        <CommonText style={[styles.addTokenButtonText, {color: theme.textColor7}]}>{language.addTokens}</CommonText>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
      <Tab.Navigator style={{borderRadius: 5}}>
        <Tab.Screen
          name="Assets"
          component={() => {
            return (
              <FlatList
                data={listData}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={{}}
                ListHeaderComponent={() => <View style={{height: 10}} />}
                ListFooterComponent={ListFooterComponent}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            );
          }}
        />
        <Tab.Screen name="NFT" component={NFTsScreen} />
      </Tab.Navigator>
    </View>
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
    color: '#FF6262',
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
