import React, {useState} from 'react';
import {StyleSheet, Switch, View,} from 'react-native';
export default function TokenSwitcher({enable,...rest}) {
  return (
      <View style={[styles.container]}>
        <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            ios_backgroundColor="#3e3e3e"
            value={enable}
            thumbColor={enable ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: 75,
    justifyContent: 'center',
    marginTop: 5,
  }
});
