import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import UniswapScreen from '@screens/uniswap/UniswapScreen';
import ERC20TokenScreen from '@screens/uniswap/ERC20TokenScreen';
import PancakeswapScreen from '@screens/pancakeswap/PancakeswapScreen';
import BEP20TokenScreen from '@screens/pancakeswap/BEP20TokenScreen';
import DexScreen from '@screens/dex/DexScreen';

const Stack = createStackNavigator();

function SwapNavigator({style}) {
    useEffect(() => {
    }, []);
    return (
        <View style={StyleSheet.flatten([styles.stack, style])}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name="DexScreen" component={DexScreen}/>
                <Stack.Screen name="ERC20TokenScreen" component={ERC20TokenScreen}/>
                <Stack.Screen name="BEP20TokenScreen" component={BEP20TokenScreen}/>
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
export default SwapNavigator;
