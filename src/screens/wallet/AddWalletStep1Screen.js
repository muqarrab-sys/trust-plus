import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Root} from 'popup-ui';
import CommonBackButton from '@components/commons/CommonBackButton';
import {useSelector} from 'react-redux';
import CommonText from '@components/commons/CommonText';
import CommonFlatList from '@components/commons/CommonFlatList';
import CommonTouchableOpacity from '@components/commons/CommonTouchableOpacity';
import CommonTokenIcon from '@components/commons/CommonTokenIcon';
import {applicationProperties} from '@src/application.properties';

export default function AddWalletStep1Screen({navigation, route}) {
  const lang = useSelector(state => state.LanguageReducer.language);
  const {theme} = useSelector(state => state.ThemeReducer);
  const renderItem = ({item}) => {
    return (
      <CommonTouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('AddWalletStep2Screen', {item: item});
        }}>
        <View style={{width: 60, justifyContent: 'center', alignItems: 'center'}}>
          <CommonTokenIcon uri={item.logoURI} resizeMode={'contain'} style={{width: 32, height: 32}} />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CommonText style={{fontSize: 14}}>{item.displayName}</CommonText>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 5}}></View>
      </CommonTouchableOpacity>
    );
  };
  return (
    <Root>
      <SafeAreaView style={[styles.container, {backgroundColor: theme.backgroundColor1}]}>
        <View style={[styles.header, {backgroundColor: theme.mainColor}]}>
          <CommonBackButton
            color={'white'}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <CommonText style={styles.title}>{lang.chooseWallet}</CommonText>
          <View style={{width: 40}}></View>
        </View>
        <View style={styles.contentContainer}>
          <CommonFlatList data={applicationProperties.networks} keyExtractor={item => item.apiUrl} renderItem={renderItem} />
        </View>
      </SafeAreaView>
    </Root>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flex: 1,
  },
  header: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  item: {
    width: '100%',
    height: 80,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e2e2e2',
    flexDirection: 'row',
  },
});
