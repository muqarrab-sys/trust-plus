import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import UniswapScreen from '@screens/uniswap/UniswapScreen';
import PancakeswapScreen from '@screens/pancakeswap/PancakeswapScreen';

export default function DexScreen({navigation, route}) {
  const {wallet} = route.params;

  if (wallet.symbol === 'ETH') return <UniswapScreen wallet={wallet} />;

  return <PancakeswapScreen wallet={wallet} />;
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
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e2e2',
    flexDirection: 'row',
  },
});
