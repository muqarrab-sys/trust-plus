import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import Bell from '@components/icons/Bell';
import Filter from '@components/icons/Filter';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonCurrency from '@components/commons/CommonCurrency';
import {useNavigation} from '@react-navigation/native';

export default function MultiCoinHeader() {
  const navigation = useNavigation();
  const {theme} = useSelector(state => state?.ThemeReducer);
  const {activeMulticoinWallet} = useSelector(state => state?.MulticoinReducer);

  return (
    <View style={styles.header}>
      <View style={{flex: 0.5}}>
        <CommonTouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
          <Bell />
        </CommonTouchableOpacity>
      </View>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <CommonCurrency style={[styles.balanceText, {color: theme.textColor3}]} value={activeMulticoinWallet?.balance} />
      </View>

      <View style={{flex: 0.5, alignItems: 'flex-end'}}>
        <CommonTouchableOpacity
          onPress={() => {
            navigation?.navigate('TokenScreen', {chainId: 1});
          }}>
          <Filter />
        </CommonTouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  balanceText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
