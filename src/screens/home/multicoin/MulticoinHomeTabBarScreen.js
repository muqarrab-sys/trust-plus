import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NFTsScreen from '../NFTsScreen';
import MulticoinTokensScreen from './MulticoinTokensScreen';

const Tab = createMaterialTopTabNavigator();

export default function MulticoinHomeTabBarScreen() {
  const {theme} = useSelector(state => state.ThemeReducer);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
      <Tab.Navigator style={{borderRadius: 5}}>
        <Tab.Screen name="Tokens" component={MulticoinTokensScreen} />
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
});
