import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import BottomTabBarNavigator from '@modules/navigation/BottomTabBarNavigator';
import LoginScreen from '@screens/authentication/login/LoginScreen';
import SmartChainAssetScreen from '@screens/ethereum/asset/EthereumAssetScreen';
import BitcoinSendScreen from '@screens/bitcoin/BitcoinSendScreen';
import BitcoinConfirmationScreen from '@screens/bitcoin/BitcoinConfirmationScreen';
import BitcoinTransactionScreen from '@screens/bitcoin/BitcoinTransactionScreen';
import BitcoinTransactionDetailScreen from '@screens/bitcoin/BitcoinTransactionDetailScreen';
import BitcoinReceiveScreen from '@screens/bitcoin/BitcoinReceiveScreen';
import EthereumSendScreen from '@screens/ethereum/EthereumSendScreen';
import EthereumReceiveScreen from '@screens/ethereum/EthereumReceiveScreen';
import EthereumConfirmationScreen from '@screens/ethereum/EthereumConfirmationScreen';
import EthereumTransactionScreen from '@screens/ethereum/EthereumTransactionScreen';
import EthereumTransactionDetailScreen from '@screens/ethereum/EthereumTransactionDetailScreen';
import SmartChainSendScreen from '@screens/smartchain/SmartChainSendScreen';
import SmartChainReceiveScreen from '@screens/smartchain/SmartChainReceiveScreen';
import SmartChainConfirmationScreen from '@screens/smartchain/SmartChainConfirmationScreen';
import SmartChainTransactionScreen from '@screens/smartchain/SmartChainTransactionScreen';
import SmartChainTransactionDetailScreen from '@screens/smartchain/SmartChainTransactionDetailScreen';
import UniswapScreen from '@screens/uniswap/UniswapScreen';
import ERC20TokenScreen from '@screens/uniswap/ERC20TokenScreen';
import PancakeswapScreen from '@screens/pancakeswap/PancakeswapScreen';
import BEP20TokenScreen from '@screens/pancakeswap/BEP20TokenScreen';
import TokenScreen from '@screens/token/TokenScreen';
import ChartScreen from '@screens/chart/ChartScreen';
import DexScreen from '@screens/dex/DexScreen';
import PreferenceScreen from '@screens/setting/PreferenceScreen';
import SecurityScreen from '@screens/setting/SecurityScreen';
import EthereumExportScreen from '@screens/ethereum/EthereumExportScreen';
import SmartChainExportScreen from '@screens/smartchain/SmartChainExportScreen';
import BitcoinExportScreen from '@screens/bitcoin/BitcoinExportScreen';
import MarketplaceDetailScreen from '@screens/home/bitcoin/MarketplaceDetailScreen';
import WalletListScreen from '@screens/wallet/WalletListScreen';
import AddWalletStep1Screen from '@screens/wallet/AddWalletStep1Screen';
import AddWalletStep2Screen from '@screens/wallet/AddWalletStep2Screen';
import AddWalletStep3Screen from '@screens/wallet/AddWalletStep3Screen';
import SmartChainAssetReceiveScreen from '@screens/ethereum/asset/EthereumAssetReceiveScreen';
import SmartChainAssetSendScreen from '@screens/ethereum/asset/EthereumAssetSendScreen';
import SmartChainAssetConfirmationScreen from '@screens/ethereum/asset/EthereumAssetConfirmationScreen';
import SmartChainAssetTransactionScreen from '@screens/ethereum/asset/EthereumAssetTransactionScreen';
import SmartChainAssetTransactionDetailScreen from '@screens/ethereum/asset/EthereumAssetTransactionDetailScreen';
import LanguageScreen from '@screens/setting/LanguageScreen';
import EthereumAssetScreen from '@screens/ethereum/asset/EthereumAssetScreen';
import EthereumAssetReceiveScreen from '@screens/ethereum/asset/EthereumAssetReceiveScreen';
import EthereumAssetSendScreen from '@screens/ethereum/asset/EthereumAssetSendScreen';
import EthereumAssetConfirmationScreen from '@screens/ethereum/asset/EthereumAssetConfirmationScreen';
import EthereumAssetTransactionScreen from '@screens/ethereum/asset/EthereumAssetTransactionScreen';
import EthereumAssetTransactionDetailScreen from '@screens/ethereum/asset/EthereumAssetTransactionDetailScreen';
import SmartChainScannerScreen from '@screens/smartchain/SmartChainScannerScreen';
import SmartChainAssetScannerScreen from '@screens/smartchain/asset/SmartChainAssetScannerScreen';
import EthereumAssetScannerScreen from '@screens/ethereum/asset/EthereumAssetScannerScreen';
import EthereumScannerScreen from '@screens/ethereum/EthereumScannerScreen';
import BitcoinScannerScreen from '@screens/bitcoin/BitcoinScannerScreen';

const Stack = createStackNavigator();

function StackNavigator({style}) {
  useEffect(() => {}, []);
  return (
    <View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="BottomTabBarNavigator"
          component={BottomTabBarNavigator}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AssetScreen" component={EthereumAssetScreen} />
        <Stack.Screen name="WalletListScreen" component={WalletListScreen} />
        <Stack.Screen
          name="AddWalletStep1Screen"
          component={AddWalletStep1Screen}
        />
        <Stack.Screen
          name="AddWalletStep2Screen"
          component={AddWalletStep2Screen}
        />
        <Stack.Screen
          name="AddWalletStep3Screen"
          component={AddWalletStep3Screen}
        />
        <Stack.Screen name="BitcoinSendScreen" component={BitcoinSendScreen} />
        <Stack.Screen
          name="BitcoinConfirmationScreen"
          component={BitcoinConfirmationScreen}
        />
        <Stack.Screen
          name="BitcoinTransactionScreen"
          component={BitcoinTransactionScreen}
        />
        <Stack.Screen
          name="BitcoinTransactionDetailScreen"
          component={BitcoinTransactionDetailScreen}
        />
        <Stack.Screen
          name="BitcoinReceiveScreen"
          component={BitcoinReceiveScreen}
        />
        <Stack.Screen
          name="BitcoinExportScreen"
          component={BitcoinExportScreen}
        />
        <Stack.Screen
          name="BitcoinScannerScreen"
          component={BitcoinScannerScreen}
        />

        <Stack.Screen
          name="MarketplaceDetailScreen"
          component={MarketplaceDetailScreen}
        />
        <Stack.Screen
          name="EthereumSendScreen"
          component={EthereumSendScreen}
        />
        <Stack.Screen
          name="EthereumReceiveScreen"
          component={EthereumReceiveScreen}
        />
        <Stack.Screen
          name="EthereumConfirmationScreen"
          component={EthereumConfirmationScreen}
        />
        <Stack.Screen
          name="EthereumTransactionScreen"
          component={EthereumTransactionScreen}
        />
        <Stack.Screen
          name="EthereumTransactionDetailScreen"
          component={EthereumTransactionDetailScreen}
        />
        <Stack.Screen
          name="EthereumAssetScreen"
          component={EthereumAssetScreen}
        />
        <Stack.Screen
          name="EthereumAssetReceiveScreen"
          component={EthereumAssetReceiveScreen}
        />
        <Stack.Screen
          name="EthereumAssetSendScreen"
          component={EthereumAssetSendScreen}
        />
        <Stack.Screen
          name="EthereumAssetConfirmationScreen"
          component={EthereumAssetConfirmationScreen}
        />
        <Stack.Screen
          name="EthereumAssetTransactionScreen"
          component={EthereumAssetTransactionScreen}
        />
        <Stack.Screen
          name="EthereumAssetTransactionDetailScreen"
          component={EthereumAssetTransactionDetailScreen}
        />
        <Stack.Screen
          name="SmartChainAssetScreen"
          component={SmartChainAssetScreen}
        />
        <Stack.Screen
          name="SmartChainAssetReceiveScreen"
          component={SmartChainAssetReceiveScreen}
        />
        <Stack.Screen
          name="SmartChainAssetSendScreen"
          component={SmartChainAssetSendScreen}
        />
        <Stack.Screen
          name="SmartChainAssetConfirmationScreen"
          component={SmartChainAssetConfirmationScreen}
        />
        <Stack.Screen
          name="SmartChainAssetTransactionScreen"
          component={SmartChainAssetTransactionScreen}
        />
        <Stack.Screen
          name="SmartChainAssetTransactionDetailScreen"
          component={SmartChainAssetTransactionDetailScreen}
        />
        <Stack.Screen
          name="EthereumExportScreen"
          component={EthereumExportScreen}
        />
        <Stack.Screen
          name="SmartChainSendScreen"
          component={SmartChainSendScreen}
        />
        <Stack.Screen
          name="SmartChainReceiveScreen"
          component={SmartChainReceiveScreen}
        />
        <Stack.Screen
          name="SmartChainConfirmationScreen"
          component={SmartChainConfirmationScreen}
        />
        <Stack.Screen
          name="SmartChainTransactionScreen"
          component={SmartChainTransactionScreen}
        />
        <Stack.Screen
          name="SmartChainTransactionDetailScreen"
          component={SmartChainTransactionDetailScreen}
        />
        <Stack.Screen
          name="SmartChainExportScreen"
          component={SmartChainExportScreen}
        />
        <Stack.Screen name="UniswapScreen" component={UniswapScreen} />
        <Stack.Screen name="ERC20TokenScreen" component={ERC20TokenScreen} />
        <Stack.Screen name="PancakeswapScreen" component={PancakeswapScreen} />
        <Stack.Screen name="BEP20TokenScreen" component={BEP20TokenScreen} />
        <Stack.Screen name="TokenScreen" component={TokenScreen} />
        <Stack.Screen name="ChartScreen" component={ChartScreen} />
        <Stack.Screen name="DexScreen" component={DexScreen} />
        <Stack.Screen name="PreferenceScreen" component={PreferenceScreen} />
        <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
        <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
        <Stack.Screen
          name="SmartChainScannerScreen"
          component={SmartChainScannerScreen}
        />
        <Stack.Screen
          name="SmartChainAssetScannerScreen"
          component={SmartChainAssetScannerScreen}
        />
        <Stack.Screen
          name="EthereumAssetScannerScreen"
          component={EthereumAssetScannerScreen}
        />
        <Stack.Screen
          name="EthereumScannerScreen"
          component={EthereumScannerScreen}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
});
export default StackNavigator;
