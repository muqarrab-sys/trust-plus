import CommonHeader from '@components/commons/CommonHeader';
import CommonImage from '@components/commons/CommonImage';
import CommonText from '@components/commons/CommonText';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

const data = [];

export default function MulticoinListScreen({route}) {
  const {next, title} = route.params;
  const {activeMulticoinWallet} = useSelector(state => state?.MulticoinReducer);
  const {theme} = useSelector(state => state.ThemeReducer);
  const navigation = useNavigation();

  const onPress = wallet => {
    navigation.navigate(next, {wallet});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.assetContainer}>
      <View style={styles.assetIconContainer}>
        <CommonImage source={{uri: item.logoURI}} style={styles.assetIcon} />
      </View>
      <View style={[styles.assetInformationContainer, {borderBottomColor: theme.textColor2}]}>
        <View>
          <CommonText style={styles.assetTitle}>{item.name}</CommonText>
        </View>
        <View>
          <CommonText style={styles.currentAssetValue}>
            <CommonText>{item.balance.val?.toFixed(4)} </CommonText>
            <CommonText>{item.symbol}</CommonText>
          </CommonText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <CommonHeader onPressBack={() => navigation.goBack()} title={title} />
      <FlatList
        data={activeMulticoinWallet.wallets}
        ListHeaderComponent={() => <View style={{height: 10}} />}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  assetContainer: {
    width: '100%',
    paddingLeft: 10,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },
  assetIconContainer: {
    marginRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetIcon: {
    width: 50,
    height: 50,
  },
  assetInformationContainer: {
    borderBottomWidth: 1,
    flex: 6,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 30,
  },
  assetTitle: {
    fontSize: 19,
  },
  currentAssetValue: {
    fontSize: 19,
  },
});
