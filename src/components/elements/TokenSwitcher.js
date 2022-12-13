import React, {useState} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {useSelector} from 'react-redux';

export default function TokenSwitcher({enable, ...rest}) {
  const {theme} = useSelector(state => state.ThemeReducer);

  return (
    <View style={[styles.container]}>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        ios_backgroundColor="#3e3e3e"
        value={enable}
        thumbColor={enable ? theme.buttonColor2 : '#f4f3f4'}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: 75,
    justifyContent: 'center',
    marginTop: 5,
  },
});
