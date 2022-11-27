import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import EntryScreen from '@screens/authentication/EntryScreen';
import PasscodeScreen from '@screens/authentication/passcode/PasscodeScreen';
import MnemonicsScreen from '@screens/authentication/register/MnemonicsScreen';
import ConfirmScreen from '@screens/authentication/register/ConfirmScreen';
import ImportScreen from '@screens/authentication/import/ImportScreen';
import MultiCoinScreen from '@screens/authentication/import/MultiCoinScreen';

const Stack = createStackNavigator();

function AuthenticationStackNavigator({style}) {
    useEffect(() => {
    }, []);
    return (
        <View style={StyleSheet.flatten([styles.stack, style])}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name="EntryScreen" component={EntryScreen}/>
                <Stack.Screen name="PasscodeScreen" component={PasscodeScreen}/>
                <Stack.Screen name="MnemonicsScreen" component={MnemonicsScreen}/>
                <Stack.Screen name="ConfirmScreen" component={ConfirmScreen}/>
                <Stack.Screen name="ImportScreen" component={ImportScreen}/>
                <Stack.Screen name="MultiCoinScreen" component={MultiCoinScreen}/>
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
export default AuthenticationStackNavigator;
