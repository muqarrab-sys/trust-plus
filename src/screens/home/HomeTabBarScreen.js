import React, {useEffect, useState} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AssetsScreen from "@screens/home/AssetsScreen";
import CommonText from "@components/commons/CommonText";
import Home from "@components/icons/Home";
import {useSelector} from "react-redux";
import {StyleSheet} from "react-native";
import NFTsScreen from "@screens/home/NFTsScreen";

const Tab = createMaterialTopTabNavigator();

export default function HomeTabBarScreen() {
    const {theme} = useSelector(state => state.ThemeReducer);
    const {language} = useSelector(state => state.LanguageReducer);
    return (
        <Tab.Navigator

            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: 'lightgray',
                style: {backgroundColor: theme.backgroundColor1},
            }}>
            <Tab.Screen name="WalletsScreen" component={AssetsScreen} options={{
                tabBarLabel: ({focused}) => {
                    let color = theme.alternativeTextColor;
                    if (focused) {
                        color = theme.textColor4;
                    }
                    return (
                        <CommonText style={[styles.label, {color: color}]}>
                            {language.assets}
                        </CommonText>
                    );
                }
            }}/>
            <Tab.Screen name="NFTScreen" component={NFTsScreen} options={{
                tabBarLabel: ({focused}) => {
                    let color = theme.alternativeTextColor;
                    if (focused) {
                        color = theme.textColor4;
                    }
                    return (
                        <CommonText style={[styles.label, {color: color}]}>
                            {language.nfts}
                        </CommonText>
                    );
                }
            }}/>
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    label: {fontSize: 16},
});
