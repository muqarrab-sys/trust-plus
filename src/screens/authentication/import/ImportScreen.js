import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from '@components/commons/CommonBackButton';
import {useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonFlatList from '@components/commons/CommonFlatList';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonImage from '@components/commons/CommonImage';

export default function ImportScreen({navigation, route}) {
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const [chains, setChains] = useState([
    {
      id: 'mul',
      name: 'Multi-Coin Wallet',
      logoURI: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=014',
    },
    {
      id: 'btc',
      name: 'Bitcoin',
      logoURI: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=014',
    },
    {
      id: 'eth',
      name: 'Ethereum',
      logoURI: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=013',
    },
    {
      id: 'bnb',
      name: 'Binance Smart Chain',
      logoURI: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=014',
    },
  ]);
  const renderItem = ({item}) => {
    return (
      <CommonTouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('MultiCoinScreen');
        }}
        key={item.id.toString()}>
        <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
          <CommonImage source={{uri: item.logoURI}} resizeMode={'contain'} style={{width: 32, height: 32}} />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CommonText style={{fontSize: 14}}>{item.name}</CommonText>
        </View>
      </CommonTouchableOpacity>
    );
  };
  return (
    <Root>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <View style={[styles.header, {backgroundColor: theme.mainColor}]}>
          <CommonBackButton
            color={'white'}
            onPress={() => {
              navigation.reset({
                routes: [{name: 'EntryScreen'}],
              });
            }}
          />
          <CommonText style={styles.title}>{lang.import}</CommonText>
          <View style={{width: 40}}></View>
        </View>
        <View style={styles.contentContainer}>
          <CommonFlatList data={chains} keyExtractor={item => item.id.toString()} renderItem={renderItem} />
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
});
