import React from 'react';
import {View} from 'react-native';
import CommonHeader from '@components/commons/CommonHeader';

export default function MulticoinBuyScreen({navigation, route}) {
  const {wallet} = route.params;

  return (
    <View>
      <CommonHeader onPressBack={() => navigation.goBack()} />
    </View>
  );
}
