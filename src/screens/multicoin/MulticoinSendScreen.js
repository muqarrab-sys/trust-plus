import CommonButton from '@components/commons/CommonButton';
import CommonHeader from '@components/commons/CommonHeader';
import CommonText from '@components/commons/CommonText';
import BitcoinSendScreen from '@screens/bitcoin/BitcoinSendScreen';
import EthereumSendScreen from '@screens/ethereum/EthereumSendScreen';
import SmartChainSendScreen from '@screens/smartchain/SmartChainSendScreen';
import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

export default function MulticoinSendScreen({navigation, route}) {
  const {wallet} = route.params;
  const {theme} = useSelector(state => state.ThemeReducer);

  // if (wallet.balance.fiat === 0)
  //   return (
  //     <SafeAreaView style={{flex: 1}}>
  //       <CommonHeader onPressBack={() => navigation.goBack()} title="Send" />
  //       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //         <CommonText style={{margin: 20}}>You don`t have assets yet.</CommonText>

  //         <TouchableOpacity
  //           style={{width: 70, height: 40, justifyContent: 'center', alignItems: 'center'}}
  //           onPress={() => navigation.navigate('BuyScreen', {wallet})}>
  //           <CommonText style={{color: theme.backgroundColor2, fontSize: 18}}>Buy</CommonText>
  //         </TouchableOpacity>
  //       </View>
  //     </SafeAreaView>
  //   );

  if (wallet.symbol === 'BTC') return <BitcoinSendScreen wallet={wallet} />;
  if (wallet.symbol === 'ETH') return <EthereumSendScreen wallet={wallet} />;
  if (wallet.symbol === 'BNB') return <SmartChainSendScreen wallet={wallet} />;

  return (
    <View>
      <CommonHeader onPressBack={() => navigation.goBack()} title="Send" />
    </View>
  );
}
