import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CommonText from '@components/commons/CommonText';
import {useSelector} from 'react-redux';
import HomeScreen from '@screens/home/HomeScreen';
import Setting from '@components/icons/Setting';
import Wallet from '@components/icons/Wallet';
import Dex from '@components/icons/Dex';
import SwapNavigator from '@modules/navigation/SwapNavigator';
import SettingScreen from '@screens/setting/SettingScreen';
import ICOScreen from '@screens/ico/ICOScreen';
import ICO from '@components/icons/ICO';

const Tab = createBottomTabNavigator();

export default function BottomTabBarNavigator() {
    const {theme} = useSelector(state => state.ThemeReducer);
    const {language} = useSelector(state => state.LanguageReducer);
    const {activeWallet} = useSelector((state) => state.WalletReducer);
    useEffect(() => {

    }, []);
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: 'lightgray',
                style: {backgroundColor: theme.backgroundColor3},
            }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarLabel: ({focused}) => {
                        let color = theme.alternativeTextColor;
                        if (focused) {
                            color = theme.textColor4;
                        }
                        return (
                            <CommonText style={[styles.label, {color: color}]}>
                                {language.wallet}
                            </CommonText>
                        );
                    },
                    tabBarIcon: ({focused}) => <Wallet focused={focused}/>,
                }}
            />
            {
                activeWallet.network.symbol !== 'BTC' &&
                <Tab.Screen
                    name="ICOScreen"
                    component={ICOScreen}
                    options={{
                        tabBarLabel: ({focused}) => {
                            let color = theme.alternativeTextColor;
                            if (focused) {
                                color = theme.textColor4;
                            }
                            return (
                                <CommonText style={[styles.label, {color: color}]}>
                                    {language.ico}
                                </CommonText>
                            );
                        },
                        tabBarIcon: ({focused}) => <ICO focused={focused}/>,
                    }}
                />
            }
            {
                activeWallet.network.symbol !== 'BTC' &&
                <Tab.Screen
                    name="SwapNavigator"
                    component={SwapNavigator}
                    options={{
                        tabBarLabel: ({focused}) => {
                            let color = theme.alternativeTextColor;
                            if (focused) {
                                color = theme.textColor4;
                            }
                            return (
                                <CommonText style={[styles.label, {color: color}]}>
                                    {language.dex}
                                </CommonText>
                            );
                        },
                        tabBarIcon: ({focused}) => <Dex focused={focused}/>,
                    }}
                />
            }

            <Tab.Screen
                name="SettingScreen"
                component={SettingScreen}
                options={{
                    tabBarLabel: ({focused}) => {
                        let color = theme.alternativeTextColor;
                        if (focused) {
                            color = theme.textColor4;
                        }
                        return (
                            <CommonText style={[styles.label, {color: color}]}>
                                {language.setting}
                            </CommonText>
                        );
                    },
                    tabBarIcon: ({focused}) => <Setting focused={focused}/>,
                }}
            />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    label: {fontSize: 10},
});
